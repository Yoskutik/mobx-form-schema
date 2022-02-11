import 'reflect-metadata';
import React, { VFC } from 'react';
import { view, ViewModel } from '@yoskutik/mobx-react-mvvm';
import { container, singleton } from 'tsyringe';
import { cleanup, render } from '@testing-library/react';
import { reaction, configure } from 'mobx';

configure({ enforceActions: 'never' });

describe('ViewModel checking', () => {
  test('Testing parent view model initialization', () => {
    @singleton()
    class ParentViewModel extends ViewModel {}

    @singleton()
    class ChildViewModel extends ViewModel<ParentViewModel> {}

    const ChildView = view(ChildViewModel)(() => <div/>);

    const ParentView = view(ParentViewModel)(() => (
      <ChildView/>
    ));

    render(<ParentView/>);

    const parentViewModel: any = container.resolve(ParentViewModel);
    const childViewModel: any = container.resolve(ChildViewModel);
    expect(parentViewModel.parent).toBeFalsy();
    expect(childViewModel.parent).toEqual(parentViewModel);
  });

  test('Testing view props injection', () => {
    @singleton()
    class SomeViewModel extends ViewModel {}

    const SomeView: VFC<{ a: any, b: any }> = view(SomeViewModel)(() => <div/>);

    const a = Math.random();
    const b = Math.random();
    render(<SomeView a={a} b={b}/>);

    const viewModel: any = container.resolve(SomeViewModel);

    expect(Object.keys(viewModel.viewProps)).toHaveLength(2);
    expect(viewModel.viewProps.a).toEqual(a);
    expect(viewModel.viewProps.b).toEqual(b);
  });

  test('Testing activeness', () => {
    @singleton()
    class SomeViewModel extends ViewModel {
      onViewUnmount = jest.fn();
    }

    const SomeView = view(SomeViewModel)(() => <div/>);
    const viewModel: any = container.resolve(SomeViewModel);

    expect(viewModel.isActive).toBeFalsy();

    render(<SomeView />);

    expect(viewModel.isActive).toEqual(true);
    expect(viewModel.onViewUnmount).toHaveBeenCalledTimes(0);

    cleanup();

    expect(viewModel.isActive).toEqual(false);
    expect(viewModel.onViewUnmount).toBeCalledTimes(1);
  });

  test('Testing observable fields', () => {
    @singleton()
    class SomeViewModel extends ViewModel {
      onActiveChange = jest.fn();

      onViewPropsChange = jest.fn();

      constructor() {
        super();
        reaction(() => this.isActive, this.onActiveChange);
        reaction(() => this.viewProps, this.onViewPropsChange);
      }
    }

    const SomeView: VFC<{ a: number }> = view(SomeViewModel)(() => <div/>);
    const viewModel: any = container.resolve(SomeViewModel);

    const { rerender } = render(<SomeView a={Math.random()}/>);

    expect(viewModel.onActiveChange).toBeCalledTimes(1);
    expect(viewModel.onViewPropsChange).toBeCalledTimes(1);

    rerender(<SomeView a={Math.random()}/>);
    expect(viewModel.onActiveChange).toBeCalledTimes(1);
    expect(viewModel.onViewPropsChange).toBeCalledTimes(2);

    cleanup();
    expect(viewModel.onActiveChange).toBeCalledTimes(2);
    expect(viewModel.onViewPropsChange).toBeCalledTimes(2);
  });
});
