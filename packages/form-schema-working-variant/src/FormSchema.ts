import type { TValidationConfig } from './validate';
import {
  checkArraysEquality,
  checkSchemasArrayEquality,
  checkSetsEquality,
  checkSingleSchemaEquality, createSetCopy,
  type TWatchConfig,
  watch
} from './watch';
import type { TFactory } from './factory';
import type { TPresentationConfig } from './presentation';
import {
  FactorySymbol,
  ChangedKeysSymbol,
  ErrorsSymbol,
  InitialValuesSymbol,
  ValidateSymbol,
  WatchSymbol,
  PresentationSymbol,
} from './symbols';
import { COMPARATOR, getMetadata, isTypeOf, OBJECT, OBJECT_KEYS, PRESENTATION, SCHEMA, SCHEMAS_ARRAY } from './utils';
import { ChildProps, Constructable } from './types';
import {
  action,
  autorun,
  computed,
  IReactionDisposer,
  isObservableProp,
  makeObservable,
  observable,
  observe,
  runInAction
} from 'mobx';

const forUniqueKeysInObjects = (obj1: unknown, obj2: unknown, fn: (key: string) => void) => (
  createSetCopy(OBJECT_KEYS(obj1).concat(OBJECT_KEYS(obj2))).forEach(k => fn(k))
);
const defaultExecutor = (fn: () => void) => fn();

const validateSingleField = (
  schema: FormSchema,
  validateConfig: Record<string, TValidationConfig<unknown, unknown>>,
  field: string,
  message?: string | boolean,
) => {
  if (!validateConfig[field]) return false;
  validateConfig[field].condition && !validateConfig[field].condition(schema[field], schema) || !validateConfig[field].validators.find(it => message = it(schema[field], schema));

  runInAction(() => {
    if (isTypeOf(message) || message === true) {
      return schema[ErrorsSymbol][field] = message;
    }
    return delete schema[ErrorsSymbol][field];
  });

  return message;
};

const checkForChangesSimpleField = (
  schema: FormSchema,
  watchConfig: Record<string, TWatchConfig<unknown, unknown>>,
  field: string,
  isEqual?: boolean,
) => {
  isEqual = !watchConfig[field] || watchConfig[field][COMPARATOR](schema[field], schema[InitialValuesSymbol][field], schema);
  runInAction(() => schema[ChangedKeysSymbol][isEqual ? 'delete' : 'add'](field));
  return !isEqual;
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
  watchMetadata = getMetadata<TWatchConfig<unknown, unknown>>(WatchSymbol, record);
  return OBJECT_KEYS(watchMetadata).forEach((key) => fn(record, key, watchMetadata[key][name]));
};

const forKeysInObject = <T>(obj: T, fn: (key: string) => void) => OBJECT_KEYS(obj).forEach(k => fn(k));

/**
 * Base class for creation schema form.
 */
export class FormSchema {
  protected static config = {
    isManual: false,
  };

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

    const factoryMetadata = getMetadata<TFactory<unknown, unknown>>(FactorySymbol, record);

    const validateMetadata = getMetadata<TValidationConfig<T, unknown>>(ValidateSymbol, record);
    const watchMetadata = getMetadata<TWatchConfig<T, unknown>>(WatchSymbol, record);

    const extendingObservableOptions: Record<string, any> = {
      [InitialValuesSymbol]: observable.ref,
      [ChangedKeysSymbol]: observable,
      [ErrorsSymbol]: observable,

      [PRESENTATION]: computed,
      isChanged: computed,
      isValid: computed,
      errors: computed,

      checkAnyChanges: action,
      checkChangesOf: action,
      validateOnly: action,
      validateAll: action,
      reset: action,
      sync: action,
    };

    forUniqueKeysInObjects(factoryMetadata, data, key => {
      if (factoryMetadata[key]) {
        record[key] = factoryMetadata[key](data[key], data, record[key]);
      } else if (key in data) {
        record[key] = data[key];
      }
    });

    record.sync();

    forKeysInObject(watchMetadata, (key, decorator?: any, comparator?: any) => {
      if (!isObservableProp(record, key)) {
        decorator = observable;
        comparator = watchMetadata[key][COMPARATOR];

        // @watch.schema will apply @observable.ref
        if (comparator === checkSingleSchemaEquality) {
          decorator = observable.ref;
          // @watch.schemasArray, @watch.set and @watch.array will apply @observable.shallow
        } else if (
          comparator === checkArraysEquality
          || comparator === checkSetsEquality
          || comparator === checkSchemasArrayEquality
        ) {
          decorator = observable.shallow;
        }
        extendingObservableOptions[key] = decorator;
      }
    });

    try {
      makeObservable(record, extendingObservableOptions);
    } catch {
      forKeysInObject(extendingObservableOptions, key => (
        !isObservableProp(record, key) && extendingObservableOptions[key](record, key)
      ));
      makeObservable(record);
    }

    record.sync();

    if ((this as any).config.isManual) return record;

    forKeysInObject(watchMetadata, (key, autorunCompareDisposer?: IReactionDisposer) => {
      return observe(record, key as keyof T, () => {
        autorunCompareDisposer && autorunCompareDisposer();
        return autorunCompareDisposer = autorun(() => checkForChangesSimpleField(record, watchMetadata, key));
      }, true);
    });

    forKeysInObject(validateMetadata, key => autorun(() => validateSingleField(record, validateMetadata, key)));

    return record;
  }

  private readonly [ErrorsSymbol]: ChildProps<this, string | true> = {};

  private readonly [ChangedKeysSymbol] = createSetCopy<string | symbol>();

  private [InitialValuesSymbol]: Partial<Omit<this, keyof FormSchema>> = {};

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
    const presentationMetadata = getMetadata<TPresentationConfig<unknown, unknown>>(PresentationSymbol, this);

    forUniqueKeysInObjects(presentationMetadata, this, (key, config?: TPresentationConfig<any, any>) => {
      config = presentationMetadata[key];
      if (!config || !config.hidden) {
        state[key] = config && config[PRESENTATION] ? config[PRESENTATION](this[key], this) : this[key];
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
    return this[ChangedKeysSymbol].size > 0;
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
    return OBJECT.values(this[ErrorsSymbol]).every(it => !it);
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
    return this[ErrorsSymbol];
  }

  /**
   * Returns the value, that was saved as initial value for a given property.
   *
   * @param field - the name of needed property
   */
  getInitial(field: keyof ChildProps<this>): this[typeof field] {
    return this[InitialValuesSymbol][field];
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

    this[InitialValuesSymbol] = initialValues;
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
      return record[key] = restoreFn(record[InitialValuesSymbol][key])
    });
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
    return validateSingleField(this, getMetadata(ValidateSymbol, this), field as any);
  }

  /**
   * A function that validates the entire schema.
   * @returns is form valid or not.
   *
   * @see {@link FormSchema.errors}
   * @see {@link validate}
   */
  validateAll(): string | boolean {
    return checkOrValidateAll(this, ValidateSymbol, validateSingleField);
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
    return checkForChangesSimpleField(this, getMetadata(WatchSymbol, this), field as any);
  }

  /**
   * A function that checks if the entire schema is different from the initial state
   * @returns is entire form is changed.
   *
   * @see {@link FormSchema.isChanged}
   * @see {@link watch}
   */
  checkAnyChanges(): boolean {
    return checkOrValidateAll(this, WatchSymbol, checkForChangesSimpleField);
  }
}
