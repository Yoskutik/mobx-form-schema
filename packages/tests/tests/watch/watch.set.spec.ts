import { FormSchema, watch } from '@yoskutik/mobx-form-schema';
import { runInAction } from 'mobx';

describe('watch.set decorator', () => {
  class Schema extends FormSchema {
    @watch.set set = new Set([12]);
  }

  const schema = Schema.create();

  it('Should be changed if set\'s contest is changed', () => {
    runInAction(() => schema.set.add(123));
    expect(schema.isChanged).toEqual(true);
  });

  it('Should be not changed if set\'s contest became the same', () => {
    runInAction(() => schema.set.delete(123));
    expect(schema.isChanged).toEqual(false);
  });

  it('Should be not changed with a new set with the same contest', () => {
    runInAction(() => schema.set = new Set([12]));
    expect(schema.isChanged).toEqual(false);
  });

  it('Should be not changed after resetting changed state', () => {
    runInAction(() => schema.set.add(123));
    schema.reset();
    expect(schema.isChanged).toEqual(false);
  });

  it('Should be not changed after syncing changed state', () => {
    runInAction(() => schema.set.add(123));
    schema.sync();
    expect(schema.isChanged).toEqual(false);
  });

  it('By default applies observable.shallow', () => {
    const obj = { a: 1 };

    class SchemaSet extends FormSchema {
      @watch.set arr = new Set([obj]);
    }

    const schemaSet = SchemaSet.create();

    runInAction(() => obj.a++);
    expect(schemaSet.isChanged).toEqual(false);
  });

  it('Manual observation', () => {
    class SchemaManual extends FormSchema {
      @watch.set set = new Set([12]);
    }

    const schemaManual = SchemaManual.create({}, true);

    runInAction(() => schemaManual.set.delete(12));
    expect(schemaManual.isChanged).toEqual(false);

    schemaManual.updateIsPropertyChanged('set');
    expect(schemaManual.isChanged).toEqual(true);

    schemaManual.set.add(12);
    expect(schemaManual.isChanged).toEqual(true);

    schemaManual.updateIsChangedAny();
    expect(schemaManual.isChanged).toEqual(false);
  });
});
