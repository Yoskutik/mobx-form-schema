/* eslint-disable max-lines */
import {
  action,
  autorun,
  computed,
  makeObservable,
  observable,
  observe,
  runInAction,
  isObservableProp,
  IReactionDisposer,
} from 'mobx';
import { TValidationConfig } from '@yoskutik/manual-form-schema/validate';
import {
  checkArraysEquality,
  checkSchemasArrayEquality,
  checkSetsEquality,
  checkSingleSchemaEquality,
  TWatchConfig,
} from '@yoskutik/manual-form-schema/watch';
import {
  $$ChangedKeysSymbol,
  $$ErrorsSymbol,
  $$InitialValuesSymbol,
  ValidateSymbol,
  WatchSymbol,
} from '@yoskutik/manual-form-schema/symbols';
import {
  COMPARATOR,
  forKeysInObject,
  getMetadata,
  PRESENTATION,
} from '@yoskutik/manual-form-schema/utils';
import { ChildProps, Constructable } from '@yoskutik/manual-form-schema/types';
import {
  checkForChangesSimpleField,
  validateSingleField,
  ManualFormSchema,
} from '@yoskutik/manual-form-schema/ManualFormSchema';

/**
 * Base class for creation schema form.
 */
export class FormSchema extends ManualFormSchema {
  /** The basic configuration of the schema */
  protected static config = {
    /**
     * If `false`, the validation and observation will be called using
     * `autorun`. In case, you want to handle the validation and check for
     * changes manually, you have to set it to `true`.
     */
    manual: false,
  };

  static create<T extends FormSchema>(this: Constructable<T>, data: ChildProps<T, any> = {}): T {
    const record = super.create(data) as T;

    const validateMetadata = getMetadata<TValidationConfig>(ValidateSymbol, record);
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

    try {
      makeObservable(record, extendingObservableOptions);
    } catch {
      forKeysInObject(extendingObservableOptions, key => (
        !isObservableProp(record, key) && extendingObservableOptions[key](record, key)
      ));
      makeObservable(record);
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
}

(ManualFormSchema as any).r = runInAction;
