import { observable } from 'mobx';
import { FormSchema, validate, watch } from '@yoskutik/mobx-form-schema';
import { email, required } from '../../LearnStartPage/validators';

export class SameSchema2 extends FormSchema {
  @validate(required(), email())
  @observable email = '';
}
