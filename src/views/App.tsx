import React from 'react';
import { makeObservable, observable, action } from 'mobx';
import { injectable } from 'tsyringe';
import { view, ViewModel } from '@yoskutik/mobx-react-mvvm';
import { HBox, VBox } from '@components';
import { LeftPanel } from './LeftPanel';
import { RightPanel } from './RightPanel';
import '../Style.scss';

export type TTodoItem = {
  id: string;
  title: string;
  done: boolean;
};

@injectable()
export class AppViewModel extends ViewModel {
  @observable.ref chosenTodo: TTodoItem = null;

  @observable todos: TTodoItem[] = [];

  constructor() {
    super();
    makeObservable(this);
  }

  @action addNewTodo = (title: string) => {
    this.todos.push({ id: Math.random().toString(), title, done: false });
  };
}

export const App = view(AppViewModel)(({ viewModel }) => (
  <VBox>
    <h2>Todo List</h2>
    <p style={{ marginTop: 0 }}>
      This sandbox was made to demonstrate the capabilities of the MobX + DI +
      MVVM architecture. Here you can find an examples of using View, ChildView
      and ViewModel entities.
    </p>
    <p style={{ marginTop: 0 }}>
      In this sandbox you can add new Todo&apos;s, filter them, chose one of them and
      delete or make as done the chosen one.
    </p>
    <hr style={{ width: '100%' }}/>
    <HBox style={{ marginTop: 10 }}>
      <LeftPanel/>
      <RightPanel onAdd={viewModel.addNewTodo}/>
    </HBox>
  </VBox>
));
