import { updateMetadata } from './utils';
import { FactorySymbol } from './symbols';
import type { ManualFormSchema } from './ManualFormSchema';
import type { SafeSchemaType } from './types';

export type TFactory = (value: any, obj: any, defaultValue: any) => any;

type Factory = ((factory: TFactory) => PropertyDecorator) & {
  /**
   * A decorator that creates a factory for nested schemas.
   *
   * @param Schema - class of needed schema
   * @see {@link FormSchema.create}
   */
  forSchema<T extends SafeSchemaType>(Schema: T): PropertyDecorator;

  /**
   * A decorator that creates a factory for nested schemas.
   *
   * @param Schema - class of needed schema
   * @see {@link FormSchema.create}
   */
  forSchemasArray<T extends SafeSchemaType>(Schema: T): PropertyDecorator;

  /**
   * A decorator that creates a factory for sets of primitive values.
   *
   * @see {@link FormSchema.create}
   */
  set: PropertyDecorator;
};

/**
 * A decorator that can set a factory for a property, that can be used
 * in the `FormSchema.create` method to create the initial state. A
 * factory uses data, that was passed into `FormSchema.create` method.
 *
 * @param factory - function that processes the value
 * @see {@link FormSchema.create}
 */
export const factory: Factory = (factory) => ( // eslint-disable-line @typescript-eslint/no-shadow
  (target, propertyKey) => (
    updateMetadata<TFactory>(FactorySymbol, target, propertyKey, factory)
  )
);

const create = (Schema: SafeSchemaType, data: unknown) => data ? (Schema as typeof ManualFormSchema).create(data) : data;

const createDecorator = (f: TFactory) => (
  (target, propertyKey) => factory((value, data, defaultValue) => propertyKey in data ? f(value, data, defaultValue) : defaultValue)(target, propertyKey)
);

factory.forSchema = (Schema) => createDecorator((data?: unknown) => create(Schema, data));

factory.forSchemasArray = (Schema) => createDecorator((data?: unknown[]) => data ? data.map(it => create(Schema, it)) : data);

factory.set = createDecorator((data?: unknown[]) => new Set(data));
