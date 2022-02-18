import { action, computed, makeObservable, observable, observe } from 'mobx';
import { Constructable } from './types';

type TFieldArg = {
  factory?: (record: Record<string, any>) => any;
  watch?: boolean;
  comparator?: TComparator;
  label?: string;
};

const fieldSymbol = Symbol('FieldModel');

export const field = (config: TFieldArg = {}): PropertyDecorator => (target, propertyKey) => {
  if (config.watch === undefined) {
    config.watch = true;
  }
  const value: Record<string, TFieldArg> = { ...Reflect.getMetadata(fieldSymbol, target) };
  value[propertyKey as any] = config;
  Reflect.defineMetadata(fieldSymbol, value, target);
};

export type TValidator = (value: any, record?: Record<string, any>) => string | boolean;

export type TComparator = (prevValue: any, value: any, record?: Record<string, any>) => boolean;

export const deepComparator = (): TComparator => (prevValue: any[] | Record<string, any>, value: any[] | Record<string, any>) => {
  const keys1 = Object.keys(prevValue);
  const keys2 = Object.keys(value);
  return keys1.length === keys2.length && keys1.every(k => prevValue[k] === value[k]);
};

type TValidateArg = {
  preprocess?: (value: any, record?: Record<string, any>) => any;
  shouldCheckValidity?: (record?: Record<string, any>) => boolean;
  validators: TValidator[];
};

interface TValidate {
  (config: TValidateArg): PropertyDecorator,
  (validator: TValidator, ...validators: TValidateArg['validators']): PropertyDecorator,
}

const validateSymbol = Symbol('ValidateModel');

export const validate: TValidate = (...config: any[]) => (target, propertyKey) => {
  const value: Record<string, TValidateArg> = { ...Reflect.getMetadata(validateSymbol, target) };
  value[propertyKey as any] = config[0].validators ? config[0] : { validators: config };
  Reflect.defineMetadata(validateSymbol, value, target);
};

type ChildProps<T> = Partial<Record<keyof Omit<T, keyof Model>, string>>;

export type ExcludeModel<T> = Omit<T, keyof Model>;

export class Model {
  static create<T extends Model>(this: Constructable<T>, data?: Record<string, any>): T {
    const record = new this(data);

    const validateMetadata: Record<string, TValidateArg> = Reflect.getMetadata(validateSymbol, record) || {};
    const configsMetadata: Record<string, TFieldArg> = Reflect.getMetadata(fieldSymbol, record) || {};

    new Set([...Object.keys(configsMetadata), ...Object.keys(data || {})]).forEach(key => {
      if (configsMetadata[key]?.factory || (data && key in data)) {
        record[key] = configsMetadata[key]?.factory ? configsMetadata[key].factory(data) : data[key];
      }

      if (key in configsMetadata) {
        const { watch, comparator, label } = configsMetadata[key];

        watch && observe(record, key as any, ({ newValue, oldValue }) => {
          if (!(key in record.modified)) {
            if (!comparator || !comparator(oldValue, newValue)) {
              record.modified[key] = oldValue;
              record.modified = { ...record.modified };
            }
          } else if ((!comparator && record.modified[key] === newValue) || comparator?.(record.modified[key], newValue)) {
            delete record.modified[key];
            record.modified = { ...record.modified };
          }
        });

        if (label) {
          (record as any).labels ||= {};
          record.labels[key] = label;
        }
      }
    });

    Object.keys(validateMetadata).forEach(key => {
      const { preprocess, validators, shouldCheckValidity } = validateMetadata[key];
      observe(record, key as any, ({ newValue: value }) => {
        if (shouldCheckValidity && !shouldCheckValidity(record)) {
          delete record.errors[key];
          (record as any).errors = { ...record.errors };
          return;
        }
        const preprocessedValue = preprocess ? preprocess(value, record) : value;
        let message: string | boolean;
        for (const validator of validators) {
          message = validator(preprocessedValue, record);
          if (message) break;
        }
        if (typeof message === 'string' || message === true) {
          record.errors[key] !== message && ((record as any).errors = { ...record.errors, [key]: message });
        } else {
          delete record.errors[key];
          (record as any).errors = { ...record.errors };
        }
      }, true);
    });

    return record;
  }

  readonly labels: ChildProps<this>;

  @observable.ref readonly errors: ChildProps<this> = {};

  @observable.ref private modified: ChildProps<this> = {};

  get state(): Omit<this, keyof Model> {
    const state = { ...this } as any;
    delete state.modified;
    delete state.labels;
    delete state.errors;
    return state;
  }

  @computed get isChanged(): boolean {
    return Object.keys(this.modified).length > 0;
  }

  @computed get isValid(): boolean {
    return Object.values(this.errors).every(it => !it);
  }

  constructor() {
    makeObservable(this);
  }

  getInitial(key: keyof ChildProps<this>) {
    return this.modified[key];
  }

  @action commit(): void {
    this.modified = {};
  }
}
