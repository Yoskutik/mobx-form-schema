import { isTypeOf, SCHEMA, SCHEMAS_ARRAY, updateMetadata } from './utils';
import type { FormSchema } from './FormSchema';
import type { Constructable, FieldDecoratorWithContext, ExcludedFormSchemaKeyToValue, FieldDecorator } from './types';
import { FactorySymbol } from './symbols';
import { createSetCopy } from './watch';

export type TFactoryData<This extends Omit<FormSchema, 'changedProperties' | 'getInitial'>> =
  | ExcludedFormSchemaKeyToValue<This, any>;

export type TFactory<This extends FormSchema, Value> = (
  value: any,
  data: TFactoryData<This>,
  schema: This,
  defaultValue: Value,
) => Value;

export interface Factory {
  /**
   * A decorator that can set a factory for a property, that can be used
   * in the `FormSchema.create` method to create the initial state. A
   * factory uses data, that was passed into `FormSchema.create` method.
   *
   * @param factory - function that processes the value
   * @see {@link FormSchema.create}
   */<This extends FormSchema, Value>(factory: TFactory<This, Value>): FieldDecoratorWithContext<This, Value>;

  /**
   * A decorator that creates a factory for nested schemas.
   *
   * @param Schema - class of needed schema
   * @see {@link FormSchema.create}
   */
  schema<Value extends FormSchema>(Schema: Constructable<Value>): FieldDecorator<Value>;

  /**
   * A decorator that creates a factory for nested schemas.
   *
   * @param Schema - class of needed schema
   * @see {@link FormSchema.create}
   */
  schemasArray<Value extends FormSchema>(Schema: Constructable<Value>): FieldDecorator<Value[]>;

  /**
   * A decorator that creates a factory for sets of primitive values.
   *
   * @see {@link FormSchema.create}
   */
  set: FieldDecorator<Set<unknown>>;
}

// eslint-disable-next-line @typescript-eslint/no-shadow
export const factory: Factory = (<This extends FormSchema, Value>(factory) => (
  (target, propertyKey) => (
    updateMetadata<TFactory<This, Value>>(FactorySymbol, target, propertyKey, factory)
  )
)) as any;

const create = <T extends FormSchema>(Schema: Constructable<T>, data: unknown) => (
  data ? (Schema as unknown as typeof FormSchema).create(data) : data
);

const createDecorator = <This extends FormSchema, Value>(f: TFactory<This, Value>) => (
  (target, propertyKey) => (
    factory((value, data, schema: This, defaultValue: Value) => (
      (target && isTypeOf(propertyKey) ? propertyKey : (propertyKey as any).name) in data
        ? f(value, data, schema, defaultValue) : defaultValue
    ))(target, propertyKey)
  )
);

factory[SCHEMA] = Schema => createDecorator((data?: unknown) => create(Schema, data));

factory[SCHEMAS_ARRAY] = Schema => createDecorator(
  (data?: unknown[]) => (data ? data.map(it => create(Schema, it)) : data),
);

factory.set = createDecorator(createSetCopy);
