import { factory, FormSchema } from '@yoskutik/mobx-form-schema';
import { observable } from 'mobx';

export class TransformSchema extends FormSchema {
  @factory(datetime => new Date(datetime))
  @observable datetime = new Date();
}