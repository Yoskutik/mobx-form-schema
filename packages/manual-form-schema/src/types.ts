// getInitial returns type never in the FormSchema, but in real shemas it
//  has normal type, which is why this trick is needed.
import type { ManualFormSchema } from './ManualFormSchema';

type SchemaType = typeof ManualFormSchema;
export type SafeSchemaType = {
  [K1 in keyof SchemaType]: K1 extends 'prototype'
    ? {
      [K2 in keyof SchemaType['prototype']]: K2 extends 'getInitial'
        ? (field: string) => any
        : SchemaType['prototype'][K2]
    }
    : SchemaType[K1]
};

export type Constructable<T> = new (...args: any[]) => T;
export type ChildProps<T, R = string> = Partial<Record<keyof Omit<T, keyof ManualFormSchema>, R>>;
export type ExcludeFormSchema<T> = Omit<T, keyof ManualFormSchema>;