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
import { checkSchemasArrayEquality, checkSingleSchemaEquality, TWatchConfig } from './watch';
import { TFactory } from './factory';
import { TPresentationConfig } from './presentation';
import {
  ChangedKeysSymbol,
  ErrorsSymbol,
  FactorySymbol,
  InitialValuesSymbol,
  PresentationSymbol,
  ValidateSymbol,
  WatchSymbol,
} from './symbols';
import { getMetadata, OBJECT, REFLECT } from './utils';

type Constructable<T> = new (...args: any[]) => T;
type ChildProps<T, R = string> = Partial<Record<keyof Omit<T, keyof FormSchema>, R>>;
export type ExcludeFormSchema<T> = Omit<T, keyof FormSchema>;

const validateSingleField = (schema: FormSchema, validateConfig: Record<string, TValidationConfig>, field: string) => {
  const { validators, condition } = validateConfig[field];

  if (condition && !condition(schema[field], schema)) {
    runInAction(() => delete schema[ErrorsSymbol][field]);
    return false;
  }

  const value = schema[field];
  let message: string | boolean = false;
  for (const validator of validators) {
    message = validator(value, schema);
    if (message) break;
  }

  runInAction(() => {
    if (typeof message === 'string' || message === true) {
      schema[ErrorsSymbol][field] = message;
    } else {
      delete schema[ErrorsSymbol][field];
    }
  });

  return message;
};

const checkForChangesSimpleField = (schema: FormSchema, watchConfig: Record<string, TWatchConfig>, field: string) => {
  const comparator = watchConfig[field].comparator;

  const newValue = schema[field];
  const initialValue = schema[InitialValuesSymbol][field];
  const isEqual = comparator ? (comparator(newValue, initialValue)) : (initialValue === newValue);

  runInAction(() => schema[ChangedKeysSymbol][isEqual ? 'delete' : 'add'](field));

  return isEqual;
};

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

    if (!isObservable(record)) {
      makeObservable(record);
    }

    const validateMetadata = getMetadata<TValidationConfig>(ValidateSymbol, record);
    const factoryMetadata = getMetadata<TFactory>(FactorySymbol, record);
    const watchMetadata = getMetadata<TWatchConfig>(WatchSymbol, record);

    for (const key of new Set(OBJECT.keys(factoryMetadata).concat(OBJECT.keys(data)))) {
      const currentFactory = factoryMetadata[key];
      record[key] = currentFactory ? currentFactory(data[key], data) : data[key];
    }

    const extendingObservableValues: Record<string, any> = {};
    const extendingObservableOptions: Record<string, typeof observable> = {};
    for (const key in watchMetadata) {
      if (!isObservableProp(record, key)) {
        const { comparator } = watchMetadata[key];
        let decorator: any = observable;

        // @watch.schema will apply @observable.ref
        if (comparator === checkSingleSchemaEquality) {
          decorator = observable.ref;
          // @watch.schemasArray will apply @observable.shallow
        } else if (comparator === checkSchemasArrayEquality) {
          decorator = observable.shallow;
        }
        extendingObservableValues[key] = record[key];
        extendingObservableOptions[key] = decorator;
      }
    }
    if (Object.keys(extendingObservableOptions).length) {
      extendObservable(record, extendingObservableValues, extendingObservableOptions);
    }

    for (const key in watchMetadata) {
      const watchConfig = watchMetadata[key];
      record[InitialValuesSymbol][key] = watchConfig.saveFn ? watchConfig.saveFn(record[key], record) : record[key];
    }

    if ((this as unknown as typeof FormSchema).config.manual) return record;

    for (const key in watchMetadata) {
      let autorunCompareDisposer: undefined | IReactionDisposer;

      observe(record, key as keyof T, () => {
        autorunCompareDisposer && autorunCompareDisposer();
        autorunCompareDisposer = autorun(() => checkForChangesSimpleField(record, watchMetadata, key));
      }, true);
    }

    for (const key in validateMetadata) {
      autorun(() => validateSingleField(record, validateMetadata, key));
    }

    return record;
  }

  private readonly [ErrorsSymbol]: ChildProps<this, string | true> = {};

  private readonly [ChangedKeysSymbol] = new Set<string | symbol>();

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
    const presentationMetadata = getMetadata<TPresentationConfig>(PresentationSymbol, this);
    const state: Record<string, any> = {};

    for (const key in this) {
      const config = presentationMetadata[key];

      if (config && config.hidden) continue;

      state[key] = config && config.presentation
        ? config.presentation(this[key], this)
        : this[key];
    }
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

    const watchMetadata = getMetadata<TWatchConfig>(WatchSymbol, this);
    for (const key in watchMetadata) {
      const watchConfig = watchMetadata[key];
      initialValues[key] = watchConfig.saveFn ? watchConfig.saveFn(this[key], this) : this[key];
    }

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
    const watchMetadata = getMetadata<TWatchConfig>(WatchSymbol, this);
    for (const key of this[ChangedKeysSymbol]) {
      const initialValue = this[InitialValuesSymbol][key];
      const watchConfig = watchMetadata[key as any];
      this[key] = (watchConfig && watchConfig.restoreFn)
        ? watchConfig.restoreFn(initialValue)
        : initialValue;
    }
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
    const validateMetadata = getMetadata<TValidationConfig>(ValidateSymbol, this);

    if (field) {
      return validateSingleField(this, validateMetadata, field as any);
    }

    let error = false;

    for (const key in validateMetadata) {
      const currentError = validateSingleField(this, validateMetadata, key);
      error ||= !!currentError;
    }

    return error;
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
    const watchMetadata = getMetadata<TWatchConfig>(WatchSymbol, this);

    if (field) {
      return checkForChangesSimpleField(this, watchMetadata, field as any);
    }

    let isChangedGlobally = false;

    for (const key in watchMetadata) {
      const isChanged = checkForChangesSimpleField(this, watchMetadata, key);
      isChangedGlobally ||= !!isChanged;
    }

    return isChangedGlobally;
  }
}

const decorate = function (decorators, key: string | symbol, desc) {
  const target = FormSchema.prototype;
  const decorated = REFLECT.decorate(decorators, target, key, desc);
  // istanbul ignore next
  return decorated && OBJECT.defineProperty(target, key, decorated), decorated;
};

const metadata = (k, v) => REFLECT.metadata(`design:${k}`, v);

const metadataType = (type: any) => metadata('type', type);
const metadataParamType = () => metadata('paramtypes', []);

const decorateAsObservable = (key: string | symbol, observableDecorator) => (
  decorate([
    observableDecorator,
    metadataType(OBJECT),
  ], key, undefined)
);

const decorateAsComputed = (key: string | symbol) => (
  decorate([
    computed,
    metadataType(Boolean),
    metadataParamType(),
  ], key, null)
);

const decorateAsAction = (key: string | symbol) => (
  decorate([
    action,
    metadataType(Function),
    metadataParamType(),
    metadata('returntype', undefined),
  ], key, null)
);

decorateAsObservable(ErrorsSymbol, observable);
decorateAsObservable(InitialValuesSymbol, observable.ref);
decorateAsObservable(ChangedKeysSymbol, observable);

decorateAsComputed('presentation');
decorateAsComputed('isChanged');
decorateAsComputed('isValid');
decorateAsComputed('errors');

decorateAsAction('sync');
decorateAsAction('reset');
decorateAsAction('validate');
decorateAsAction('checkChanges');
