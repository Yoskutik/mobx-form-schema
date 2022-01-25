import { makeObservable, observable } from 'mobx';

export abstract class ViewModel<T extends ViewModel = any, R = Record<string, any>> {
    protected readonly parent: T;

    /** Properties that were given to a View */
    @observable.ref protected readonly viewProps: Partial<R> = {};

    @observable readonly isActive = false;

    constructor() {
        makeObservable(this);
    }

    protected onDispose: () => void | Promise<void>;
}
