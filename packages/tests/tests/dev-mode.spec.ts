import { FormSchema, watch } from '@yoskutik/mobx-form-schema';
import { runInAction } from 'mobx';

console.warn = jest.fn();

describe('Development mode', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('Using @watch.set and passing array into create function', () => {
    if (!__DEV__) return;

    class Schema extends FormSchema {
      @watch.set set = new Set();
    }

    Schema.create({ set: [] });

    expect(console.warn).toBeCalledTimes(2);
  });

  it('Using @watch.set and comparing with not set', () => {
    if (!__DEV__) return;

    class Schema extends FormSchema {
      @watch.set set = new Set();
    }

    const schema = Schema.create();

    runInAction(() => (schema as any).set = {});
    expect(console.warn).toBeCalledTimes(1);
  });

  it('Using @watch.array and comparing with not array', () => {
    if (!__DEV__) return;

    class Schema extends FormSchema {
      @watch.array array = [];
    }

    const schema = Schema.create();

    runInAction(() => (schema as any).array = {});
    expect(console.warn).toBeCalledTimes(1);
  });

  it('Using @watch.schema and comparing with not FormSchema', () => {
    if (!__DEV__) return;

    class InnerSchema extends FormSchema {
      @watch prop = 1;
    }

    class Schema extends FormSchema {
      @watch.schema schema = InnerSchema.create();
    }

    const schema = Schema.create();

    runInAction(() => (schema as any).schema = {});
    expect(console.warn).toBeCalledTimes(1);
  });

  describe('Using @watch.schemasArray and comparing with not array of FormSchemas', () => {
    if (!__DEV__) return;

    class InnerSchema extends FormSchema {
      @watch prop = 1;
    }

    class Schema extends FormSchema {
      @watch.schemasArray schemas = [InnerSchema.create()];
    }

    it('Passing not array', () => {
      const schema = Schema.create();

      runInAction(() => (schema as any).schemas = {});
      expect(console.warn).toBeCalledTimes(1);
    });

    it('Passing not an instance of FormSchema as one the items', () => {
      const schema = Schema.create();

      runInAction(() => (schema as any).schemas[0] = {});
      expect(console.warn).toBeCalledTimes(1);
    });
  });
});
