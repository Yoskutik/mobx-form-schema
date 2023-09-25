type FieldOrGetDecoratorWithContext<This, Result> = /* Declared dynamically */ any;

type TComparator<This, Value> = (newValue: Value, oldValue: Value, schema: This, key: string) => boolean;
type TObjectSaveFn<This, Value> = (newValue: Value, schema: This) => void;
type TRestoreFn<This, Value> = (initialValue: Value, schema: This) => void;

declare function configure<This, Value>(
  comparator: TComparator<This, Value>,
  saveFn: TObjectSaveFn<This, Value>,
  restoreFn: TRestoreFn<This, Value>,
): FieldOrGetDecoratorWithContext<This, Value>;
