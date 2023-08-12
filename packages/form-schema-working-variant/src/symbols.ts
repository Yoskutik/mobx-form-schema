const createSymbol = (name?: string) => Symbol(name);

export const WatchSymbol = createSymbol();

export const ValidateSymbol = createSymbol();

export const InitialValuesSymbol: unique symbol = createSymbol('InitialValues') as any;

export const ErrorsSymbol: unique symbol = createSymbol('Errors') as any;

export const ChangedKeysSymbol: unique symbol = createSymbol('ChangedKeys') as any;

export const FactorySymbol = createSymbol();

export const PresentationSymbol = createSymbol();

export const MetadataTargetSymbol = createSymbol();
