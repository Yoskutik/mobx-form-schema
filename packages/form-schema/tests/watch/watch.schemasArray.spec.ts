import { FormSchema, watch } from '@yoskutik/mobx-form-schema';
import { runInAction } from 'mobx';

describe('watch.schemasArray decorator', () => {
  class Schema1 extends FormSchema {
    @watch field1 = 1;
  }

  class Schema2 extends FormSchema {
    @watch.schemasArray schemas = [Schema1.create()];
  }

  const schema2 = Schema2.create();

  afterEach(() => {
    expect(schema2.schemas.every(it => it instanceof Schema1)).toEqual(true);
  });

  it('Should be changed if a single schema is changed', () => {
    runInAction(() => schema2.schemas[0].field1++);
    expect(schema2.isChanged).toEqual(true);
  });

  it('Should be not changed if a single schema became the same', () => {
    runInAction(() => schema2.schemas[0].field1--);
    expect(schema2.isChanged).toEqual(false);
  });

  it('Should be changed if a new schema is added', () => {
    runInAction(() => schema2.schemas.push(Schema1.create()));
    expect(schema2.isChanged).toEqual(true);
  });

  it('Should be not changed if schema is deleted', () => {
    runInAction(() => schema2.schemas.pop());
    expect(schema2.isChanged).toEqual(false);
  });

  it('Should be not changed with a new schema array with the same contest', () => {
    runInAction(() => schema2.schemas = [Schema1.create()]);
    expect(schema2.isChanged).toEqual(false);
  });

  it('Should be not changed after resetting changed state', () => {
    runInAction(() => schema2.schemas[0].field1++);
    schema2.reset();
    expect(schema2.isChanged).toEqual(false);
    expect(schema2.schemas[0].field1).toEqual(1);
  });

  it('Should be not changed after syncing changed state', () => {
    runInAction(() => schema2.schemas[0].field1++);
    schema2.sync();
    expect(schema2.isChanged).toEqual(false);
  });

  it('Saving and restoring nullish values', () => {
    runInAction(() => schema2.schemas = undefined);
    schema2.sync();
    expect(schema2.isChanged).toEqual(false);

    runInAction(() => schema2.schemas = [Schema1.create()]);
    schema2.reset();
    expect(schema2.isChanged).toEqual(false);

    runInAction(() => schema2.schemas = [Schema1.create()]);
  });
});
