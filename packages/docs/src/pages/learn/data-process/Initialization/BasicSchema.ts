import { FormSchema } from '@yoskutik/mobx-form-schema';

export class BasicSchema extends FormSchema {
  set: Set<number> | undefined = undefined;

  date: Date | undefined = undefined;
}
