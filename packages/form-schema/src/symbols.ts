const createSymbol = (name: string) => Symbol(name);

/**
 * WARNING: Please, do not use this import in the production build
 * @deprecated
 */
export const __WatchSymbol = createSymbol('Watch');

/**
 * WARNING: Please, do not use this import in the production build
 * @deprecated
 */
export const __ValidateSymbol = createSymbol('Validate');

/**
 * WARNING: Please, do not use this import in the production build
 * @deprecated
 */
export const __InitialValuesSymbol: unique symbol = createSymbol('InitialValues') as any;

/**
 * WARNING: Please, do not use this import in the production build
 * @deprecated
 */
export const __ErrorsSymbol: unique symbol = createSymbol('Errors') as any;

/**
 * WARNING: Please, do not use this import in the production build
 * @deprecated
 */
export const __ChangedKeysSymbol: unique symbol = createSymbol('ChangedKeys') as any;

/**
 * WARNING: Please, do not use this import in the production build
 * @deprecated
 */
export const __ExecSymbol: unique symbol = createSymbol('exec') as any;