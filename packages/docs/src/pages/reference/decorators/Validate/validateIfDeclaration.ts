type FieldOrGetDecoratorWithContext<This, Result> = /* Declared dynamically */ any;

type TValidationCondition<This, Value> = (value: Value, schema: This) => boolean;
type TValidator<This, Value> = (value: Value, schema: This) => string | boolean;
type TValidators<This, Value> = [TValidator<This, Value>, ...TValidator<This, Value>[]];

export interface Validate {
  if<This, Value>(
    condition: TValidationCondition<This, Value>,
    validators: TValidators<This, Value>,
  ): FieldOrGetDecoratorWithContext<This, Value>
}
