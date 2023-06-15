/* eslint-disable max-lines */
import {
  action,
  autorun,
  computed,
  makeObservable,
  observable,
  observe,
  isObservable,
  runInAction,
  isObservableProp,
  extendObservable,
  IReactionDisposer,
} from 'mobx';
import { TValidationConfig } from './validate';
import {
  checkArraysEquality,
  checkSchemasArrayEquality,
  checkSetsEquality,
  checkSingleSchemaEquality,
  TWatchConfig,
} from './watch';
import { TFactory } from './factory';
import { TPresentationConfig } from './presentation';
import {
  $$ChangedKeysSymbol,
  $$ErrorsSymbol,
  FactorySymbol,
  $$InitialValuesSymbol,
  PresentationSymbol,
  ValidateSymbol,
  WatchSymbol,
} from './symbols';
import {
  COMPARATOR,
  forKeysInObject,
  forUniqueKeysInObjects,
  getMetadata,
  OBJECT,
  OBJECT_KEYS,
  PRESENTATION,
} from './utils';
import { ChildProps, Constructable } from './types';

const validateSingleField = (
  schema: FormSchema,
  validateConfig: Record<string, TValidationConfig>,
  field: string,
  condition = validateConfig[field].condition as any,
  value = schema[field],
  message?: string | boolean,
) => {
  condition && !condition(value, schema) || !validateConfig[field].validators.find(it => message = it(value, schema));

  runInAction(() => {
    if (typeof message === 'string' || message === true) {
      return schema[$$ErrorsSymbol][field] = message;
    }
    return delete schema[$$ErrorsSymbol][field];
  });

  return message;
};

const checkForChangesSimpleField = (
  schema: FormSchema,
  watchConfig: Record<string, TWatchConfig>,
  field: string,
  comparator = watchConfig[field][COMPARATOR],
  newValue = schema[field],
  initialValue = schema[$$InitialValuesSymbol][field],
  isEqual = comparator ? (comparator(newValue, initialValue)) : (initialValue === newValue),
) => {
  runInAction(() => schema[$$ChangedKeysSymbol][isEqual ? 'delete' : 'add'](field));
  return isEqual;
};

const checkOrValidate = <T extends (...args: any[]) => any>(
  record: FormSchema,
  metadataSymbol: symbol,
  name: string | undefined,
  fn: T,
  metadata = getMetadata(metadataSymbol, record),
): ReturnType<T> => {
  return name
    ? fn(record, metadata as any, name)
    : OBJECT_KEYS(metadata).reduce((acc, key) => {
      return !!fn(record, metadata as any, key) || acc;
    }, false);
};

const syncOrReset = (
  record: FormSchema,
  name: 'saveFn' | 'restoreFn',
  fn: (record: FormSchema, key: string, fn: (...args: any[]) => any) => void,
  watchMetadata = getMetadata<TWatchConfig>(WatchSymbol, record),
) => (
  forKeysInObject(watchMetadata, (key) => fn(record, key, watchMetadata[key][name]))
);

/**
 * Base class for creation schema form.
 */
export class FormSchema {
  /** The basic configuration of the schema */
  protected static config = {
    /**
     * If `false`, the validation and observation will be called using
     * `autorun`. In case, you want to handle the validation and check for
     * changes manually, you have to set it to `true`.
     */
    manual: false,
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
   *
   * @see {@link factory}
   */
  static create<T extends FormSchema>(this: Constructable<T>, data: ChildProps<T, any> = {}): T {
    const record = new this(data);

    const validateMetadata = getMetadata<TValidationConfig>(ValidateSymbol, record);
    const factoryMetadata = getMetadata<TFactory>(FactorySymbol, record);
    const watchMetadata = getMetadata<TWatchConfig>(WatchSymbol, record);

    const extendingObservableOptions: Record<string, any> = {
      [$$ErrorsSymbol]: observable,
      [$$InitialValuesSymbol]: observable.ref,
      [$$ChangedKeysSymbol]: observable,
      [PRESENTATION]: computed,
      isChanged: computed,
      isValid: computed,
      errors: computed,
      sync: action,
      reset: action,
      validate: action,
      checkChanges: action,
    };

    if (!isObservable(record)) {
      makeObservable(record);
    }

    forUniqueKeysInObjects(factoryMetadata, data, key => {
      if (factoryMetadata[key]) {
        record[key] = factoryMetadata[key](data[key], data, record[key]);
      } else if (key in data) {
        record[key] = data[key];
      }
    });

    forKeysInObject(watchMetadata, (key, decorator: any = observable, comparator?: any) => {
      if (!isObservableProp(record, key)) {
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

    if (OBJECT_KEYS(extendingObservableOptions).length) {
      extendObservable(record, extendingObservableOptions);
    }

    record.sync();

    if ((this as unknown as typeof FormSchema).config.manual) return record;

    forKeysInObject(watchMetadata, (key, autorunCompareDisposer?: IReactionDisposer) => {
      return observe(record, key as keyof T, () => {
        autorunCompareDisposer && autorunCompareDisposer();
        return autorunCompareDisposer = autorun(() => checkForChangesSimpleField(record, watchMetadata, key));
      }, true);
    });

    forKeysInObject(validateMetadata, key => autorun(() => validateSingleField(record, validateMetadata, key)));

    return record;
  }

  private readonly [$$ErrorsSymbol]: ChildProps<this, string | true> = {};

  private readonly [$$ChangedKeysSymbol] = new Set<string | symbol>();

  private [$$InitialValuesSymbol]: Partial<Omit<this, keyof FormSchema>> = {};

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
    const presentationMetadata = getMetadata<TPresentationConfig>(PresentationSymbol, this);

    forUniqueKeysInObjects(presentationMetadata, this, (key, config = presentationMetadata[key], value = this[key]) => {
      if (!config || !config.hidden) {
        state[key] = config && config[PRESENTATION] ? config[PRESENTATION](value, this) : value;
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
    return this[$$ChangedKeysSymbol].size > 0;
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
    return OBJECT.values(this[$$ErrorsSymbol]).every(it => !it);
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
    return this[$$ErrorsSymbol];
  }

  /**
   * Returns the value, that was saved as initial value for a given property.
   *
   * @param field - the name of needed property
   */
  getInitial(field: keyof ChildProps<this>): this[typeof field] {
    return this[$$InitialValuesSymbol][field];
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
      initialValues[key] = saveFn ? saveFn(record[key], record) : record[key]
    ));

    this[$$InitialValuesSymbol] = initialValues;
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
    syncOrReset(this, 'restoreFn', (record, key, restoreFn, initialValue = record[$$InitialValuesSymbol][key]) => {
      return record[key] = restoreFn ? restoreFn(initialValue) : initialValue;
    });
  }

  /**
   * A function that validates a single property or the entire schema.
   * Should be used to update `errors` object
   *
   * @param [field] - a name of the property. If not given, the form
   * will be validated entirely.
   *
   * @returns If property name is passed, will return property's
   * validation. If not, will return is form valid or not.
   *
   * @see {@link FormSchema.errors}
   * @see {@link validate}
   */
  validate(field?: keyof ChildProps<this>): string | boolean {
    return checkOrValidate(this, ValidateSymbol, field as any, validateSingleField);
  }

  /**
   * A function that checks if a single property is differs from the initial state
   * or if there's any changes in the entire schema.
   *
   * @param [field] - a name of the property. If not given, the check will be
   * applied to the entire schema.
   *
   * @returns If property name is passed, will return is property changed.
   * If not, will return is entire form is changed.
   *
   * @see {@link FormSchema.isChanged}
   * @see {@link watch}
   */
  checkChanges(field?: keyof ChildProps<this>): boolean {
    return checkOrValidate(this, WatchSymbol, field as any, checkForChangesSimpleField);
  }
}
