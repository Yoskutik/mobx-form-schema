import { FormSchema, watch } from '@yoskutik/mobx-form-schema';
import { makeObservable, observable } from 'mobx';

export class SameSchema1 extends FormSchema {
  @watch data = {
    prop1: 1,
    prop2: 2,
  };

  constructor() {
    super();
    makeObservable(this, {
      data: observable,
    });
  }
}
