# React MVVM Framework

[![](https://img.shields.io/npm/l/@yoskutik/mobx-react-mvvm)](https://www.npmjs.com/package/@yoskutik/mobx-react-mvvm)
[![](https://img.shields.io/npm/v/@yoskutik/mobx-react-mvvm)](https://www.npmjs.com/package/@yoskutik/mobx-react-mvvm)
[![](https://img.shields.io/npm/dw/@yoskutik/mobx-react-mvvm)](https://www.npmjs.com/package/@yoskutik/mobx-react-mvvm)
[![](https://img.shields.io/github/languages/code-size/yoskutik/mobx-react-mvvm)](https://github.com/Yoskutik/mobx-react-mvvm)
![](https://img.shields.io/lgtm/grade/javascript/github/Yoskutik/mobx-react-mvvm?label=Quality)
![](https://img.shields.io/lgtm/alerts/github/Yoskutik/mobx-react-mvvm?label=Vulnerabilities)

`@yoskutik/mobx-react-mvvm` is a React MVVM Framework based on using MobX and
TSyringe

## Examples

```typescript
import 'reflect-metadata'
import React from 'react';
import { injectable } from 'tsyringe';
import { observable, makeObservable,action } from 'mobx';
import { view, Model } from '@yoskutik/mobx-react-mvvm';

@injectable()
class SomeViewModel extends ViewModel {
  @observable count = 0;

  constructor() {
    super();
    makeObservable(this);
  }

  @action add = () => this.count++;
}

const SomeView = view(SomeViewModel)(({ viewModel }) => (
  <div>
    {viewModel.count}
    <button onClick={viewModel.add}>Add</button>
  </div>
));
```

## Links

[MobX documentation]()  
[TSyringe documentation]()
