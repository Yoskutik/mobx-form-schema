# React MVVM Framework

[![version](https://img.shields.io/npm/v/@yoskutik/mobx-react-mvvm)](https://www.npmjs.com/package/@yoskutik/mobx-react-mvvm)
[![license](https://img.shields.io/npm/l/@yoskutik/mobx-react-mvvm)](https://www.npmjs.com/package/@yoskutik/mobx-react-mvvm)
[![downloads](https://img.shields.io/npm/dw/@yoskutik/mobx-react-mvvm)](https://www.npmjs.com/package/@yoskutik/mobx-react-mvvm)
[![Quality](https://img.shields.io/lgtm/grade/javascript/github/Yoskutik/mobx-react-mvvm?label=Quality)](https://github.com/Yoskutik/mobx-react-mvvm)
[![Vulnerabilities](https://img.shields.io/lgtm/alerts/github/Yoskutik/mobx-react-mvvm?label=Vulnerabilities)](https://github.com/Yoskutik/mobx-react-mvvm)
[![codecov](https://codecov.io/gh/Yoskutik/mobx-react-mvvm/branch/master/graph/badge.svg?token=05X4P8AVXD)](https://codecov.io/gh/Yoskutik/mobx-react-mvvm)
[![Size](https://img.shields.io/github/languages/code-size/yoskutik/mobx-react-mvvm?label=Size)](https://github.com/Yoskutik/mobx-react-mvvm)

A super lightweight React MVVM Framework based on using MobX and TSyringe.

In fact, this is not so much a framework as a demonstration of an approach to front-end
development. I think that such a wide spread of the Flux architecture and in particular
the Redux framework is not due to anything.

The main idea of this framework is that **MobX + DI pattern + MVVM pattern >> Flux**.

## View

View is just a MobX's observer. Also, a View has an ErrorBound, which means if any child
component of the View would raise an error, View will just disappear and stop error from
spreading.

In TypeScript the View has type `FVC`. Every View has a special property `viewModel`, that
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

### ChildView

This architecture also has a ChildView entity. A ChildView is an observer which has access
to the View's ViewModel. A ChildView's mounting and unmounting does not effect on ViewModel's
fields.

In TypeScript the ChildView has type `FVC`. Every ChildView has a special property
`viewModel`, which type is equal to a type that was given to the `childView` function.

To create a ChildView use `childView` function:

```typescript
import React from 'react';
import { childView } from '@yoskutik/mobx-react-mvvm';
import type { SomeViewModel } from './SomeViewModel';
 
interface SomeSomeChildProps {
  prop1: number;
}

const SomeChild = childView<SomeViewModel, SomeSomeChildProps>(({ viewModel, prop1 }) => (
  <div/>
));
```

Note that is better to use `import type` instead of `import` in case you need to import
View's ViewModel type to prevent the occurrence of cyclic dependencies.

## ViewModel

ViewModel must have a decorator `@singleton` or `@injetable` from TSyringe.

These are fields and methods that are available for all ViewModels:

| |Modifier|Description|
|-----|--------|-----------|
|`viewProps`|`protected readonly`|Properties that were given to a View|
|`onViewUnmount`|`protected`|This function is called after the View has become unmounted|
|`parent`|`public readonly`|A link for a parent ViewModel|
|`isActive`|`public readonly`|Flag that tell whether the View is in the virtual DOM|

<br/>

The fields `parent` and `viewProps` are initialized only after the constructor has done. But
they both are `observable.ref`, so you can use `reaction`, `autorun` and `observe` in the
constructor.

The `viewProps` are updated every time HOC of the View is updated. Because of the HOC is
memorized they are updated every time when the properties are new.

To specify the typing of the `parent` and `viewProps` fields use generics of `ViewModel` class.

Every ViewModel supposed to be extended from `ViewModel`:

```typescript
import { injectable } from 'tsyringe';
import { ViewModel } from '@yoskutik/mobx-react-mvvm';
import { observable, makeObservable } from 'mobx';
import type { ParentViewModel } from './ParentViewModel';
import type { SomeViewProps } from './SomeView';

@injectable()
class SomeViewModel extends ViewModel<ParentViewModel, SomeViewProps> {
  @observable count = 0;

  constructor() {
    super();
    makeObservable(this);
  }

  @action add = () => this.count++;
}
```

Note that is better to use `import type` instead of `import` in case you need to import
parent View's ViewModel type or/and View's props type to prevent the occurrence of cyclic
dependencies.

## Diagrams

![](https://raw.githubusercontent.com/Yoskutik/mobx-react-mvvm/master/MVVM%201.png)

## Examples

  * TODO List (an example for View, ChildView and ViewModel):
    * [CodeSandbox](https://codesandbox.io/s/uv5hw)
    * [GitHub](https://github.com/Yoskutik/mobx-react-mvvm-preview/tree/ViewViewModel)
  * Articles reader (DI):
    * [CodeSandbox](https://codesandbox.io/s/solitary-snow-4ncxb)
    * [GitHub](https://github.com/Yoskutik/mobx-react-mvvm-preview/tree/DI)
  * Forms (Model):
    * [GitHub](https://github.com/Yoskutik/mobx-react-mvvm-preview/tree/Model)

## Links

[MobX documentation](https://mobx.js.org/README.html)  
[TSyringe documentation](https://github.com/microsoft/tsyringe)
