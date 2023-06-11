export const OBJECT = Object;
export const REFLECT = Reflect;

export const getMetadata = <T>(metadataKey: string | symbol, target: object): Record<string, T> => REFLECT.getMetadata(metadataKey, target) || {};
export const getNewMetadata = <T>(metadataKey: string | symbol, target: object) => OBJECT.assign({}, getMetadata<T>(metadataKey, target));
export const defineMetadata = (metadataKey: string | symbol, metadataValue: any, target: object) => REFLECT.defineMetadata(metadataKey, metadataValue, target);