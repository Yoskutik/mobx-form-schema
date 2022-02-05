import { action, makeObservable, observable } from 'mobx';
import { singleton } from 'tsyringe';

export type TToast = {
  id: string;
  text: string;
};

@singleton()
export class ToastsService {
  @observable.shallow data: TToast[] = [];

  constructor() {
    makeObservable(this);
  }

  @action make = (text: string): void => {
    this.data.push({ id: Math.random().toString(), text });
  };
}
