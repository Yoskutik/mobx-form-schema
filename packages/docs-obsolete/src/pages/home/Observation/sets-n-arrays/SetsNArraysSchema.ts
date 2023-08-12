import { FormSchema, watch } from '@yoskutik/mobx-form-schema';
import { observable } from 'mobx';

export class SetsNArraysSchema extends FormSchema {
  @watch.set skillSet = new Set<string>();

  @watch.array skillArray: string[] = [];
}