import { factory, FormSchema } from '@yoskutik/mobx-form-schema';
import { observable } from 'mobx';

export class TransformSchema extends FormSchema {
  @factory(data => new Date(data.datetime))
  @observable datetime = new Date();
}