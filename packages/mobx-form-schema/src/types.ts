import type { FormSchema } from './FormSchema';
import type { TypesConfiguration } from './TypesConfiguration';

export type Constructable<T> = (new (...args: any[]) => T);
export type ExcludeFormSchema<T> = Omit<T, keyof FormSchema>;
export type ExcludedFormSchemaKeyToValue<T, R> = Partial<Record<keyof ExcludeFormSchema<T>, R>>;

export type CreateDecoratorType<T, R> = TypesConfiguration extends { experimentalDecorators: true } ? R : T;
export type CreatePropertyDecoratorType<T> = CreateDecoratorType<T, PropertyDecorator>;

export type FieldDecorator<Result> = CreatePropertyDecoratorType<
<T>(value: unknown, context: ClassFieldDecoratorContext<T, Result>) => void
>;

export type FieldOrGetDecorator<Result> = CreatePropertyDecoratorType<
<T>(
  value: unknown,
  context:
  | ClassFieldDecoratorContext<T, Result>
  | ClassGetterDecoratorContext<T, Result>
) => void
>;

export type FieldDecoratorWithContext<This, Result> = CreatePropertyDecoratorType<
(value: unknown, context: ClassFieldDecoratorContext<This, Result>) => void
>;

export type FieldOrGetDecoratorWithContext<This, Result> = CreatePropertyDecoratorType<
(
  value: unknown,
  context:
  | ClassFieldDecoratorContext<This, Result>
  | ClassGetterDecoratorContext<This, Result>
) => void
>;
