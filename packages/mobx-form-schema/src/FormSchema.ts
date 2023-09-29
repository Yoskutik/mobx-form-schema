import {
  action,
  autorun,
  computed,
  IReactionDisposer,
  isObservableProp,
  makeObservable,
  observable,
  observe,
  runInAction, toJS,
} from 'mobx';
import type { TValidationConfig } from './validate';
import {
  checkArraysEquality,
  checkSchemasArrayEquality,
  checkSetsEquality,
  checkSingleSchemaEquality,
  createSetCopy, primitivesComparator,
  type TWatchConfig,
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
  IsManualSymbol,
} from './symbols';
import {
  COMPARATOR,
  getMetadata,
  isTypeOf,
  OBJECT,
  OBJECT_KEYS,
  PRESENTATION,
  warnAboutProperty,
} from './utils';
import { ExcludedFormSchemaKeyToValue, Constructable, ExcludeFormSchema } from './types';
import { TFactoryData } from './factory';

const forUniqueKeysInObjects = (obj1: unknown, obj2: unknown, fn: (key: string) => void) => (
  createSetCopy(OBJECT_KEYS(obj1).concat(OBJECT_KEYS(obj2))).forEach(k => fn(k))
);

const getIsFieldMustBeValidated = (
  schema: FormSchema,
  validateConfig: Record<string, TValidationConfig<unknown, unknown>>,
  field: string,
) => !!(
  validateConfig[field] && (
    !validateConfig[field].condition
    || validateConfig[field].condition(schema[field], schema)
  )
);

const validateSingleField = (
  schema: FormSchema,
  validateConfig: Record<string, TValidationConfig<unknown, unknown>>,
  field: string,
  mustBeValidated: boolean = getIsFieldMustBeValidated(schema, validateConfig, field),
  /* istanbul ignore next */
  message?: string | boolean
) => {
  if (!validateConfig[field]) return false;

  mustBeValidated && validateConfig[field].validators.find(it => message = it(schema[field], schema));

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
  isEqual = !watchConfig[field] || (
    watchConfig[field][COMPARATOR](schema[field], schema[InitialValuesSymbol][field], schema, field)
  );
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
  return OBJECT_KEYS(metadata).reduce((acc, key) => !!fn(record, metadata as any, key) || acc, false) as any;
};

const syncOrReset = (
  record: FormSchema,
  name: 'saveFn' | 'restoreFn',
  fn: (record: FormSchema, key: string, fn: (...args: any[]) => any) => void,
  watchMetadata?: any,
) => {
  watchMetadata = getMetadata<TWatchConfig<unknown, unknown>>(WatchSymbol, record);
  return OBJECT_KEYS(watchMetadata).forEach(key => fn(record, key, watchMetadata[key][name]));
};

const afterSyncOrRest = (record: FormSchema) => {
  if (record[IsManualSymbol]) {
    record.updateIsValidAll();
    record.updateIsChangedAny();
  }
};

const forKeysInObject = <T>(obj: T, fn: (key: string) => void) => OBJECT_KEYS(obj).forEach(k => fn(k));

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
   * @param {Record<string | symbol, any>=} [data] - An object that you can pass
   * to change the initial state of the form. See how {@link factory} works for
   * better understanding.
   * @param {boolean=} [isManual] - TODO
   */
  static create<T extends FormSchema>(this: Constructable<T>, data: TFactoryData<T> = {}, isManual?: boolean): T {
    const record = new this(data);

    const factoryMetadata = getMetadata<TFactory<T, unknown>>(FactorySymbol, record);

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

      updateIsPropertyChanged: action,
      updateIsPropertyValid: action,
      updateIsChangedAny: action,
      updateIsValidAll: action,
      reset: action,
      sync: action,
    };

    forUniqueKeysInObjects(factoryMetadata, data, key => {
      if (factoryMetadata[key]) {
        record[key] = factoryMetadata[key](data[key], data, record, record[key]);
      } else if (key in data) {
        record[key] = data[key];
      }

      if (__DEV__) {
        if (
          watchMetadata[key]
          && watchMetadata[key][COMPARATOR] === checkSetsEquality
          && Array.isArray(record[key])
        ) {
          warnAboutProperty(
            record,
            key,
            'will be compared as set, but type of a property is an array. Perhaps, you have'
            + ' to use @factory.set decorator or process the value in other way.',
          );
        }
      }
    });

    forKeysInObject(watchMetadata, (key, decorator?: any, comparator?: any) => {
      if (!isObservableProp(record, key)) {
        decorator = observable;
        comparator = watchMetadata[key][COMPARATOR];

        // @watch.schema will apply @observable.ref
        if (comparator === checkSingleSchemaEquality || comparator === primitivesComparator) {
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

    record[IsManualSymbol] = isManual;

    if (!isManual) {
      forKeysInObject(watchMetadata, (key, autorunCompareDisposer?: IReactionDisposer) => (
        observe(record, key as keyof T, () => {
          autorunCompareDisposer && autorunCompareDisposer();
          return autorunCompareDisposer = autorun(() => checkForChangesSimpleField(record, watchMetadata, key));
        }, true)
      ));

      forKeysInObject(validateMetadata, (key, mustBeValidated?: any) => {
        mustBeValidated = observable.box(false);
        autorun(() => mustBeValidated.set(getIsFieldMustBeValidated(record, validateMetadata, key)));
        autorun(() => validateSingleField(record, validateMetadata, key, mustBeValidated.get()));
      });
    }

    record.onInit && record.onInit();

    return record;
  }

  private readonly [ErrorsSymbol]: ExcludedFormSchemaKeyToValue<this, string | true> = {};

  private readonly [ChangedKeysSymbol] = createSetCopy<string | symbol>();

  private [InitialValuesSymbol]: Partial<ExcludeFormSchema<this>> = {};

  /**
   * A method that is called after Form Schema initialization in `create`
   * static method. Can be used to add reactions if you don't call
   * `makeObservable` method in the constructor.
   *
   * @see {@link FormSchema.create}
   */
  protected onInit?(): void;

  /**
   * By using this getter you can get the data from the schema without any
   * methods.
   *
   * Also, if any property in the schema is decorated with `presentation`
   * decorator, a function from the decorator will be applied to the property's
   * value.
   */
  get presentation(): ExcludedFormSchemaKeyToValue<this, any> {
    const state: Record<string, any> = {};
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;
    const presentationMetadata = getMetadata<TPresentationConfig<unknown, unknown>>(PresentationSymbol, self);

    forUniqueKeysInObjects(presentationMetadata, self, (key, config?: TPresentationConfig<any, any>) => {
      config = presentationMetadata[key];
      if (!config || !config.hidden) {
        state[key] = config && config[PRESENTATION] ? config[PRESENTATION](self[key], self) : self[key];
      }
    });

    return state as ExcludedFormSchemaKeyToValue<this, any>;
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
   * A set of properties names that are differs from the initial Form Schema state.
   *
   * @see {@link watch} for better understanding
   */
  get changedProperties(): Set<keyof ExcludeFormSchema<this>> {
    return this[ChangedKeysSymbol] as any;
  }

  /**
   * Returns the value, that was saved as initial value for a given property.
   *
   * @param field - the name of needed property
   */
  getInitial(field: keyof ExcludeFormSchema<this>): this[typeof field] {
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
    afterSyncOrRest(this);
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
    syncOrReset(this, 'restoreFn', (record, key, restoreFn) => (
      record[key] = restoreFn(record[InitialValuesSymbol][key], record)
    ));
    afterSyncOrRest(this);
  }

  /**
   * A function that validates a single property.
   * Useful only if schema is created in manual mode.
   *
   * @param [propertyName] - a name of the property
   * @returns property's validation
   *
   * @see {@link FormSchema.errors}
   * @see {@link validate}
   */
  updateIsPropertyValid(propertyName: keyof ExcludeFormSchema<this>): string | boolean {
    return validateSingleField(this, getMetadata(ValidateSymbol, this), propertyName as any)
  }

  /**
   * A function that validates the entire schema.
   * Useful only if schema is created in manual mode.
   *
   * @returns is form valid or not.
   *
   * @see {@link FormSchema.errors}
   * @see {@link validate}
   */
  updateIsValidAll(): string | boolean {
    return checkOrValidateAll(this, ValidateSymbol, validateSingleField);
  }

  /**
   * A function that checks if a single property is different from the initial state.
   * Useful only if schema is created in manual mode.
   *
   * @param [propertyName] - a name of the property.
   * @returns is property changed.
   *
   * @see {@link FormSchema.isChanged}
   * @see {@link watch}
   */
  updateIsPropertyChanged(propertyName: keyof ExcludeFormSchema<this>): boolean {
    return checkForChangesSimpleField(this, getMetadata(WatchSymbol, this), propertyName as any);
  }

  /**
   * A function that checks if the entire schema is different from the initial state.
   * Useful only if schema is created in manual mode.
   *
   * @returns is entire form is changed.
   *
   * @see {@link FormSchema.isChanged}
   * @see {@link watch}
   */
  updateIsChangedAny(): boolean {
    return checkOrValidateAll(this, WatchSymbol, checkForChangesSimpleField);
  }
}
