import { watch, FormSchema } from '@yoskutik/form-schema';
import { computed, makeObservable, observable, observe, reaction, runInAction } from 'mobx';
import { automate } from '@yoskutik/form-schema/mobx-automate';
import { __ExecSymbol } from '@yoskutik/form-schema/symbols';

describe('watch decorator', () => {
  it('getInitial', () => {
    @automate
    class Schema extends FormSchema {
      @watch field1 = 1;
    }

    const schema = Schema.create();
    expect(schema.field1).toEqual(1);
    expect(schema.getInitial('field1')).toEqual(1);
    expect(schema.isChanged).toEqual(false);

    runInAction(() => schema.field1 = 2);
    expect(schema.field1).toEqual(2);
    expect(schema.getInitial('field1')).toEqual(1);
    expect(schema.isChanged).toEqual(true);
  });

  it('watch properties are observable', () => {
    @automate
    class Schema extends FormSchema {
      @watch field1 = 1;
    }

    const fn = jest.fn();

    const schema = Schema.create();
    observe(schema, 'field1', fn);
    expect(fn).toBeCalledTimes(0);

    runInAction(() => schema.field1 = 2);
    expect(fn).toBeCalledTimes(1);

    runInAction(() => schema.field1 = 1);
    expect(fn).toBeCalledTimes(2);
  });

  it('watch properties can be overridden by any observable modifiers', () => {
    @automate
    class Schema extends FormSchema {
      @watch field1: Record<string, number> = {};

      @watch field2: Record<string, number> = {};

      constructor() {
        super();
        makeObservable(this, {
          field1: observable.ref,
          field2: observable.deep,
        });
      }
    }

    const fn1 = jest.fn();
    const fn2 = jest.fn();

    const schema = Schema.create();

    const tryToObserveField1 = () => {
      observe(schema.field1, fn1);
    };

    observe(schema, 'field1', fn1);
    observe(schema.field2, fn2);
    observe(schema, 'field2', fn2);
    expect(fn1).toBeCalledTimes(0);
    expect(fn2).toBeCalledTimes(0);
    expect(tryToObserveField1).toThrow();

    runInAction(() => {
      schema.field1.a = 1;
      schema.field2.a = 1;
    });
    expect(fn1).toBeCalledTimes(0);
    expect(fn2).toBeCalledTimes(1);


    runInAction(() => {
      schema.field1 = {};
      schema.field2 = {};
    });
    expect(fn1).toBeCalledTimes(1);
    expect(fn2).toBeCalledTimes(2);
  });

  it('watch computed getters', () => {
    @automate
    class Schema extends FormSchema {
      field1 = 1;

      @watch get get1() {
        return this.field1;
      }

      constructor() {
        super();
        makeObservable(this, {
          field1: observable,
          get1: computed,
        });
      }
    }

    const fn = jest.fn();
    const schema = Schema.create();
    reaction(() => schema.get1, fn);
    expect(fn).toBeCalledTimes(0);
    expect(schema.isChanged).toEqual(false);

    runInAction(() => schema.field1++);
    expect(fn).toBeCalledTimes(1);
    expect(schema.isChanged).toEqual(true);
    expect(schema.getInitial('get1')).toEqual(1);
  });

  it('Manual check for changes', () => {
    class Schema extends FormSchema {
      @watch field1 = 1;

      @watch field2 = 2;
    }

    const schema = Schema.create();
    expect(schema.isChanged).toEqual(false);

    runInAction(() => schema.field1++);
    expect(schema.isChanged).toEqual(false);

    schema.checkChangesOf('field1');
    expect(schema.isChanged).toEqual(true);

    runInAction(() => schema.field1--);
    schema.checkAnyChanges();
    expect(schema.isChanged).toEqual(false);

    runInAction(() => schema.field2++);
    schema.checkChangesOf('field2');
    expect(schema.isChanged).toEqual(true);
  });

  describe('methods', () => {
    it('sync', () => {
      @automate
      class Schema extends FormSchema {
        @watch field = 1;
      }

      const schema = Schema.create();
      expect(schema.getInitial('field')).toEqual(1);
      expect(schema.isChanged).toEqual(false);

      runInAction(() => schema.field++);
      expect(schema.getInitial('field')).toEqual(1);
      expect(schema.isChanged).toEqual(true);

      schema.sync();
      expect(schema.getInitial('field')).toEqual(2);
      expect(schema.isChanged).toEqual(false);
    });

    it('reset', () => {
      @automate
      class Schema extends FormSchema {
        @watch field = 1;
      }

      const schema = Schema.create();
      expect(schema.isChanged).toEqual(false);

      runInAction(() => schema.field++);
      expect(schema.isChanged).toEqual(true);

      schema.reset();
      expect(schema.field).toEqual(1);
      expect(schema.isChanged).toEqual(false);
    });

    it('Manual methods', () => {
      class Schema extends FormSchema {
        @watch field = 1;
      }

      const schema = Schema.create();
      expect(schema.isChanged).toEqual(false);

      schema.field++;
      expect(schema.isChanged).toEqual(false);

      schema.checkChangesOf('field');
      expect(schema.isChanged).toEqual(true);

      schema.reset();
      expect(schema.field).toEqual(1);
      expect(schema.isChanged).toEqual(false);

      schema.field++;
      expect(schema.isChanged).toEqual(false);

      schema.checkChangesOf('field');
      expect(schema.isChanged).toEqual(true);

      schema.sync();
      expect(schema.field).toEqual(2);
      expect(schema.isChanged).toEqual(false);
    });
  });

  it('Custom decorators', () => {
    const custom = watch.configure(
      (newValue: unknown[], oldValue: unknown[], schema: any) => {
        schema[__ExecSymbol](() => {});
        return newValue[1] === oldValue[1];
      },
      (newValue, schema: any) => {
        schema[__ExecSymbol](() => {});
        return newValue.slice();
      },
      (newValue) => newValue.slice(),
    );

    @automate
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

  it('With MobX experimental decorators', () => {
    @automate
    class Schema extends FormSchema {
      @watch field1 = 1;

      constructor() {
        super();
        makeObservable(this);
      }
    }

    observable(Schema.prototype, 'field1');

    const schema = Schema.create();
    expect(schema.field1).toEqual(1);
    expect(schema.getInitial('field1')).toEqual(1);
    expect(schema.isChanged).toEqual(false);

    runInAction(() => schema.field1 = 2);
    expect(schema.field1).toEqual(2);
    expect(schema.getInitial('field1')).toEqual(1);
    expect(schema.isChanged).toEqual(true);
  });
});