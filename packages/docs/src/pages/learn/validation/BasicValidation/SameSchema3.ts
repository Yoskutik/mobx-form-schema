import { makeObservable, observable } from 'mobx';
import { FormSchema, validate } from '@yoskutik/mobx-form-schema';
import { email, required } from '../../LearnStartPage/validators';

export class SameSchema3 extends FormSchema {
  @validate(required(), email())
  email = '';

  constructor() {
    super();
    makeObservable(this, {
      email: observable,
    });
  }
}
