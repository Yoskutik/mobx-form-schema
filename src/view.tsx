import React, {
  Component, createContext, memo, ReactNode, useContext, useEffect, useState, VFC,
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

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-constraint
const useValue = <T extends unknown>(state: () => T) => useState(state)[0];

const useViewModel = <T extends ViewModel>(VM: Constructable<ViewModel>, props: Record<string, any>): T => {
  const viewModel = useValue(() => container.resolve(VM)) as any;
  const parent = useContext(ViewModelContext);

  useEffect(() => runInAction(() => {
    viewModel.isActive = true;
    viewModel.parent = parent;
    viewModel.viewProps = props;
  }));

  return viewModel;
};

export const view = <T extends Record<string, any>, R extends ViewModel>(VM: Constructable<R>) => (
  (ViewComponent: VFC<T & { viewModel: R }>, makeObserver = true): VFC<T> => memo(props => {
    const ObservableComponent = useValue(() => (makeObserver ? observer(ViewComponent) : ViewComponent));
    const viewModel = useViewModel<R>(VM, props) as any;

    useEffect(() => {
      viewModel.onViewMount?.();
      return () => {
        viewModel.isActive = false;
        viewModel.onViewUnmount?.();
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
    const ObservableComponent = useValue(() => (makeObserver ? observer(ChildViewComponent) : ChildViewComponent)) as any;
    const viewModel = useContext(ViewModelContext);

    return (
      <ErrorBoundary>
        <ViewModelContext.Provider value={viewModel}>
          <ObservableComponent viewModel={viewModel} {...props} />
        </ViewModelContext.Provider>
      </ErrorBoundary>
    );
  }) as unknown as VFC<R>;
