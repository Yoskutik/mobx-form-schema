import { FormSchema, validate } from '@yoskutik/mobx-form-schema';
import { makeObservable, observable, runInAction } from 'mobx';

describe('validate decorator', () => {
  it('Simple validation', () => {
    class Schema extends FormSchema {
      @validate((v: number) => v > 1)
      field1 = 1;

      @validate((v: number) => v < 1)
      field2 = 2;

      constructor() {
        super();
        makeObservable(this, {
          field1: observable,
          field2: observable,
        });
      }
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
      @validate((value: number, schema: Schema) => value > 1 || schema.field2 === 1)
      field1 = 1;

      field2 = 2;

      constructor() {
        super();
        makeObservable(this, {
          field1: observable,
          field2: observable,
        });
      }
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
        @validate.if(Boolean, [(v: string) => !/\S+@\S+\.\S+/.test(v)])
        email = 'mail@gmail.com';

        constructor() {
          super();
          makeObservable(this, {
            email: observable,
          });
        }
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
        @validate.if((_, schema: Schema) => schema.shouldCheckEmail, [v => !/\S+@\S+\.\S+/.test(v)])
        email = 'mailgmail.com';

        shouldCheckEmail = false;

        constructor() {
          super();

          makeObservable(this, {
            email: observable,
            shouldCheckEmail: observable,
          });
        }
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
      @validate((v: number) => (v > 1 ? 'Field1 is not valid' : false))
      field1 = 1;

      @validate((v: number) => v < 1)
      field2 = 2;

      constructor() {
        super();
        makeObservable(this, {
          field1: observable,
          field2: observable,
        });
      }
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

  it('Manual validation', () => {
    class Schema extends FormSchema {
      @validate((v: number) => (v > 1 ? 'Field1 is not valid' : false))
      field1 = 1;

      @validate((v: number) => v < 1)
      field2 = 2;
    }

    const schema = Schema.create();
    expect(schema.errors.field1).toBeUndefined();
    expect(schema.errors.field2).toBeUndefined();
    expect(schema.isValid).toEqual(true);

    runInAction(() => {
      schema.field1 = 2;
      schema.field2 = 0;
    });
    expect(schema.errors.field1).toBeUndefined();
    expect(schema.errors.field2).toBeUndefined();
    expect(schema.isValid).toEqual(true);

    schema.updateIsPropertyValid('field1');
    expect(schema.errors.field1).toEqual('Field1 is not valid');
    expect(schema.errors.field2).toBeUndefined();
    expect(schema.isValid).toEqual(false);

    runInAction(() => {
      schema.field1 = 0;
    });
    schema.updateIsValidAll();
    expect(schema.errors.field1).toBeUndefined();
    expect(schema.errors.field2).toEqual(true);
    expect(schema.isValid).toEqual(false);
  });

  it('Manual validation of non-existing property', () => {
    class Schema extends FormSchema {
      @validate((v: number) => (v > 1 ? 'Field1 is not valid' : false))
      field1 = 1;
    }

    const schema = Schema.create();

    expect(schema.updateIsPropertyValid('non-existing' as any)).toEqual(false);
  });
});
