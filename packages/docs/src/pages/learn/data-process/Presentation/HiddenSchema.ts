import { FormSchema, present } from '@yoskutik/mobx-form-schema';
import { makeObservable, observable } from 'mobx';

export class HiddenSchema extends FormSchema {
  @present.hidden
  username = '';

  name = '';

  constructor() {
    super();
    makeObservable(this, {
      username: observable.ref,
      name: observable.ref,
    });
  }
}
