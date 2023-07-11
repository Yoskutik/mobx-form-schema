import { FormSchema, watch } from '@yoskutik/form-schema';
import { observable, runInAction, toJS } from 'mobx';
import { automate } from '@yoskutik/form-schema/mobx-automate';

describe('watch.array decorator', () => {
  @automate
  class Schema extends FormSchema {
    @watch.array arr = [12];
  }

  const schema = Schema.create();

  it('Should be changed if array\'s contest is changed', () => {
    runInAction(() => schema.arr.push(123));
    expect(schema.isChanged).toEqual(true);
  });

  it('Should be not changed if array\'s contest became the same', () => {
    runInAction(() => schema.arr.pop());
    expect(schema.isChanged).toEqual(false);
  });

  it('Should be not changed with a new array with the same contest', () => {
    runInAction(() => schema.arr = [12]);
    expect(schema.isChanged).toEqual(false);
  });

  it('Should be not changed after resetting changed state', () => {
    runInAction(() => schema.arr.push(123));
    schema.reset();
    expect(schema.arr).toEqual([12]);
    expect(schema.isChanged).toEqual(false);
  });

  it('Should be not changed after syncing changed state', () => {
    runInAction(() => schema.arr.push(123));
    schema.sync();
    expect(schema.isChanged).toEqual(false);
  });

  it('By default applies observable.shallow', () => {
    @automate
    class Schema extends FormSchema {
      @watch.array arr = [{ a: 1 }];
    }

    const schema = Schema.create();

    runInAction(() => schema.arr[0].a++);
    expect(schema.isChanged).toEqual(false);

    runInAction(() => schema.arr[0] = { a: 1 });
    expect(schema.isChanged).toEqual(true);
  });

  it('Manual observation', () => {
    class Schema extends FormSchema {
      @watch.array arr = [12];
    }

    const schema = Schema.create();

    runInAction(() => schema.arr.pop());
    expect(schema.isChanged).toEqual(false);

    schema.checkChangesOf('arr');
    expect(schema.isChanged).toEqual(true);

    schema.arr.push(12);
    expect(schema.isChanged).toEqual(true);

    schema.checkAnyChanges();
    expect(schema.isChanged).toEqual(false);
  });
});
