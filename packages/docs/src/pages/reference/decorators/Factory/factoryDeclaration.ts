import { ExcludedFormSchemaKeyToValue, FormSchema } from '@yoskutik/mobx-form-schema';

type FieldDecoratorWithContext<This, Result> = /* Declared dynamically */ any;

type TFactoryData<This extends Omit<FormSchema, 'changedProperties' | 'getInitial'>> =
  | ExcludedFormSchemaKeyToValue<This, unknown>;

export type TFactory<This extends FormSchema, Value> = (
  value: any,
  data: TFactoryData<This>,
  schema: This,
  defaultValue: Value,
) => Value;

export interface Factory {
  <This extends FormSchema, Value>(
    factory: TFactory<This, Value>
  ): FieldDecoratorWithContext<This, Value>;
}
