import type { FormSchema } from './FormSchema';
import { WatchSymbol, InitialValuesSymbol } from './symbols';
import { defineMetadata, getMetadata, getNewMetadata } from './utils';
import { runInAction } from 'mobx';

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
  configure: (comparator: TComparator, saveFn?: TObjectSaveFn, restoreFn?: TRestoreFn) => PropertyDecorator;

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

const saveSchemaInitialValue = (value?: FormSchema) => {
  value && value.sync();
  return value;
};

const restoreSchemaFromInitialValue = (value?: FormSchema) => {
  value && value.reset();
  return value;
};

export const checkSingleSchemaEquality = (newSchema?: FormSchema, oldSchema?: FormSchema) => {
  if (newSchema && newSchema.isChanged) return false;

  if (newSchema === oldSchema) return true;

  if (newSchema && oldSchema && newSchema.constructor === oldSchema.constructor) {
    const watchConfig = getMetadata<TWatchConfig>(WatchSymbol, newSchema);

    for (const key in watchConfig) {
      const config = watchConfig[key];

      if (
        config.comparator ?
          !config.comparator(newSchema[key], oldSchema[key])
          : oldSchema[key] !== newSchema[key]
      ) {
        runInAction(() => newSchema[InitialValuesSymbol] = oldSchema[InitialValuesSymbol]);
        return false;
      }
    }

    return true;
  }

  return false;
};

export const checkSchemasArrayEquality = (schemas: FormSchema[], oldValue: FormSchema[]) => (
  oldValue.length === schemas.length && (
    schemas.every((schema, i) => (
      checkSingleSchemaEquality(schema, oldValue[i])
    ))
  )
);

/**
 * Decorator, which allows to automatically observe data changes in a schema.
 *
 * @see {@link FormSchema.getInitial}
 * @see {@link FormSchema.isChanged}
 */
export const watch: TWatch = (
  (target: object, propertyKey: string | symbol) => {
    const value: Record<string | symbol, TWatchConfig> = getNewMetadata(WatchSymbol, target);
    value[propertyKey] = {};
    defineMetadata(WatchSymbol, value, target);
  }
) as any;

const configure: TWatch['configure'] = (comparator: TComparator, saveFn?: TObjectSaveFn, restoreFn?: TRestoreFn) => (
  (target: object, propertyKey: string | symbol) => {
    const value: Record<string | symbol, TWatchConfig> = getNewMetadata(WatchSymbol, target);
    value[propertyKey] = { comparator, saveFn, restoreFn };
    defineMetadata(WatchSymbol, value, target);
  }
);

watch.configure = configure;

watch.schema = configure(
  checkSingleSchemaEquality,
  saveSchemaInitialValue,
  restoreSchemaFromInitialValue,
);
watch.schemasArray = configure(
  checkSchemasArrayEquality,
  (schemas: FormSchema[]) => schemas.map(saveSchemaInitialValue),
  (data: FormSchema[]) => data.map(restoreSchemaFromInitialValue),
);
watch.array = configure(
  (newValue: unknown[], oldValue: unknown[]) => newValue === oldValue || (
    newValue && oldValue && newValue.length === oldValue.length && newValue.every((v, i) => v === oldValue[i])
  ),
  (newValue: unknown[]) => newValue.slice(),
  (initialValue: unknown[]) => initialValue.slice(),
);
watch.set = configure(
  (newValue: Set<unknown>, oldValue: Set<unknown>) => {
    return newValue === oldValue || (
      newValue && oldValue && newValue.size === oldValue.size && Array.from(newValue).every((v) => oldValue.has(v))
    );
  },
  (newValue: Set<unknown>) => new Set(newValue),
  (initialValue: Set<unknown>) => new Set(initialValue),
);