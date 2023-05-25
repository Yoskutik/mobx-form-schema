import 'reflect-metadata';
import { FormSchema, watch } from '@yoskutik/mobx-react-mvvm';
import { observable, runInAction } from 'mobx';

describe('watch.array decorator', () => {
  class Schema extends FormSchema {
    @watch.array @observable.shallow arr = [12];
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
});
