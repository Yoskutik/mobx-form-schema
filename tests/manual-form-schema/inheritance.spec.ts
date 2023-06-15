import 'reflect-metadata';
import { ManualFormSchema, validate, watch } from '@yoskutik/manual-form-schema';

describe('Inheritance availability', () => {
  it('With decorators', () => {
    class BaseSchema extends ManualFormSchema {
      @validate((field) => field > 0)
      @watch field = 0;

      @validate((arr) => !arr.length)
      @watch.array arr: string[] = [];
    }

    class SuperSchema extends BaseSchema {
      @validate((field0) => field0 > 5)
      field0 = 1;
    }

    const baseSchema = BaseSchema.create();
    const superSchema = SuperSchema.create();

    baseSchema.field = 1;
    baseSchema.validate();
    expect(Object.keys(baseSchema.errors)).toEqual(expect.arrayContaining(['arr', 'field']));
    expect(baseSchema.isValid).toBeFalsy();

    superSchema.field = 1;
    superSchema.validate();
    expect(Object.keys(superSchema.errors)).toEqual(expect.arrayContaining(['arr']));
    expect(superSchema.isValid).toBeFalsy();
  });
});