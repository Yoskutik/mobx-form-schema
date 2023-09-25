import { FormSchema, watch } from '@yoskutik/mobx-form-schema';
import { makeObservable, observable } from 'mobx';

type TData = [number, string];

const compareData = (newValue: TData, oldValue: TData) => newValue[0] === oldValue[0];
const saveDataToInitialState = (data: TData) => [...data];
const getDataFromInitialState = (data: TData) => [...data];

const customDecorator = watch.configure(
  compareData,
  saveDataToInitialState,
  getDataFromInitialState,
);

export class CustomSchema extends FormSchema {
  @customDecorator data: TData = [0, 'string'];

  constructor() {
    super();
    makeObservable(this, {
      data: observable.shallow,
    });
  }
}
