import { factory, FormSchema } from '@yoskutik/mobx-form-schema';

const createSet = (data: number[]) => new Set(data);
const createDate = (data: string) => new Date(data);

export class FactoryBasicSchema extends FormSchema {
  @factory(createSet)
  set: Set<number> | undefined = undefined;

  @factory(createDate)
  date: Date | undefined = undefined;
}
