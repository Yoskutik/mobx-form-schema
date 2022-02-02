import { singleton } from "tsyringe";

@singleton()
export class TextGenerator {
  private readonly beforeTitles = [
    "The blue duck",
    "Awesome Rock the rock",
    "Very old programmer",
    "Foo Bar Baz",
    "Big head Roby",
    "Dear deer",
  ];

  private readonly middleTitles = [
    "has fall into",
    "really liked",
    "unfortunately disappeared at",
    "has written the great poem about",
    "was bamboozled by",
    "has started to live in",
    "accidentally walked past",
  ];

  private readonly afterTitles = [
    "a huge hole",
    "a trash can",
    "a car on a truck",
    "the one-meter tree",
  ];

  private getOneFrom = (arr: string[]): string => arr[Math.round(Math.random() * (arr.length) - 0.5)];

  make = (): string => {
    const before = this.getOneFrom(this.beforeTitles);
    const middle = this.getOneFrom(this.middleTitles);
    const after = this.getOneFrom(this.afterTitles);
    return `${before} ${middle} ${after}.`;
  };
}
