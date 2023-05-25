import { FormSchema, watch } from '@yoskutik/mobx-form-schema';

export class ResetExampleFormSchema extends FormSchema {
  @watch email = '';

  @watch telegram = '';

  @watch instagram = '';
}