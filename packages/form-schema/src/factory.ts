import { updateMetadata } from './utils';
import type { FormSchema } from './FormSchema';
import type { Constructable, FieldDecoratorWithThis, ChildProps, FieldDecorator } from './types';

export type TFactory<This, Value> = (value: any, obj: ChildProps<This, any>, defaultValue: Value) => Value;

export interface Factory {
  /**
   * A decorator that can set a factory for a property, that can be used
   * in the `FormSchema.create` method to create the initial state. A
   * factory uses data, that was passed into `FormSchema.create` method.
   *
   * @param factory - function that processes the value
   * @see {@link FormSchema.create}
   */
  <This, Value>(factory: TFactory<This, Value>): FieldDecoratorWithThis<This, Value>;

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

/**
 * WARNING: Please, do not use this import in the production build
 * @deprecated
 */
export const __FactorySymbol = Symbol();

export const factory: Factory = <This, Value>(factory) => ( // eslint-disable-line @typescript-eslint/no-shadow
  (target, propertyKey) => (
    updateMetadata<TFactory<This, Value>>(__FactorySymbol, target, propertyKey, factory)
  )
);

const create = <T extends FormSchema>(Schema: Constructable<T>, data: unknown) => data ? (Schema as unknown as typeof FormSchema).create(data) : data;

const createDecorator = <This, Value>(f: TFactory<This, Value>) => (
  (target, propertyKey) => (
    factory((value, data, defaultValue: Value) => (
      (target && typeof propertyKey === 'string' ? propertyKey : (propertyKey as any).name) in data
        ? f(value, data, defaultValue) : defaultValue
    ))(target, propertyKey)
  )
);

factory.schema = (Schema) => createDecorator((data?: unknown) => create(Schema, data));

factory.schemasArray = (Schema) => createDecorator((data?: unknown[]) => data ? data.map(it => create(Schema, it)) : data);

factory.set = createDecorator((data?: unknown[]) => new Set(data));