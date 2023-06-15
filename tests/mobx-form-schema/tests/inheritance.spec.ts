import 'reflect-metadata';
import { FormSchema, validate, watch } from '@yoskutik/mobx-form-schema';
import { computed, makeObservable, runInAction } from 'mobx';

describe('Inheritance availability', () => {
  it('With decorators', () => {
    class BaseSchema extends FormSchema {
      @validate((field0) => field0 > 0)
      @watch field0 = 0;

      @validate((field0) => field0 > 5)
      @watch @computed get field1() {
        return this.field0;
      }

      constructor() {
        super();
        makeObservable(this);
      }
    }

    class SuperSchema extends BaseSchema {
      @validate((field0) => field0 > 5)
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
      @validate((field0) => field0 > 0)
      @watch field0 = 0;

      @validate((field0) => field0 > 5)
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
      @validate((field0) => field0 > 5)
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
});