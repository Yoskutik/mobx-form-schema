import React, {
    Component, createContext, memo, ReactNode, useContext, useEffect, useMemo, VFC,
} from 'react';
import { observer } from 'mobx-react';
import { container } from 'tsyringe';
import { runInAction } from 'mobx';
import { ViewModel } from './ViewModel';
import { Constructable } from './types';

class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
    static getDerivedStateFromError = () => ({ hasError: true });
    state = { hasError: false };
    render = () => !this.state.hasError && this.props.children;
}

const ViewModelContext = createContext<ViewModel>(null);

const useViewModel = <T extends ViewModel>(VM: Constructable<ViewModel>, props: Record<string, any>): T => runInAction(() => {
    const viewModel = useMemo(() => container.resolve(VM), []);
    const untypedViewModel = viewModel as any;
    untypedViewModel.isActive = true;
    untypedViewModel.parent = useContext(ViewModelContext);
    untypedViewModel.viewProps = { ...props };
    return untypedViewModel;
});

export const view = <T extends Record<string, any>, R extends ViewModel>(VM: Constructable<R>) => (
    (Component: VFC<T & { viewModel: R }>): VFC<T> => memo(props => {
        const ObservableComponent = useMemo(() => observer(Component) as any, []);
        const viewModel = useViewModel<R>(VM, props);

        useEffect(() => () => {
            const untypedViewModel = viewModel as any;
            untypedViewModel.isActive = false;
            untypedViewModel.onViewUnmount?.();
        }, []);

        return (
            <ErrorBoundary>
                <ViewModelContext.Provider value={viewModel}>
                    <ObservableComponent viewModel={viewModel} {...props} />
                </ViewModelContext.Provider>
            </ErrorBoundary>
        );
    })
);

export const childView = <T extends ViewModel, R extends Record<string, any> = {}>(Component: VFC<R & { viewModel: T }>, makeObservable = true): VFC<R> => memo(props => {
    const ObservableComponent = useMemo(() => makeObservable ? observer(Component) as any : Component, []);
    const viewModel = useContext(ViewModelContext);

    return (
        <ErrorBoundary>
            <ViewModelContext.Provider value={viewModel}>
                <ObservableComponent viewModel={viewModel} {...props} />
            </ViewModelContext.Provider>
        </ErrorBoundary>
    );
}) as unknown as VFC<R>;
