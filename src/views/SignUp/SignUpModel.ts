import { makeObservable, observable } from 'mobx';
import { field, Model, validate } from '@yoskutik/mobx-react-mvvm';
import { email, maxLength, minLength, password, required } from '@utils';

export class SignUpModel extends Model {
  @validate(required(), email(), maxLength(64))
  @field({ label: 'Login' }) @observable login = '';

  @validate(required(), password(), minLength(8))
  @field({ label: 'Password' }) @observable password = '';

  constructor() {
    super();
    makeObservable(this);
  }
}
