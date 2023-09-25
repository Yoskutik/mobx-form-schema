import { FormSchema, watch } from '@yoskutik/mobx-form-schema';

export class ObservationSchema extends FormSchema {
  @watch basicString = '';

  @watch.array array: string[] = [];

  @watch.set set = new Set<string>();
}