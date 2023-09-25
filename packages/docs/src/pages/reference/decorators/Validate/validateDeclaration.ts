type FieldOrGetDecoratorWithContext<This, Result> = /* Declared dynamically */ any;

type TValidator<This, Value> = (value: Value, schema: This) => string | boolean;
type TValidators<This, Value> = [TValidator<This, Value>, ...TValidator<This, Value>[]];

export interface Validate {
  <This, Value>(
    ...validators: TValidators<This, Value>
  ): FieldOrGetDecoratorWithContext<This, Value>;
}
