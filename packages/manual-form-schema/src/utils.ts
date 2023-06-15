export const OBJECT = Object;
export const OBJECT_KEYS = OBJECT.keys;
export const forKeysInObject = <T>(obj: T, fn: (key: string) => void) => OBJECT_KEYS(obj).forEach(k => fn(k));
export const forUniqueKeysInObjects = (obj1: unknown, obj2: unknown, fn: (key: string) => void) => (
  new Set(OBJECT_KEYS(obj1).concat(OBJECT_KEYS(obj2))).forEach(k => fn(k))
);
export const PRESENTATION = 'presentation';
export const COMPARATOR = 'comparator';
const MetadataTarget = Symbol();

export const getMetadata = <T>(metadataKey: string | symbol, target: object): Record<string, T> => (Reflect as any).getMetadata(metadataKey, target) || {};

export const updateMetadata = <T>(
  metadataKey: string | symbol,
  target: object,
  propertyKey: string | symbol,
  value: T,
  metadata = getMetadata<T>(metadataKey, target),
  prevTarget = metadata[MetadataTarget as any],
) => {
  if (prevTarget !== target) {
    metadata = OBJECT.assign({}, metadata);
  }
  metadata[propertyKey as string] = value;
  metadata[MetadataTarget as any] = target as any;
  return (Reflect as any).defineMetadata(metadataKey, metadata, target);
};

export const noop = (fn: (...args: any[]) => any) => fn();