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
import type { TValidationConfig } from './validate';
import { watch, type TWatchConfig } from './watch';
import {
  ChangedKeysSymbol,
  ErrorsSymbol,
  __ExecSymbol,
  InitialValuesSymbol,
  ValidateSymbol,
  WatchSymbol,
} from './symbols';
import { getMetadata } from './utils';
import type { Constructable, CreateDecoratorType } from './types';
import { FormSchema } from './FormSchema';

const forKeysInObject = <T>(obj: T, fn: (key: string) => void) => Object.keys(obj).forEach(k => fn(k));

type Automate = CreateDecoratorType<
  <T extends FormSchema>(Class: Constructable<T>, context: ClassDecoratorContext<Constructable<T>>) => void,
  ClassDecorator
>;

const { validateOnly, checkChangesOf } = FormSchema.prototype;
const COMPARATOR = 'comparator';

export const automate: Automate = (
  <T extends FormSchema>(Class: Constructable<T>) => {
    if ((Class as any).isAutomated) return;

    (Class as any).isAutomated = true;
    const create = (Class as any).create;
    (Class as any).create = function (data) {
      const record = create.call(this, data) as T;
      (record as any)[__ExecSymbol] = runInAction;

      const validateMetadata = getMetadata<TValidationConfig<T, unknown>>(ValidateSymbol, record);
      const watchMetadata = getMetadata<TWatchConfig<T, unknown>>(WatchSymbol, record);

      const extendingObservableOptions: Record<string, any> = {
        [InitialValuesSymbol]: observable.ref,
        [ChangedKeysSymbol]: observable,
        [ErrorsSymbol]: observable,

        presentation: computed,
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

      forKeysInObject(watchMetadata, (key, decorator?: any, comparator?: any) => {
        if (!isObservableProp(record, key)) {
          decorator = observable;
          comparator = watchMetadata[key][COMPARATOR];

          // @watch.schema will apply @observable.ref
          if (comparator === watch.schema[COMPARATOR]) {
            decorator = observable.ref;
          // @watch.schemasArray, @watch.set and @watch.array will apply @observable.shallow
          } else if (
            comparator === watch.array[COMPARATOR]
            || comparator === watch.set[COMPARATOR]
            || comparator === watch.schemasArray[COMPARATOR]
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

      forKeysInObject(watchMetadata, (key, autorunCompareDisposer?: IReactionDisposer) => {
        return observe(record, key as keyof T, () => {
          autorunCompareDisposer && autorunCompareDisposer();
          return autorunCompareDisposer = autorun(() => checkChangesOf.call(record, key));
        }, true);
      });

      forKeysInObject(validateMetadata, key => autorun(() => validateOnly.call(record, key)));

      return record;
    } as any;
  }
) as any;
