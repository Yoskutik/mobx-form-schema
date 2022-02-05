import React, { VFC } from 'react';
import { injectable } from 'tsyringe';
import { makeObservable, observable, autorun, action } from 'mobx';
import { view, ViewModel } from '@yoskutik/mobx-react-mvvm';
import { VBox } from '@components';
import type { TTodoItem, AppViewModel } from '../App';

type ListProps = {
  searchText?: string;
};

@injectable()
class ListViewModel extends ViewModel<AppViewModel, ListProps> {
  @observable.shallow filteredData: TTodoItem[] = [];

  constructor() {
    super();
    makeObservable(this);

    autorun(() => {
      this.filteredData = this.parent?.todos.filter(
        (it) =>
          !this.viewProps?.searchText ||
          it.title.toLowerCase().includes(this.viewProps.searchText),
      );
    });
  }

  @action onItemClick = (id: string) => {
    this.parent.chosenTodo = this.parent.todos.find((it) => it.id === id);
  };
}

export const List: VFC<ListProps> = view(ListViewModel)(({ viewModel }) => (
  <VBox cls="list">
    {viewModel.filteredData.length ? (
      viewModel.filteredData.map((it) => (
        <div
          key={it.id}
          className={`list__item ${it.done ? 'done' : ''} ${
            (viewModel as any).parent.chosenTodo?.id === it.id ? 'chosen' : ''
          }`}
          onClick={() => viewModel.onItemClick(it.id)}
        >
          {it.title}
        </div>
      ))
    ) : (
      <div className="list__item">No items in todo list</div>
    )}
  </VBox>
));
