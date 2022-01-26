import { makeObservable, observable } from 'mobx';

export abstract class ViewModel<T extends ViewModel = any, R = Record<string, any>> {
    /** A parent View's ViewModel instance */
    @observable.ref readonly parent: T = undefined;

    /** Properties that were given to a View */
    @observable.ref protected readonly viewProps: R = undefined;

    /** A flag that tell whether the View is in the virtual DOM */
    @observable readonly isActive = false;

    constructor() {
        makeObservable(this);
    }

    /** A function that is called after the View has become unmounted */
    protected onDispose: () => void | Promise<void>;
}
