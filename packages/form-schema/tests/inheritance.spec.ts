import { FormSchema, validate, watch } from '@yoskutik/mobx-form-schema';
import { computed, makeObservable, observable, runInAction } from 'mobx';

describe('Inheritance availability', () => {
  it('With decorators', () => {
    class BaseSchema extends FormSchema {
      @validate((field0: number) => field0 > 0)
      @watch field0 = 0;

      @validate((field0: number) => field0 > 5)
      @watch get field1() {
        return this.field0;
      }

      constructor() {
        super();
        makeObservable(this, {
          field1: computed,
        });
      }
    }

    class SuperSchema extends BaseSchema {
      @validate((field0: number) => field0 > 5)
      field0 = 1;
    }

    const baseSchema = BaseSchema.create();
    const superSchema = SuperSchema.create();

    runInAction(() => baseSchema.field0 = 1);
    expect(baseSchema.isValid).toBeFalsy();
    runInAction(() => superSchema.field0 = 1);
    expect(superSchema.isValid).toBeTruthy();

    runInAction(() => baseSchema.field0 = 6);
    expect(baseSchema.isValid).toBeFalsy();
    runInAction(() => superSchema.field0 = 6);
    expect(superSchema.isValid).toBeFalsy();
  });

  it('Without decorators', () => {
    class BaseSchema extends FormSchema {
      field0 = 0;
    }

    class SuperSchema extends BaseSchema {
      @validate((field0: number) => field0 > 5)
      field0 = 1;

      constructor() {
        super();
        makeObservable(this, {
          field0: observable,
        });
      }
    }

    const baseSchema = BaseSchema.create();
    const superSchema = SuperSchema.create();

    runInAction(() => baseSchema.field0 = 1);
    expect(baseSchema.isValid).toBeTruthy();
    runInAction(() => superSchema.field0 = 1);
    expect(superSchema.isValid).toBeTruthy();

    runInAction(() => baseSchema.field0 = 6);
    expect(baseSchema.isValid).toBeTruthy();
    runInAction(() => superSchema.field0 = 6);
    expect(superSchema.isValid).toBeFalsy();
  });

  it('Deep inheritance', () => {
    class SchemaLevel0 extends FormSchema {
      @validate(v => v > 0)
      @watch field0 = 0;
    }

    class SchemaLevel1 extends SchemaLevel0 {
      field1 = 0;
    }

    class SchemaLevel2 extends SchemaLevel1 {
      @validate(v => v > 5)
      @watch field1 = 0;
    }

    class SchemaLevel3 extends SchemaLevel2 {
      @validate(v => v > 2)
      field0 = 0;

      @validate(v => v > 3)
      @watch field2 = 0;
    }

    const schema = SchemaLevel3.create();

    runInAction(() => schema.field0 = 1);
    expect(schema.isValid).toBeTruthy();
    runInAction(() => schema.field0 = 3);
    expect(schema.isValid).toBeFalsy();
    schema.reset();

    runInAction(() => schema.field1 = 4);
    expect(schema.isValid).toBeTruthy();
    runInAction(() => schema.field1 = 6);
    expect(schema.isValid).toBeFalsy();
    schema.reset();

    runInAction(() => schema.field2 = 4);
    expect(schema.isValid).toBeFalsy();
  });
});