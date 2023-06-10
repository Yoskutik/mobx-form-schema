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
import { TWatchConfig } from './watch';
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
   *
   * @see {@link factory}
   */
  static create<T extends FormSchema>(this: Constructable<T>, data: ChildProps<T, any> = {}): T {
    const record = new this(data);

    if (!isObservable(record)) {
      makeObservable(record);
    }

    const validateMetadata: Record<string, TValidationConfig> = getMetadata(ValidateSymbol, record);
    const factoryMetadata: Record<string, TFactory> = getMetadata(FactorySymbol, record);
    const watchMetadata: Record<string, TWatchConfig> = getMetadata(WatchSymbol, record);

    for (const key of new Set(OBJECT.keys(factoryMetadata).concat(OBJECT.keys(data)))) {
      const currentFactory = factoryMetadata[key];
      record[key] = currentFactory ? currentFactory(data) : data[key];
    }

    const extendingObservableValues: Record<string, any> = {};
    const extendingObservableOptions: Record<string, typeof observable> = {};
    for (const key in watchMetadata) {
      if (!isObservableProp(record, key)) {
        extendingObservableValues[key] = record[key];
        extendingObservableOptions[key] = observable;
      }
    }
    if (Object.keys(extendingObservableOptions).length) {
      extendObservable(record, extendingObservableValues, extendingObservableOptions);
    }

    for (const key in watchMetadata) {
      const watchConfig = watchMetadata[key];
      record[InitialValuesSymbol][key] = watchConfig.saveFn ? watchConfig.saveFn(record[key], record) : record[key];
    }

    for (const key in watchMetadata) {
      const watchConfig = watchMetadata[key];

      const comparator = watchConfig.comparator;

      let autorunCompareDisposer: undefined | IReactionDisposer;
      observe(record, key as keyof T, () => {
        autorunCompareDisposer && autorunCompareDisposer();

        autorunCompareDisposer = autorun(() => {
          const newValue = record[key];
          const initialValue = record[InitialValuesSymbol][key];
          const isEqual = comparator ? (comparator(newValue, initialValue)) : (initialValue === newValue);
          runInAction(() => record[ChangedKeysSymbol][isEqual ? 'delete' : 'add'](key));
        });
      }, true);
    }

    for (const key in validateMetadata) {
      const validateConfig = validateMetadata[key];

      const { validators, condition } = validateConfig;

      autorun(() => {
        if (condition && !condition(record[key], record)) {
          runInAction(() => delete record[ErrorsSymbol][key]);
          return;
        }

        const value = record[key];
        let message: string | boolean;
        for (const validator of validators) {
          message = validator(value, record);
          if (message) break;
        }

        runInAction(() => {
          if (typeof message === 'string' || message === true) {
            record[ErrorsSymbol][key as any] = message;
          } else {
            delete record[ErrorsSymbol][key];
          }
        });
      });
    }

    return record;
  }

  private readonly [ErrorsSymbol]: ChildProps<this, string | true> = {};

  private readonly [ChangedKeysSymbol] = new Set<string | symbol>();

  private [InitialValuesSymbol]: ChildProps<this, any> = {};

  /**
   * By using this getter you can get the data from the schema without any
   * methods.
   *
   * Also, if any property in the schema is decorated with `presentation`
   * decorator, a function from the decorator will be applied to the property's
   * value.
   */
  get presentation(): ChildProps<this, any> {
    const presentationMetadata: Record<string, TPresentationConfig> = getMetadata(PresentationSymbol, this);
    const state: Record<string, any> = {};
    for (const key in this) {
      const config = presentationMetadata[key];

      if (config && config.hidden) continue;

      state[key] = config && config.presentation
        ? config.presentation(this[key], this)
        : this[key];
    }
    return state as ChildProps<this, any>;
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
   * @see {@link watch}
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
   * @param key - the name of needed property
   */
  getInitial<T>(key: keyof ChildProps<this>): T {
    return this[InitialValuesSymbol][key];
  }

  /**
   * A function, which synchronize current state with the initial state. After
   * it's call if `isChanged` getter was true, it will become false. Also,
   * after calling `reset` method, all the properties will be restored into
   * new saved initial state.
   *
   * @see {@link reset}
   */
  sync(): void {
    const initialValues = {};

    const watchMetadata: Record<string, TWatchConfig> = getMetadata(WatchSymbol, this);
    for (const key in watchMetadata) {
      const watchConfig = watchMetadata[key];
      initialValues[key] = watchConfig.saveFn ? watchConfig.saveFn(this[key], this) : this[key];
    }

    this[InitialValuesSymbol] = initialValues;
  }

  /**
   * A function, which restores all the properties in the schema into
   * initial state - the state that was created in the `create` static method,
   * or that was updated by `sync` method.
   */
  reset(): void {
    const watchMetadata: Record<string | symbol, TWatchConfig> = getMetadata(WatchSymbol, this);
    for (const key of this[ChangedKeysSymbol]) {
      const initialValue = this[InitialValuesSymbol][key];
      const watchConfig = watchMetadata[key];
      this[key] = (watchConfig && watchConfig.restoreFn)
        ? watchConfig.restoreFn(initialValue)
        : initialValue;
    }
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