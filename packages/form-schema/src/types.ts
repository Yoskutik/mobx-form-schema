import type { FormSchema } from './FormSchema';
import type { TypesConfiguration } from './TypesConfiguration';

export type Constructable<T> = (new (...args: any[]) => T);
export type ChildProps<T, R = string> = Partial<Record<keyof Omit<T, keyof FormSchema>, R>>;
export type ExcludeFormSchema<T> = Omit<T, keyof FormSchema>;

export type CreateDecoratorType<T, R> = TypesConfiguration extends { experimentalDecorators: false } ? T : R;
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

export type FieldDecoratorWithThis<This, Result> = CreatePropertyDecoratorType<
  (value: unknown, context: ClassFieldDecoratorContext<This, Result>) => void
>

export type FieldOrGetDecoratorThis<This, Result> = CreatePropertyDecoratorType<
  (
    value: unknown,
    context:
      | ClassFieldDecoratorContext<This, Result>
      | ClassGetterDecoratorContext<This, Result>
  ) => void
>;
