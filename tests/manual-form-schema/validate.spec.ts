import 'reflect-metadata';
import { ManualFormSchema, validate } from '@yoskutik/manual-form-schema';

describe('validate decorator', () => {
  it('Simple validation', () => {
    class Schema extends ManualFormSchema {
      @validate(v => v > 1)
      field1 = 1;

      @validate(v => v < 1)
      field2 = 2;
    }

    const schema = Schema.create();
    expect(schema.errors.field1).toBeFalsy();
    expect(schema.errors.field2).toBeFalsy();
    expect(schema.isValid).toEqual(true);

    schema.field1 = 2;
    schema.validate();
    expect(schema.errors.field1).toBeTruthy();
    expect(schema.errors.field2).toBeFalsy();
    expect(schema.isValid).toEqual(false);

    schema.field2 = 0;
    schema.validate();
    expect(schema.errors.field1).toBeTruthy();
    expect(schema.errors.field2).toBeTruthy();
    expect(schema.isValid).toEqual(false);
  });

  it('Validation based on other fields', () => {
    class Schema extends ManualFormSchema {
      @validate((value: number, schema: Schema) => value > 1 || schema.field2 == 1)
      field1 = 1;

      field2 = 2;
    }

    const schema = Schema.create();
    expect(schema.errors.field1).toBeFalsy();
    expect(schema.isValid).toEqual(true);

    schema.field1 = 2;
    schema.validate('field1');
    expect(schema.errors.field1).toBeTruthy();
    expect(schema.isValid).toEqual(false);

    schema.field1 = 1;
    schema.validate('field1');
    expect(schema.errors.field1).toBeFalsy();
    expect(schema.isValid).toEqual(true);

    schema.field2 = 1;
    schema.validate();
    expect(schema.errors.field1).toBeTruthy();
    expect(schema.isValid).toEqual(false);
  });

  describe('Conditional validation', () => {
    it('Simple conditional validation', () => {
      class Schema extends ManualFormSchema {
        @validate(v => !/\S+@\S+\.\S+/.test(v)).if(Boolean)
        email = 'mail@gmail.com';
      }

      const schema = Schema.create();
      expect(schema.errors.email).toBeFalsy();
      expect(schema.isValid).toEqual(true);

      schema.email = 'mailgmail.com';
      schema.validate('email');
      expect(schema.errors.email).toBeTruthy();
      expect(schema.isValid).toEqual(false);

      schema.email = '';
      schema.validate('email');
      expect(schema.errors.email).toBeFalsy();
      expect(schema.isValid).toEqual(true);
    });

    it('Conditional validation based on other fields', () => {
      class Schema extends ManualFormSchema {
        @validate(v => !/\S+@\S+\.\S+/.test(v)).if((_, schema: Schema) => schema.shouldCheckEmail)
        email = 'mailgmail.com';

        shouldCheckEmail = false;
      }

      const schema = Schema.create();
      expect(schema.errors.email).toBeFalsy();
      expect(schema.isValid).toEqual(true);

      schema.shouldCheckEmail = true;
      schema.validate();
      expect(schema.errors.email).toBeTruthy();
      expect(schema.isValid).toEqual(false);

      schema.email = 'mail@gmail.com';
      schema.validate();
      expect(schema.errors.email).toBeFalsy();
      expect(schema.isValid).toEqual(true);
    });
  });

  it('Human readable errors', () => {
    class Schema extends ManualFormSchema {
      @validate(v => v > 1 ? 'Field1 is not valid' : false)
      field1 = 1;

      @validate(v => v < 1)
      field2 = 2;
    }

    const schema = Schema.create();
    expect(schema.errors.field1).toBeUndefined();
    expect(schema.errors.field2).toBeUndefined();
    expect(schema.isValid).toEqual(true);

    schema.field1 = 2;
    schema.field2 = 0;
    schema.validate();
    expect(schema.errors.field1).toEqual('Field1 is not valid');
    expect(schema.errors.field2).toEqual(true);
    expect(schema.isValid).toEqual(false);
  });
});
