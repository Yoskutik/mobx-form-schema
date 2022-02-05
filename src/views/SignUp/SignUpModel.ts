import { Model, validate } from '@yoskutik/mobx-react-mvvm';
import { makeObservable, observable } from 'mobx';
import { email, maxLength, minLength, password, required } from '@utils';

export class SignUpModel extends Model {
  @validate(required(), email(), maxLength(64))
  @observable login = '';

  @validate(required(), password(), minLength(8))
  @observable password = '';

  constructor() {
    super();
    makeObservable(this);
  }
}
