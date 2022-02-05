import { UserModel } from './UserModel';
import { field } from '@yoskutik/mobx-react-mvvm';
import { makeObservable, observable } from 'mobx';

export class AwesomeUserModel extends UserModel {
  @field({ deepCheck: true, label: 'Friends names' })
  @observable.shallow friends: string[] = [];

  @field({ label: 'Job' })
  @observable job: string = undefined;

  constructor() {
    super();
    makeObservable(this);
  }
}
