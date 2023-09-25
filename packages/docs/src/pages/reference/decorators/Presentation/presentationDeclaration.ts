type FieldOrGetDecoratorWithContext<This, Result> = /* Declared dynamically */ any;

export type TPresentation<This, Value> = (value: Value, schema: This) => any;

export interface Presentation {
  <This, Value>(
    presentation: TPresentation<This, Value>,
  ): FieldOrGetDecoratorWithContext<This, Value>;
}
