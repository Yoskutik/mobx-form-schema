import { singleton } from "tsyringe";
import { action, autorun, makeObservable, observable } from "mobx";
import { ToastsService } from "./ToastsService";

export type TArticle = {
  id: string;
  title: string;
}

@singleton()
export class ArticlesService {
  @observable.shallow readIds = new Set<string>();

  @observable readCount = 0;

  @observable collectStatistics = true;

  constructor(private toastsService: ToastsService) {
    makeObservable(this);

    autorun(() => {
      this.readIds.size > 0 && this.readIds.size % 10 === 0
        && this.toastsService.make(`You've already read ${this.readIds.size} different articles.`);
    });

    autorun(() => {
      this.readCount > 0 && this.readCount % 10 === 0
        && this.toastsService.make(`You've already pressed "Read" button ${this.readCount} times.`);
    });
  }

  @action read = (article: TArticle): void => {
    !this.readIds.has(article.id) && this.toastsService.make(`You've read an article "${article.title}"`);
    if (!this.collectStatistics) return;
    this.readCount++;
    this.readIds.add(article.id);
  }
}
