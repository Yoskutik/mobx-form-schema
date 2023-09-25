import { FormSchema, watch } from '@yoskutik/mobx-form-schema';

export class ExperienceSchema extends FormSchema {
  id = Math.random();

  @watch position = '';

  @watch company = '';
}
