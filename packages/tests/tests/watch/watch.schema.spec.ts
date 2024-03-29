import { FormSchema, watch } from '@yoskutik/mobx-form-schema';
import { runInAction } from 'mobx';

describe('watch.schema decorator', () => {
  class Schema1 extends FormSchema {
    @watch field1 = 1;
  }

  class Schema2 extends FormSchema {
    @watch.schema schema1 = Schema1.create();
  }

  const schema2 = Schema2.create();

  afterEach(() => {
    expect(!schema2.schema1 || schema2.schema1 instanceof Schema1).toBeTruthy();
  });

  it('Should be changed if schema\'s contest is changed', () => {
    runInAction(() => schema2.schema1.field1++);
    expect(schema2.isChanged).toEqual(true);
  });

  it('Should be not changed if schema\'s contest became the same', () => {
    runInAction(() => schema2.schema1.field1--);
    expect(schema2.isChanged).toEqual(false);
  });

  it('Should be not changed with a new schema with the same contest', () => {
    runInAction(() => schema2.schema1 = Schema1.create());
    expect(schema2.isChanged).toEqual(false);
  });

  it('Should be not changed with if became undefined', () => {
    runInAction(() => schema2.schema1 = undefined);
    expect(schema2.isChanged).toEqual(true);
  });

  it('Should be not changed with if became defined', () => {
    runInAction(() => schema2.schema1 = Schema1.create());
    expect(schema2.isChanged).toEqual(false);
  });

  it('Should be not changed after resetting changed state', () => {
    runInAction(() => schema2.schema1.field1++);
    schema2.reset();
    expect(schema2.isChanged).toEqual(false);
    expect(schema2.schema1.isChanged).toEqual(false);
    expect(schema2.schema1.field1).toEqual(1);
  });

  it('Should be not changed after syncing changed state', () => {
    runInAction(() => schema2.schema1.field1++);
    schema2.sync();
    expect(schema2.isChanged).toEqual(false);
  });

  describe('second level nested schemas', () => {
    class Schema3 extends FormSchema {
      @watch.schema schema2 = Schema2.create();
    }

    const schema3 = Schema3.create();

    it('Should be changed if schema\'s contest is changed', () => {
      runInAction(() => schema3.schema2.schema1 = Schema1.create({ field1: 5 }));
      expect(schema3.isChanged).toEqual(true);
    });

    it('Should be changed if schema\'s contest is the same', () => {
      runInAction(() => schema3.schema2.schema1 = Schema1.create());
      expect(schema3.isChanged).toEqual(false);
    });

    it('Should be changed if schema\'s contest is changed2', () => {
      runInAction(() => schema3.schema2 = Schema2.create({ schema1: Schema1.create({ field1: 5 }) }));
      expect(schema3.isChanged).toEqual(true);
    });

    it('Should be changed if schema\'s contest is the same2', () => {
      runInAction(() => schema3.schema2 = Schema2.create());
      expect(schema3.isChanged).toEqual(false);
    });
  });

  it('Manual observation', () => {
    class Schema extends FormSchema {
      @watch.schema schema = Schema1.create({}, true);
    }

    const schema = Schema.create();

    runInAction(() => schema.schema.field1--);
    expect(schema.isChanged).toEqual(false);

    schema.schema.updateIsPropertyChanged('field1');
    expect(schema.isChanged).toEqual(true);

    runInAction(() => schema.schema.field1++);
    expect(schema.isChanged).toEqual(true);

    schema.schema.updateIsChangedAny();
    expect(schema.isChanged).toEqual(false);
  });
});
