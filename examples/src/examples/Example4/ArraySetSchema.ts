import { FormSchema, watch } from '@yoskutik/mobx-form-schema';

export class ArraySetSchema extends FormSchema {
  @watch.set skillsSet = new Set<string>();

  @watch.array skillsArray: string[] = [];
}