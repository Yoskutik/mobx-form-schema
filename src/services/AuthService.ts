import { singleton } from 'tsyringe';
import { makeObservable, observable } from 'mobx';

@singleton()
export class AuthService {
  @observable isAuthed = false;

  constructor() {
    makeObservable(this);
  }
}
