# React MVVM Framework

Badges section

`@yoskutik/mobx-react-mvvm` is a React MVVM Framework based on using MobX and
TSyringe

<br/>

### Examples

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

<br/>

### Links

[MobX documentation]()  
[TSyringe documentation]()
