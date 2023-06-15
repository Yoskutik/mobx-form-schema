import 'reflect-metadata';
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
    class Schema extends FormSchema {
      @watch.set arr = new Set([obj]);
    }

    const schema = Schema.create();

    runInAction(() => obj.a++);
    expect(schema.isChanged).toEqual(false);
  });
});
