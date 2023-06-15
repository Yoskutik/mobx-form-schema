import { ManualFormSchema } from './ManualFormSchema';
import { WatchSymbol, $$InitialValuesSymbol } from './symbols';
import { COMPARATOR, getMetadata, OBJECT_KEYS, updateMetadata } from './utils';

type TComparator = (newValue: any, oldValue: any) => boolean;
type TObjectSaveFn = (newValue: any, schema: any) => any;
type TRestoreFn = (initialValue: any) => any;

type TWatch = PropertyDecorator & {
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
  configure: (comparator: TComparator, saveFn: TObjectSaveFn, restoreFn: TRestoreFn) => PropertyDecorator;

  /**
   * A modified that simplifies observing data changes in schema, that is
   * used inside other schema.
   */
  schema: PropertyDecorator;

  /**
   * A modified that simplifies observing data changes in array of schemas,
   * that are used inside other schema.
   */
  schemasArray: PropertyDecorator;

  /**
   * A modified that simplifies observing data changes in array of primitive
   * values (e.g. number, string, booleans, etc.).
   */
  array: PropertyDecorator;

  /**
   * A modified that simplifies observing data changes in set of primitive
   * values (e.g. number, string, booleans, etc.).
   */
  set: PropertyDecorator;
};

export type TWatchConfig = {
  comparator?: TComparator;
  saveFn?: TObjectSaveFn;
  restoreFn?: TRestoreFn;
};

const saveSchemaInitialValue = (value?: ManualFormSchema) => {
  value && value.sync();
  return value;
};

const restoreSchemaFromInitialValue = (value?: ManualFormSchema) => {
  value && value.reset();
  return value;
};

export const checkSingleSchemaEquality = (newSchema?: ManualFormSchema, oldSchema?: ManualFormSchema, watchConfig?: any, isDifferent?: any) => {
  if (newSchema && newSchema.isChanged) return false;

  if (newSchema === oldSchema) return true;

  if (newSchema && oldSchema && newSchema.constructor === oldSchema.constructor) {
    watchConfig = getMetadata<TWatchConfig>(WatchSymbol, newSchema);

    isDifferent = OBJECT_KEYS(watchConfig).find(key => (
      !watchConfig[key][COMPARATOR](newSchema[key], oldSchema[key])
    ));

    if (isDifferent) {
      (ManualFormSchema as any).r(() => newSchema[$$InitialValuesSymbol] = oldSchema[$$InitialValuesSymbol]);
    }

    return !isDifferent;
  }

  return false;
};

const createArrayComparator = (fn: any) => (newArr: unknown[], oldArr: unknown[]) => !!(
  (oldArr && newArr)
    ? oldArr.length === newArr.length && newArr.every((it, i) => fn(it, oldArr[i]))
    : oldArr === newArr
);

const primitivesComparator = (newValue: unknown, oldValue: unknown) => newValue === oldValue;

export const checkSchemasArrayEquality = createArrayComparator(checkSingleSchemaEquality);

export const checkSetsEquality = (newValue: Set<unknown>, oldValue: Set<unknown>) => !!(
  newValue && oldValue && newValue.size === oldValue.size && Array.from(newValue).every((v) => oldValue.has(v))
);

export const checkArraysEquality = createArrayComparator(primitivesComparator);

const createArrayCopy = (arr: unknown[]) => arr.slice();
const createSetCopy = (set: Set<unknown>) => new Set(set);

/**
 * Decorator, which allows to automatically observe data changes in a schema.
 *
 * @see {@link FormSchema.getInitial}
 * @see {@link FormSchema.isChanged}
 */
export const watch: TWatch = (
  (target: object, propertyKey: string | symbol) => (
    updateMetadata<TWatchConfig>(WatchSymbol, target, propertyKey, { [COMPARATOR]: primitivesComparator })
  )
) as any;

const configure: TWatch['configure'] = (comparator: TComparator, saveFn: TObjectSaveFn, restoreFn: TRestoreFn) => (
  (target: object, propertyKey: string | symbol) => (
    updateMetadata<TWatchConfig>(WatchSymbol, target, propertyKey, { [COMPARATOR]: comparator, saveFn, restoreFn })
  )
);

watch.configure = configure;

watch.schema = configure(
  checkSingleSchemaEquality,
  saveSchemaInitialValue,
  restoreSchemaFromInitialValue,
);
watch.schemasArray = configure(
  checkSchemasArrayEquality,
  (schemas: ManualFormSchema[]) => schemas ? schemas.map(saveSchemaInitialValue) : schemas,
  (data: ManualFormSchema[]) => data ? data.map(restoreSchemaFromInitialValue) : data,
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