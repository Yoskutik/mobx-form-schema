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

/**
 * A ViewModel of the App component.
 * This viewModel doesn't have a parent, because App is the root View.
 */
@injectable()
export class AppViewModel extends ViewModel {
  // A list of all todos
  @observable todos: TTodoItem[] = [];

  // An item chosen by user
  @observable.ref chosenTodo: TTodoItem = null;

  constructor() {
    super();
    makeObservable(this);
  }

  // A function to create new item.
  @action addNewTodo = (title: string) => {
    this.todos.push({ id: Math.random().toString(), title, done: false });
  };
}

/**
 * The root View.
 */
export const App = view(AppViewModel)(({ viewModel }) => (
  <VBox style={{ margin: 30 }}>
    <h2>TODO List</h2>
    <HBox>
      <LeftPanel/>
      <RightPanel onAdd={viewModel.addNewTodo}/>
    </HBox>
  </VBox>
));
