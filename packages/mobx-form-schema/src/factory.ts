import { defineMetadata, getNewMetadata } from './utils';
import { FactorySymbol } from './symbols';

export type TFactory = (obj: any) => any;

type Factory = (factory: TFactory) => PropertyDecorator;

/**
 * A decorator, that can set a factory for a property, that can be used
 * in the `FormSchema.create` method to create the initial state. A
 * factory uses data, that was passed into `FormSchema.create` method.
 *
 * @param factory
 * @see {@link FormSchema.create}
 */
// eslint-disable-next-line @typescript-eslint/no-shadow
export const factory: Factory = (factory) => (
  (target, propertyKey) => {
    const value: Record<string | symbol, TFactory> = getNewMetadata(FactorySymbol, target);
    value[propertyKey] = factory;
    defineMetadata(FactorySymbol, value, target);
  }
);
