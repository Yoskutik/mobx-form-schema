import { PRESENTATION } from './utils';

const createSymbol = (name: string) => Symbol(name);

export const FactorySymbol = createSymbol('Factory');
export const WatchSymbol = createSymbol('Watch');
export const ValidateSymbol = createSymbol('Validate');
export const PresentationSymbol = createSymbol(PRESENTATION);
export const $$InitialValuesSymbol: unique symbol = createSymbol('InitialValues') as any;
export const $$ErrorsSymbol: unique symbol = createSymbol('Errors') as any;
export const $$ChangedKeysSymbol: unique symbol = createSymbol('ChangedKeys') as any;