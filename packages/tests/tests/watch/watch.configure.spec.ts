/* eslint-disable @typescript-eslint/no-use-before-define */
import { FormSchema, watch } from '@yoskutik/mobx-form-schema';
import { runInAction } from 'mobx';

describe('watch.configure', () => {
  it('Create custom decorator', () => {
    const custom = watch.configure(
      (newValue: unknown[], oldValue: unknown[]) => newValue[1] === oldValue[1],
      newValue => newValue.slice(),
      newValue => newValue.slice(),
    );

    class Schema extends FormSchema {
      @custom nested: [string, number] = ['field', 0];
    }

    const schema = Schema.create();

    runInAction(() => schema.nested[0] = 'other value');
    expect(schema.isChanged).toBeFalsy();

    runInAction(() => schema.nested[1]++);
    expect(schema.isChanged).toBeTruthy();

    runInAction(() => schema.nested[1]--);
    expect(schema.isChanged).toBeFalsy();

    runInAction(() => schema.nested = ['', 0]);
    expect(schema.isChanged).toBeFalsy();
  });

  it('Check arguments validity', () => {
    const compareFn = (newValue: number, oldValue: number, schema: Schema, key: string) => {
      expect(Number.isInteger(newValue)).toBeTruthy();
      expect(Number.isInteger(oldValue)).toBeTruthy();
      expect(schema).toBeInstanceOf(Schema);
      expect(key).toEqual('prop');
      return newValue === oldValue;
    };

    const saveFn = (newValue: number, schema: Schema) => {
      expect(Number.isInteger(newValue)).toBeTruthy();
      expect(schema).toBeInstanceOf(Schema);
      return newValue;
    };

    const restoreFn = (oldValue: number, schema: Schema) => {
      expect(Number.isInteger(oldValue)).toBeTruthy();
      expect(schema).toBeInstanceOf(Schema);
      return oldValue;
    };

    const dec = watch.configure(compareFn, saveFn, restoreFn);

    class Schema extends FormSchema {
      @dec prop = 1;
    }

    const schema = Schema.create();

    runInAction(() => schema.prop++);
    runInAction(() => schema.prop++);
    runInAction(() => schema.prop++);
  });
});
