import 'reflect-metadata';
import { FormSchema, validate } from '@yoskutik/mobx-react-mvvm';
import { observable, runInAction } from 'mobx';

describe('validate decorator', () => {
  it('Simple validation', () => {
    class Schema extends FormSchema {
      @validate(v => v > 1)
      @observable field1 = 1;

      @validate(v => v < 1)
      @observable field2 = 2;
    }

    const schema = Schema.create();
    expect(schema.errors.field1).toBeFalsy();
    expect(schema.errors.field2).toBeFalsy();
    expect(schema.isValid).toEqual(true);

    runInAction(() => schema.field1 = 2);
    expect(schema.errors.field1).toBeTruthy();
    expect(schema.errors.field2).toBeFalsy();
    expect(schema.isValid).toEqual(false);

    runInAction(() => schema.field2 = 0);
    expect(schema.errors.field1).toBeTruthy();
    expect(schema.errors.field2).toBeTruthy();
    expect(schema.isValid).toEqual(false);
  });

  it('Validation based on other fields', () => {
    class Schema extends FormSchema {
      @validate((value: number, schema: Schema) => value > 1 || schema.field2 == 1)
      @observable field1 = 1;

      @observable field2 = 2;
    }

    const schema = Schema.create();
    expect(schema.errors.field1).toBeFalsy();
    expect(schema.isValid).toEqual(true);

    runInAction(() => schema.field1 = 2);
    expect(schema.errors.field1).toBeTruthy();
    expect(schema.isValid).toEqual(false);

    runInAction(() => schema.field1 = 1);
    expect(schema.errors.field1).toBeFalsy();
    expect(schema.isValid).toEqual(true);

    runInAction(() => schema.field2 = 1);
    expect(schema.errors.field1).toBeTruthy();
    expect(schema.isValid).toEqual(false);
  });

  describe('Conditional validation', () => {
    it('Simple conditional validation', () => {
      class Schema extends FormSchema {
        @validate(v => !/\S+@\S+\.\S+/.test(v)).if(Boolean)
        @observable email = 'mail@gmail.com';
      }

      const schema = Schema.create();
      expect(schema.errors.email).toBeFalsy();
      expect(schema.isValid).toEqual(true);

      runInAction(() => schema.email = 'mailgmail.com');
      expect(schema.errors.email).toBeTruthy();
      expect(schema.isValid).toEqual(false);

      runInAction(() => schema.email = '');
      expect(schema.errors.email).toBeFalsy();
      expect(schema.isValid).toEqual(true);
    });

    it('Conditional validation based on other fields', () => {
      class Schema extends FormSchema {
        @validate(v => !/\S+@\S+\.\S+/.test(v)).if((_, schema: Schema) => schema.shouldCheckEmail)
        @observable email = 'mailgmail.com';

        @observable shouldCheckEmail = false;
      }

      const schema = Schema.create();
      expect(schema.errors.email).toBeFalsy();
      expect(schema.isValid).toEqual(true);

      runInAction(() => schema.shouldCheckEmail = true);
      expect(schema.errors.email).toBeTruthy();
      expect(schema.isValid).toEqual(false);

      runInAction(() => schema.email = 'mail@gmail.com');
      expect(schema.errors.email).toBeFalsy();
      expect(schema.isValid).toEqual(true);
    });
  });

  it('Human readable errors', () => {
    class Schema extends FormSchema {
      @validate(v => v > 1 ? 'Field1 is not valid' : false)
      @observable field1 = 1;

      @validate(v => v < 1)
      @observable field2 = 2;
    }

    const schema = Schema.create();
    expect(schema.errors.field1).toBeUndefined();
    expect(schema.errors.field2).toBeUndefined();
    expect(schema.isValid).toEqual(true);

    runInAction(() => {
      schema.field1 = 2;
      schema.field2 = 0;
    });
    expect(schema.errors.field1).toEqual('Field1 is not valid');
    expect(schema.errors.field2).toEqual(true);
    expect(schema.isValid).toEqual(false);
  });
});
