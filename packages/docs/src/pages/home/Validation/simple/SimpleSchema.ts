import { FormSchema, validate } from '@yoskutik/mobx-form-schema';
import { observable } from 'mobx';
import { required, email } from '../validators';

export class SimpleSchema extends FormSchema {
  @validate(required())
  @observable name = '';

  @validate(required(), email())
  @observable email = '';
}