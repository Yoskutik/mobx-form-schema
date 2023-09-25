import { FormSchema, validate, watch } from '@yoskutik/mobx-form-schema';
import { email, required } from '../../LearnStartPage/validators';

export class SameSchema1 extends FormSchema {
  @validate(required(), email())
  @watch email = '';
}
