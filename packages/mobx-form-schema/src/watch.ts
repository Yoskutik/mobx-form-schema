import { runInAction, isObservableSet } from 'mobx';
import { FormSchema } from './FormSchema';
import { WatchSymbol, InitialValuesSymbol } from './symbols';
import {
  COMPARATOR,
  getMetadata,
  OBJECT_KEYS,
  SCHEMA,
  SCHEMAS_ARRAY,
  updateMetadata,
  warnAboutProperty,
} from './utils';
import type { FieldOrGetDecoratorWithContext, FieldOrGetDecorator, CreatePropertyDecoratorType } from './types';

type TComparator<This, Value> = (newValue: Value, oldValue: Value, schema: This, key: string) => boolean;
type TObjectSaveFn<This, Value> = (newValue: Value, schema: This) => void;
type TRestoreFn<This, Value> = (initialValue: Value, schema: This) => void;

/**
 * Decorator, which allows to automatically observe data changes in a schema.
 *
 * @see {@link FormSchema.getInitial}
 * @see {@link FormSchema.isChanged}
 */
export interface Watch extends FieldOrGetDecorator<any> {
  /**
   * A function, which allows to create your own version of `watch` decorator.
   *
   * @param comparator - A function that will compare current value with the
   * initial one.
   * @param saveFn - A function that will save the initial value. Called
   * in `FormSchema.create` and `sync` methods.
   * @param restoreFn - A function that will restore current value usung the
   * initial one. Called in `reset` method.
   */
  configure: <This, Value>(
    comparator: TComparator<This, Value>,
    saveFn: TObjectSaveFn<This, Value>,
    restoreFn: TRestoreFn<This, Value>,
  ) => FieldOrGetDecoratorWithContext<This, Value>;

  /**
   * A modified that simplifies observing data changes in schema, that is
   * used inside other schema.
   */
  schema: CreatePropertyDecoratorType<
  <This, Value extends FormSchema>(
    value: unknown,
    context:
    | ClassFieldDecoratorContext<This, Value>
    | ClassGetterDecoratorContext<This, Value>
  ) => void
  >;

  /**
   * A modified that simplifies observing data changes in array of schemas,
   * that are used inside other schema.
   */
  schemasArray: CreatePropertyDecoratorType<
  <This, Value extends FormSchema>(
    value: unknown,
    context:
    | ClassFieldDecoratorContext<This, Value[]>
    | ClassGetterDecoratorContext<This, Value[]>
  ) => void
  >;

  /**
   * A modified that simplifies observing data changes in array of primitive
   * values (e.g. number, string, booleans, etc.).
   */
  array: FieldOrGetDecorator<unknown[]>;

  /**
   * A modified that simplifies observing data changes in set of primitive
   * values (e.g. number, string, booleans, etc.).
   */
  set: FieldOrGetDecorator<Set<unknown>>;
}

export type TWatchConfig<This, Value> = {
  comparator?: TComparator<This, Value>;
  saveFn?: TObjectSaveFn<This, Value>;
  restoreFn?: TRestoreFn<This, Value>;
};

const saveSchemaInitialValue = (value?: FormSchema) => {
  value && value.sync();
  return value;
};

const restoreSchemaFromInitialValue = (value?: FormSchema) => {
  value && value.reset();
  return value;
};

export const checkSingleSchemaEquality = <This, Value extends FormSchema>(
  newSchema: Value,
  oldSchema: Value,
  schema: This,
  key: string,
  watchConfig?: any,
  isDifferent?: any,
) => {
  if (__DEV__) {
    if (!(newSchema instanceof FormSchema || newSchema === null || newSchema === undefined)) {
      warnAboutProperty(
        schema as any,
        key,
        'is being compared as FormSchema instance but new value is not an instance of FormSchema.',
      );
    }
  }

  if (newSchema && newSchema.isChanged) return false;

  if (newSchema === oldSchema) return true;

  if (newSchema && oldSchema && newSchema.constructor === oldSchema.constructor) {
    watchConfig = getMetadata<TWatchConfig<This, Value>>(WatchSymbol, newSchema);

    isDifferent = OBJECT_KEYS(watchConfig).find(k => (
      !watchConfig[k][COMPARATOR](newSchema[k], oldSchema[k], newSchema)
    ));

    if (isDifferent) {
      runInAction(() => newSchema[InitialValuesSymbol] = oldSchema[InitialValuesSymbol]);
    }

    return !isDifferent;
  }

  return false;
};

const createArrayComparator = (fn: TComparator<any, any>) => (
  (newArr: unknown[], oldArr: unknown[], schema: any, key: string) => {
    if (__DEV__) {
      if (!(Array.isArray(newArr) || newArr === null || newArr === undefined)) {
        warnAboutProperty(schema, key, 'is being compared as array, but new value is not an array.');
      }
    }

    return !!(
      (oldArr && newArr)
        ? oldArr.length === newArr.length && newArr.every((it, i) => fn(it, oldArr[i], schema, key))
        : oldArr === newArr
    );
  }
);

export const primitivesComparator = (newValue: unknown, oldValue: unknown) => newValue === oldValue;
const returnValue = (value: unknown) => value;

export const checkSchemasArrayEquality = createArrayComparator(checkSingleSchemaEquality);

export const checkSetsEquality = (newValue: Set<unknown>, oldValue: Set<unknown>, schema, key) => {
  if (__DEV__) {
    if (!(newValue instanceof Set || isObservableSet(newValue) || newValue === null || newValue === undefined)) {
      warnAboutProperty(schema, key, 'is being compared as set, but new value is not a set.');
    }
  }

  return !!(
    newValue && oldValue && newValue.size === oldValue.size && Array.from(newValue).every(v => oldValue.has(v))
  );
};

export const checkArraysEquality = createArrayComparator(primitivesComparator);

const createArrayCopy = (arr: unknown[]) => arr.slice();
export const createSetCopy = <T>(set?: Set<T> | T[]) => new Set<T>(set);

const configure: Watch['configure'] = <This, Value>(comparator, saveFn, restoreFn) => {
  const decorator = (target, propertyKey) => (
    updateMetadata<TWatchConfig<This, Value>>(
      WatchSymbol,
      target,
      propertyKey,
      { [COMPARATOR]: comparator, saveFn, restoreFn },
    )
  );

  (decorator as any)[COMPARATOR] = comparator;

  return decorator;
};

export const watch: Watch = configure(primitivesComparator, returnValue, returnValue) as any;

watch.configure = configure;

watch[SCHEMA] = configure(
  checkSingleSchemaEquality,
  saveSchemaInitialValue,
  restoreSchemaFromInitialValue,
);
watch[SCHEMAS_ARRAY] = configure(
  checkSchemasArrayEquality,
  (schemas: FormSchema[]) => (schemas ? schemas.map(saveSchemaInitialValue) : schemas),
  (data: FormSchema[]) => (data ? data.map(restoreSchemaFromInitialValue) : data),
);
watch.array = configure(
  checkArraysEquality,
  createArrayCopy,
  createArrayCopy,
);
watch.set = configure(
  checkSetsEquality,
  createSetCopy,
  createSetCopy,
);
