import type { FormSchema } from './FormSchema';
import { __WatchSymbol, __InitialValuesSymbol, __ExecSymbol } from './symbols';
import { getMetadata, updateMetadata } from './utils';
import { FieldOrGetDecoratorThis, FieldOrGetDecorator, CreatePropertyDecoratorType } from './types';

type TComparator<This, Value> = (newValue: Value, oldValue: Value, schema: This) => boolean;
type TObjectSaveFn<This, Value> = (newValue: Value, schema: This) => void;
type TRestoreFn<Value> = (initialValue: Value) => void;

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
  configure: <This, Value>(comparator: TComparator<This, Value>, saveFn: TObjectSaveFn<This, Value>, restoreFn: TRestoreFn<Value>) => FieldOrGetDecoratorThis<This, Value>;

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
  restoreFn?: TRestoreFn<Value>;
};

const saveSchemaInitialValue = (value?: FormSchema) => {
  value && value.sync();
  return value;
};

const restoreSchemaFromInitialValue = (value?: FormSchema) => {
  value && value.reset();
  return value;
};

const checkSingleSchemaEquality = <This, Value extends FormSchema>(newSchema: Value, oldSchema: Value, schema: This, watchConfig?: any, isDifferent?: any) => {
  if (newSchema && newSchema.isChanged) return false;

  if (newSchema === oldSchema) return true;

  if (newSchema && oldSchema && newSchema.constructor === oldSchema.constructor) {
    watchConfig = getMetadata<TWatchConfig<This, Value>>(__WatchSymbol, newSchema);

    isDifferent = Object.keys(watchConfig).find(key => (
      !watchConfig[key].comparator(newSchema[key], oldSchema[key], newSchema)
    ));

    if (isDifferent) {
      schema[__ExecSymbol](() => newSchema[__InitialValuesSymbol] = oldSchema[__InitialValuesSymbol]);
    }

    return !isDifferent;
  }

  return false;
};

const createArrayComparator = (fn: TComparator<any, any>) => (newArr: unknown[], oldArr: unknown[], schema: any) => !!(
  (oldArr && newArr)
    ? oldArr.length === newArr.length && newArr.every((it, i) => fn(it, oldArr[i], schema))
    : oldArr === newArr
);

const primitivesComparator = (newValue: unknown, oldValue: unknown) => newValue === oldValue;
const returnValue = (value: unknown) => value;

const checkSchemasArrayEquality = createArrayComparator(checkSingleSchemaEquality);

const checkSetsEquality = (newValue: Set<unknown>, oldValue: Set<unknown>) => !!(
  newValue && oldValue && newValue.size === oldValue.size && Array.from(newValue).every((v) => oldValue.has(v))
);

const checkArraysEquality = createArrayComparator(primitivesComparator);

const createArrayCopy = (arr: unknown[]) => arr.slice();
const createSetCopy = (set: Set<unknown>) => new Set(set);

const configure: Watch['configure'] = <This, Value>(comparator, saveFn, restoreFn) => {
  const decorator = (target, propertyKey) => (
    updateMetadata<TWatchConfig<This, Value>>(__WatchSymbol, target, propertyKey, { comparator, saveFn, restoreFn })
  );

  (decorator as any).comparator = comparator;

  return decorator;
};

export const watch: Watch = configure(primitivesComparator, returnValue, returnValue) as any;

watch.configure = configure;

watch.schema = configure(
  checkSingleSchemaEquality,
  saveSchemaInitialValue,
  restoreSchemaFromInitialValue,
);
watch.schemasArray = configure(
  checkSchemasArrayEquality,
  (schemas: FormSchema[]) => schemas ? schemas.map(saveSchemaInitialValue) : schemas,
  (data: FormSchema[]) => data ? data.map(restoreSchemaFromInitialValue) : data,
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
