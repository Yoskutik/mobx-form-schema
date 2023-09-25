import { watch, FormSchema } from '@yoskutik/mobx-form-schema';
import { computed, makeObservable, observable, observe, reaction, runInAction, toJS } from 'mobx';

describe('watch decorator', () => {
  it('getInitial method', () => {
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

  it('changedProperties', () => {
    class Schema extends FormSchema {
      @watch field1 = 0;

      @watch field2 = 1;
    }

    const schema = Schema.create();
    expect(toJS(schema.changedProperties)).toEqual(new Set());

    runInAction(() => schema.field1++);
    expect(toJS(schema.changedProperties)).toEqual(new Set(['field1']));

    runInAction(() => schema.field2--);
    expect(toJS(schema.changedProperties)).toEqual(new Set(['field1', 'field2']));

    runInAction(() => schema.field1--);
    expect(toJS(schema.changedProperties)).toEqual(new Set(['field2']));

    schema.reset();
    expect(toJS(schema.changedProperties)).toEqual(new Set([]));
  });

  it('watch properties are observable', () => {
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

    const schema = Schema.create({}, true);
    expect(schema.isChanged).toEqual(false);

    runInAction(() => schema.field1++);
    expect(schema.isChanged).toEqual(false);

    schema.updateIsPropertyChanged('field1');
    expect(schema.isChanged).toEqual(true);

    runInAction(() => schema.field1--);
    schema.updateIsChangedAny();
    expect(schema.isChanged).toEqual(false);

    runInAction(() => schema.field2++);
    schema.updateIsPropertyChanged('field2');
    expect(schema.isChanged).toEqual(true);
  });

  describe('methods', () => {
    it('sync', () => {
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

      const schema = Schema.create({}, true);
      expect(schema.isChanged).toEqual(false);

      schema.field++;
      expect(schema.isChanged).toEqual(false);

      schema.updateIsPropertyChanged('field');
      expect(schema.isChanged).toEqual(true);

      schema.reset();
      expect(schema.field).toEqual(1);
      expect(schema.isChanged).toEqual(false);

      schema.field++;
      expect(schema.isChanged).toEqual(false);

      schema.updateIsPropertyChanged('field');
      expect(schema.isChanged).toEqual(true);

      schema.sync();
      expect(schema.field).toEqual(2);
      expect(schema.isChanged).toEqual(false);
    });
  });

  it('With MobX experimental decorators', () => {
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
