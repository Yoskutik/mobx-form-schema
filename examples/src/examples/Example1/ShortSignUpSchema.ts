import { FormSchema, validate, watch } from '@yoskutik/mobx-form-schema';
import { required } from '@utils';

export class ShortSignUpSchema extends FormSchema {
  @validate(required())
  @watch name = '';

  @validate(required())
  @watch surname = '';
}