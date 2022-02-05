import { UserModel } from './UserModel';
import { field, validate } from '@yoskutik/mobx-react-mvvm';
import { makeObservable, override } from 'mobx';
import { required } from '@utils';

const coolName = () => (value: string) => value && !value.toLocaleLowerCase().includes('cool')
  && 'This name is not cool';

const hasLength = () => (value: string[]) => !value.length && required()('');

const beCool = () => (value: string[]) => value?.length && !value.includes('Be cool')
  && 'Your credo must be cool';

export class CoolerUserModel extends UserModel {
  @validate(required(), coolName())
  @field({ label: 'Your cool name' })
  @override name = '';

  @validate(required(), hasLength(), beCool())
  @field({ deepCheck: true, label: 'Your life credo' })
  @override interests: string[] = [];

  constructor() {
    super();
    makeObservable(this);
  }
}
