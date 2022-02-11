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
  (ViewComponent: VFC<T & { viewModel: R }>, makeObserver = true): VFC<T> => memo(props => {
    const ObservableComponent = useMemo(() => makeObserver ? observer(ViewComponent) : ViewComponent as any, []);
    const viewModel = useViewModel<R>(VM, props);

    useEffect(() => {
      const untypedViewModel = viewModel as any;
      untypedViewModel.onViewMount?.();
      return () => {
        untypedViewModel.isActive = false;
        untypedViewModel.onViewUnmount?.();
      };
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

export const childView = <T extends ViewModel, R extends Record<string, any> = unknown>(
  ChildViewComponent: VFC<R & { viewModel: T }>, makeObserver = true,
): VFC<R> => memo(props => {
    const ObservableComponent = useMemo(() => makeObserver ? observer(ChildViewComponent) as any : ChildViewComponent, []);
    const viewModel = useContext(ViewModelContext);

    return (
      <ErrorBoundary>
        <ViewModelContext.Provider value={viewModel}>
          <ObservableComponent viewModel={viewModel} {...props} />
        </ViewModelContext.Provider>
      </ErrorBoundary>
    );
  }) as unknown as VFC<R>;
