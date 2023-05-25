const createSymbol = (name: string) => Symbol(`FormSchema::${name}`);

export const FactorySymbol = createSymbol('Factory');
export const WatchSymbol = createSymbol('Watch');
export const ValidateSymbol = createSymbol('Validate');
export const PresentationSymbol = createSymbol('Presentation');
export const InitialValuesSymbol: unique symbol = createSymbol('InitialValues') as any;
export const ErrorsSymbol: unique symbol = createSymbol('Errors') as any;
export const ChangedKeysSymbol: unique symbol = createSymbol('ChangedKeys') as any;