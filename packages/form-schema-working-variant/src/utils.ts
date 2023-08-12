import { MetadataTargetSymbol } from './symbols';
export const OBJECT = Object;

export const COMPARATOR = 'comparator';
export const PRESENTATION = 'presentation';
export const SCHEMA = 'schema';
export const SCHEMAS_ARRAY = 'schemasArray';
export const OBJECT_KEYS = OBJECT.keys;

const TargetToMedataMap = new WeakMap();

export const isTypeOf = (obj, t = 'string') => typeof obj === t;

const getMetadataFromMap = (target) => TargetToMedataMap.get(target);

const OrdinaryGetMetadata = (MetadataKey, target, parent?: any) => {
  parent = getMetadataFromMap(target);
  parent = parent && parent[MetadataKey];
  if (parent) return parent;
  parent = OBJECT.getPrototypeOf(target);
  parent = isTypeOf(parent, 'object') ? parent : null;
  return parent ? OrdinaryGetMetadata(MetadataKey, parent) : undefined;
};

export const getMetadata = <T>(metadataKey: string | symbol, target: object): Record<string, T> =>
  OrdinaryGetMetadata(metadataKey, target) || {};

export const updateMetadata = <T>(
  metadataKey: any,
  target: any,
  propertyKey: any,
  value: T,
  metadata?: Record<string, any>,
  prevTarget?: any,
) => {
  if (target && (isTypeOf(propertyKey) || isTypeOf(propertyKey, 'symbol'))) {
    metadata = getMetadata<T>(metadataKey, target);
    prevTarget = metadata[MetadataTargetSymbol as any];
    if (prevTarget !== target) {
      metadata = OBJECT.assign({}, metadata);
    }
    metadata[propertyKey as string] = value;
    metadata[MetadataTargetSymbol as any] = target as any;
    (getMetadataFromMap(target) || (TargetToMedataMap.set(target, {}) && getMetadataFromMap(target)))[metadataKey] = metadata;
  } else {
    (propertyKey as any).addInitializer(
      function () {
        updateMetadata(metadataKey, this, (propertyKey as any).name, value);
      },
    );
  }
};
