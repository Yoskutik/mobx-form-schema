import React, { VFC } from "react";
import { HFlexBox, VFlexBox } from "./components";
import { injectable } from "tsyringe";
import { childView, view, ViewModel } from "@yoskutik/mobx-react-mvvm";
import { ArticlesService, TArticle } from "./services";
import type { AppViewModel } from "./App";
import { computed, makeObservable } from "mobx";

type ArticleProps = {
  data: TArticle;
}

@injectable()
class ArticlesViewModel extends ViewModel<AppViewModel, ArticleProps> {
  @computed get read(): boolean {
    return this.articlesService.readIds.has(this.viewProps.data.id);
  }

  constructor(public articlesService: ArticlesService) {
    super();
    makeObservable(this);
  }

  onRead = () => this.articlesService.read(this.viewProps.data);
}

const Article: VFC<ArticleProps> = view(ArticlesViewModel)(({ viewModel, data }) => (
  <VFlexBox cls={`article ${viewModel.read ? 'read' : ''}`} key={Math.random()} justify="space-between">
    <h2 className="article__title">{data.title}</h2>
    <button className="article__btn" onClick={viewModel.onRead}>
      Read
    </button>
  </VFlexBox>
));

export const Articles = childView<AppViewModel>(({ viewModel }) => (
  <HFlexBox wrap cls="articles">
    {viewModel.data.map(it => <Article data={it} key={it.id}/>)}
  </HFlexBox>
));
