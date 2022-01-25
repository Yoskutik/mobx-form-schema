# React MVVM Framework

[![](https://img.shields.io/npm/v/@yoskutik/mobx-react-mvvm)](https://www.npmjs.com/package/@yoskutik/mobx-react-mvvm)
[![](https://img.shields.io/npm/l/@yoskutik/mobx-react-mvvm)](https://www.npmjs.com/package/@yoskutik/mobx-react-mvvm)
[![](https://img.shields.io/npm/dw/@yoskutik/mobx-react-mvvm)](https://www.npmjs.com/package/@yoskutik/mobx-react-mvvm)
[![](https://img.shields.io/lgtm/grade/javascript/github/Yoskutik/mobx-react-mvvm?label=Quality)](https://github.com/Yoskutik/mobx-react-mvvm)
[![](https://img.shields.io/lgtm/alerts/github/Yoskutik/mobx-react-mvvm?label=Vulnerabilities)](https://github.com/Yoskutik/mobx-react-mvvm)
[![](https://img.shields.io/github/languages/code-size/yoskutik/mobx-react-mvvm?label=Size)](https://github.com/Yoskutik/mobx-react-mvvm)

A super lightweight React MVVM Framework based on using MobX and TSyringe.

In fact, this is not so much a framework as a demonstration of an approach to front-end
development. I think that such a wide spread of the Flux architecture and in particular
the Redux framework is not due to anything.

The main idea of this framework is that **MobX + DI + MVVM pattern >> Flux**.

## View

View is just a MobX's observer. Also, a View has an ErrorBound, which means if any child
component of the View would raise an error, View will just disappear and stop error from
spreading.

In TypeScript the View has type `FVC`. Every View have a special property `viewModel`, that
is equal to an instance of ViewModel that was given to the `view` function.

A View can be created using `view` function from the package:

```typescript
import React, { VFC } from 'react';
import { view } from '@yoskutik/mobx-react-mvvm';
 
interface SomeViewProps {
  prop1: number;
  prop2?: string;
}

const SomeView: VFC<SomeViewProps> = view(SomeViewModel)(({ viewModel, prop1, prop2 }) => (
  <div/>
));
```

## ViewModel

ViewModel must have a decorator `@singleton` or `@injetable` from TSyringe.

These are fields and methods that are available for all ViewModels:

| |Modifier|Description|
|-----|--------|-----------|
|`parent`|`protected`|A link for a parent ViewModel|
|`viewProps`|`protected`|Properties that were given to a View|
|`onDispose`|`protected`|This function is called after the View has become unmounted|
|`isActive`|`public`|Flag that tell whether the View is in the virtual DOM|

<br/>

ViewModel can access `parent` and `viewProps` only after the constructor has done. `viewProps`
are updated every time HOC of the View is updated. Because of the HOC is memorized they are
updated every time when the properties are new.

Every view supposed to be extended from `ViewModel`:

```typescript
import { injectable } from 'tsyringe';
import { ViewModel } from '@yoskutik/mobx-react-mvvm';
import { observable, makeObservable } from 'mobx';

@injectable()
class SomeViewModel extends ViewModel {
  @observable count = 0;

  constructor() {
    super();
    makeObservable(this);
  }

  @action add = () => this.count++;
}
```

## Examples

```typescript
import 'reflect-metadata'
import React from 'react';
import { injectable } from 'tsyringe';
import { observable, makeObservable, action } from 'mobx';
import { view, ViewModel } from '@yoskutik/mobx-react-mvvm';

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

[MobX documentation](https://mobx.js.org/README.html)  
[TSyringe documentation](https://github.com/microsoft/tsyringe)
