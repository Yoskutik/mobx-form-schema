import { makeObservable, observable } from 'mobx';

export abstract class ViewModel<T extends ViewModel | unknown = unknown, R extends Record<string, any> = unknown> {
  /** Properties that were given to a View */
  @observable.ref protected readonly viewProps: R = undefined;

  /** A parent View's ViewModel instance */
  @observable.ref readonly parent: T = undefined;

  /** A flag that tell whether the View is in the virtual DOM */
  @observable readonly isActive = false;

  constructor() {
    makeObservable(this);
  }

  /** A function that is called after the View has become mounted */
  protected onViewMount: () => void | Promise<void>;

  /** A function that is called after the View has become unmounted */
  protected onViewUnmount: () => void | Promise<void>;
}
