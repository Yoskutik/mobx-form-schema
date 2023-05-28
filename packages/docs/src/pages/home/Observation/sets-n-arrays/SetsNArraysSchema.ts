import { FormSchema, watch } from '@yoskutik/mobx-form-schema';
import { observable } from 'mobx';

export class SetsNArraysSchema extends FormSchema {
  @observable.shallow
  @watch.set skillSet = new Set<string>();

  @observable.shallow
  @watch.array skillArray: string[] = [];
}