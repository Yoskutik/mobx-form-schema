import { FormSchema, watch } from '@yoskutik/mobx-form-schema';
import { makeObservable, observable, runInAction } from 'mobx';

type TData = [number, string];

const compareData = (newValue: TData, oldValue: TData) => newValue[0] === oldValue[0];
const saveDataToInitialState = (data: TData) => [...data];
const getDataFromInitialState = (data: TData) => [...data];

const customDecorator = watch.create(
  compareData,
  saveDataToInitialState,
  getDataFromInitialState,
);

export class ConfigureSchema extends FormSchema {
  @customDecorator data: TData = [0, 'string'];

  constructor() {
    super();
    makeObservable(this, {
      data: observable.shallow,
    });
  }
}

const schema = ConfigureSchema.create();
console.log(schema.isChanged); // false

runInAction(() => schema.data[0]++);
console.log(schema.isChanged); // true

runInAction(() => schema.data[0]--);
console.log(schema.isChanged); // false

runInAction(() => schema.data[1] = 'Any other string');
console.log(schema.isChanged); // false

runInAction(() => schema.data = [0, 'Literally any other string']);
console.log(schema.isChanged); // false

runInAction(() => schema.data = [1, 'string']);
console.log(schema.isChanged); // true
