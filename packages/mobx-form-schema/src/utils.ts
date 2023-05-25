export const OBJECT = Object;
export const REFLECT = Reflect;

export const getMetadata = (metadataKey: string | symbol, target: object) => REFLECT.getMetadata(metadataKey, target) || {};
export const getNewMetadata = (metadataKey: string | symbol, target: object) => OBJECT.assign({}, getMetadata(metadataKey, target));
export const defineMetadata = (metadataKey: string | symbol, metadataValue: any, target: object) => REFLECT.defineMetadata(metadataKey, metadataValue, target);