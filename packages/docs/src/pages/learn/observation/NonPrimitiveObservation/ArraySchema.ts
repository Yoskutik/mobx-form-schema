import { FormSchema, watch } from '@yoskutik/mobx-form-schema';

export class ArraySchema extends FormSchema {
  @watch.array skillsArray = ['HTML', 'CSS', 'JavaScript'];

  @watch.set skillsSet = new Set(['HTML', 'CSS', 'JavaScript']);
}
