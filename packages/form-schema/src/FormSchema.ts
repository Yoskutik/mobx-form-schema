import { TValidationConfig } from './validate';
import { TWatchConfig } from './watch';
import { TFactory, __FactorySymbol } from './factory';
import { TPresentationConfig, __PresentationSymbol } from './presentation';
import {
  __ChangedKeysSymbol,
  __ErrorsSymbol,
  __ExecSymbol,
  __InitialValuesSymbol,
  __ValidateSymbol,
  __WatchSymbol,
} from './symbols';
import { getMetadata } from './utils';
import { ChildProps, Constructable } from './types';

const OBJECT_KEYS = Object.keys;
const forUniqueKeysInObjects = (obj1: unknown, obj2: unknown, fn: (key: string) => void) => (
  new Set(OBJECT_KEYS(obj1).concat(OBJECT_KEYS(obj2))).forEach(k => fn(k))
);
const defaultExecutor = (fn: () => void) => fn();

const validateSingleField = (
  schema: FormSchema,
  validateConfig: Record<string, TValidationConfig<unknown, unknown>>,
  field: string,
  message?: string | boolean,
) => {
  validateConfig[field].condition && !validateConfig[field].condition(schema[field], schema) || !validateConfig[field].validators.find(it => message = it(schema[field], schema));

  schema[__ExecSymbol](() => {
    if (typeof message === 'string' || message === true) {
      return schema[__ErrorsSymbol][field] = message;
    }
    return delete schema[__ErrorsSymbol][field];
  });

  return message;
};

const checkForChangesSimpleField = (
  schema: FormSchema,
  watchConfig: Record<string, TWatchConfig<unknown, unknown>>,
  field: string,
  isEqual?: boolean,
) => {
  isEqual = watchConfig[field].comparator(schema[field], schema[__InitialValuesSymbol][field], schema);
  schema[__ExecSymbol](() => schema[__ChangedKeysSymbol][isEqual ? 'delete' : 'add'](field));
  return isEqual;
};

const checkOrValidateAll = <T extends (...args: any[]) => any>(
  record: FormSchema,
  metadataSymbol: symbol,
  fn: T,
  metadata?: any,
): boolean => {
  metadata = getMetadata(metadataSymbol, record);
  return OBJECT_KEYS(metadata).reduce((acc, key) => {
    return !!fn(record, metadata as any, key) || acc;
  }, false) as any;
}

const syncOrReset = (
  record: FormSchema,
  name: 'saveFn' | 'restoreFn',
  fn: (record: FormSchema, key: string, fn: (...args: any[]) => any) => void,
  watchMetadata?: any,
) => {
  watchMetadata = getMetadata<TWatchConfig<unknown, unknown>>(__WatchSymbol, record);
  return OBJECT_KEYS(watchMetadata).forEach((key) => fn(record, key, watchMetadata[key][name]));
};

/**
 * Base class for creation schema form.
 */
export class FormSchema {
  /**
   * Static method that creates an instance of a form schema. This method will
   * handle all the decorators of this package. Also, `create` method will
   * call `makeObservable` function from MobX to make the instance of the
   * form schema observable, if such function hadn't been call in the subclass
   * constructor.
   *
   * Attention! To avoid any problems use only `create` method instead of
   * using `new` keyword.
   *
   * @param {Record<string | symbol, any>} [data] - An object that you can pass
   * to change the initial state of the form. See how {@link factory} works for
   * better understanding.
   */
  static create<T extends FormSchema>(this: Constructable<T>, data: ChildProps<T, any> = {}): T {
    const record = new this(data);

    const factoryMetadata = getMetadata<TFactory<unknown, unknown>>(__FactorySymbol, record);

    forUniqueKeysInObjects(factoryMetadata, data, key => {
      if (factoryMetadata[key]) {
        record[key] = factoryMetadata[key](data[key], data, record[key]);
      } else if (key in data) {
        record[key] = data[key];
      }
    });

    record.sync();
    (record as any)[__ExecSymbol] = defaultExecutor;

    return record;
  }

  private static readonly isAutomated = false;

  private readonly [__ErrorsSymbol]: ChildProps<this, string | true> = {};

  private readonly [__ChangedKeysSymbol] = new Set<string | symbol>();

  private readonly [__ExecSymbol] = (fn: () => void) => fn();

  private [__InitialValuesSymbol]: Partial<Omit<this, keyof FormSchema>> = {};

  /**
   * By using this getter you can get the data from the schema without any
   * methods.
   *
   * Also, if any property in the schema is decorated with `presentation`
   * decorator, a function from the decorator will be applied to the property's
   * value.
   */
  get presentation(): Partial<ChildProps<this, any>> {
    const state: Record<string, any> = {};
    const presentationMetadata = getMetadata<TPresentationConfig<unknown, unknown>>(__PresentationSymbol, this);

    forUniqueKeysInObjects(presentationMetadata, this, (key, config?: TPresentationConfig<any, any>) => {
      config = presentationMetadata[key];
      if (!config || !config.hidden) {
        state[key] = config && config.presentation ? config.presentation(this[key], this) : this[key];
      }
    });

    return state as Partial<ChildProps<this, any>>;
  }

  /**
   * A flag, that shows whether any of the fields was changed from the initial
   * state.
   *
   * This getter only track those properties that are decorated with `watch`
   * function.
   *
   * @see {@link watch}
   */
  get isChanged(): boolean {
    return this[__ChangedKeysSymbol].size > 0;
  }

  /**
   * A flag, that shows whether the `errors` is an empty object, which means
   * that the schema has no errors.
   *
   * This getter only track those properties that are observable and decorated
   * with `validate` function.
   *
   * @see {@link validate}
   */
  get isValid(): boolean {
    return Object.values(this[__ErrorsSymbol]).every(it => !it);
  }

  /**
   * A map of the errors of the form schema instance. The key of the map stands
   * for names of instance properties. If specific property is not presented in
   * the object, there's no error.
   *
   * The value of a map can be `true` or any string.
   *
   * @see {@link validate} for better understanding
   */
  get errors() {
    return this[__ErrorsSymbol];
  }

  /**
   * Returns the value, that was saved as initial value for a given property.
   *
   * @param field - the name of needed property
   */
  getInitial(field: keyof ChildProps<this>): this[typeof field] {
    return this[__InitialValuesSymbol][field];
  }

  /**
   * A function, which synchronize current state with the initial state. After
   * it's call if `isChanged` getter was true, it will become false. Also,
   * after calling `reset` method, all the properties will be restored into
   * new saved initial state.
   *
   * @see {@link FormSchema.reset}
   * @see {@link FormSchema.isChanged}
   * @see {@link watch}
   */
  sync(): void {
    const initialValues = {};

    syncOrReset(this, 'saveFn', (record, key, saveFn) => (
      initialValues[key] = saveFn(record[key], record)
    ));

    this[__InitialValuesSymbol] = initialValues;
    this[__ExecSymbol] === defaultExecutor && this.checkAnyChanges();
  }

  /**
   * A function that resets all the properties in the schema into
   * initial state - the state that was created in the `create` static method,
   * or that was updated by `sync` method.
   *
   * @see {@link FormSchema.sync}
   * @see {@link FormSchema.isChanged}
   * @see {@link watch}
   */
  reset(): void {
    syncOrReset(this, 'restoreFn', (record, key, restoreFn) => {
      return record[key] = restoreFn(record[__InitialValuesSymbol][key])
    });
    this[__ExecSymbol] === defaultExecutor && this.checkAnyChanges();
  }

  /**
   * A function that validates a single property
   * @param [field] - a name of the property
   * @returns property's validation
   *
   * @see {@link FormSchema.errors}
   * @see {@link validate}
   */
  validateOnly(field: keyof ChildProps<this>): string | boolean {
    return validateSingleField(this, getMetadata(__ValidateSymbol, this), field as any);
  }

  /**
   * A function that validates the entire schema.
   * @returns is form valid or not.
   *
   * @see {@link FormSchema.errors}
   * @see {@link validate}
   */
  validateAll(): string | boolean {
    return checkOrValidateAll(this, __ValidateSymbol, validateSingleField);
  }

  /**
   * A function that checks if a single property is different from the initial state
   * @param [field] - a name of the property.
   * @returns is property changed.
   *
   * @see {@link FormSchema.isChanged}
   * @see {@link watch}
   */
  checkChangesOf(field: keyof ChildProps<this>): boolean {
    return checkForChangesSimpleField(this, getMetadata(__WatchSymbol, this), field as any);
  }

  /**
   * A function that checks if the entire schema is different from the initial state
   * @returns is entire form is changed.
   *
   * @see {@link FormSchema.isChanged}
   * @see {@link watch}
   */
  checkAnyChanges(): boolean {
    return checkOrValidateAll(this, __WatchSymbol, checkForChangesSimpleField);
  }
}
