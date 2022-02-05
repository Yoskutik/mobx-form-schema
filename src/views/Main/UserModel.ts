import { makeObservable, observable } from 'mobx';
import { field, Model, validate } from '@yoskutik/mobx-react-mvvm';
import { email, generateId, maxLength, required } from '@utils';

export class UserModel extends Model {
  @field({ factory: () => generateId('User'), watch: false })
  readonly id: string = undefined;

  @field({ label: 'Your name' }) @observable name = '';

  @validate(required())
  @field({ label: 'Your surname' }) @observable surname = '';

  @validate(required())
  @field({ label: 'Your username' }) @observable username = '';

  @validate(required(), email(), maxLength(64))
  @field({ label: 'Your email address' }) @observable email = '';

  @validate(required(), maxLength(255))
  @field({ label: 'Your address' }) @observable address = '';

  @field({ deepCheck: true, label: 'Your interests' })
  @observable.shallow interests: string[] = [];

  constructor() {
    super();
    makeObservable(this);
  }
}
