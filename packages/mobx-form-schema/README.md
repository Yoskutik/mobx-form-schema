# [MobX Form Schema](https://yoskutik.github.io/mobx-form-schema/)

[![version](https://img.shields.io/npm/v/@yoskutik/mobx-form-schema)](https://www.npmjs.com/package/@yoskutik/mobx-form-schema)
[![ES6](https://img.shields.io/badge/EcmaScript-v.6-blue)](https://github.com/yoskutik/mobx-form-schema)
[![Weight](https://raw.githubusercontent.com/Yoskutik/mobx-form-schema/master/badges/weight.svg)](https://github.com/yoskutik/mobx-form-schema)
[![license](https://img.shields.io/npm/l/@yoskutik/mobx-form-schema)](https://www.npmjs.com/package/@yoskutik/mobx-form-schema)
![Jest coverage](https://raw.githubusercontent.com/Yoskutik/mobx-form-schema/master/badges/coverage-jest%20coverage.svg)
[![Build](https://github.com/Yoskutik/mobx-form-schema/actions/workflows/build.yml/badge.svg)](https://github.com/Yoskutik/mobx-form-schema/actions/workflows/build.yml)

---

_MobX Form Schema_ is a small library that can simplify web forms
development process by providing a **_Form Schema_** concept. A form schema
allows you to describe all the form logic besides user event handling. You
can easily **validate** your form, **observe** its changes and **simplify**
your communication with the backend!

You can find the _MobX Form Schema_ documentation
[on the website](https://yoskutik.github.io/mobx-form-schema/).



## Example


Just look at the short example of schema description

```typescript
import { FormSchema, watch, validate } from '@yoskutik/mobx-form-schema';
import { required, minLength } from 'path/to/validators';

class FeedbackSchema extends FormSchema {
  @watch name = '';

  @validate(required(), email())
  @watch email = '';

  @validate(required(), minLength(20))
  @watch body = '';
}
```

This schema tells, that `FeedbackSchema` instance will contain 3 fields: `name`,
`email` and `body`. The `email` field have 2 simple rules - it is required, and
must contain only email format string. The `body` is required as well and must
be at least 20 symbols.

Schema allow you to store and handle your data. If store your data inside
the schema, you can check whether the form is valid or is changed.

```typescript
import { runInAction } from 'mobx';
const schema1 = FeedbackSchema.create();

runInAction(() => schema.email = 'incorrect.email');
console.log(schema.isValid, schema.errors);
// false, {
//   email: 'Invalid email format',
//   body: 'The value is required',
// }

console.log(schema.isChanged);
// true
```

And this is only the beginning!

---


## Simple validation!

You can apply several validation functions for each property in a schema.
And each function can generate its own error message.

Inside a validation function you can use not only current value of the field,
but also entire schema as well. It can be useful, if the validation of a
property depends on another property's value. For example, "confirm password"
value must be the same as "password", and "from" date must happen before
the "to" date.

The validation can be applied conditionally. The fields can be optional,
can be hidden for some reason, or there can be cases, when the validation
of one field must be skipped, because of the value of another field.
And you can easily achieve such validation conditions.

The really nice part is that, by default, all the validation is applied
automatically using `autorun` function from MobX. If a property is changed,
it will be recalculated. If another property from schema, that is used
in validation is changed, it will be recalculated as well. And it works
with conditions too.


## Simple data changes observation!

With _Form Schema_ you can understand whether the content of your
form is changed. It can be useful, when you want to provide to user an
ability to understand, is the form changed, like with disabling submit
button unless the form is not changed.

It also works with predefined values. And that's extremely helpful, if
there's an option to edit forms with predefined values in your project.
And you can also reset your forms into the initial state!

You can get the initial value of a field at any time. And you get which
of the properties are changed at the moment.

You can observe not only primitive values, but also sets, arrays, nested
form schemas and arrays of nested form schemas. The real cool part is that
the properties aren't considered changed if you pass a set, array or
schema with the exact same content. And of course resetting works with
these structures as well.

And if those out-of-box structures is not enough for you, you can also
you can create your own rules to observe other structures.


## Simple backend communication!

With MobX Form Schema you simplify data transformations. If your schema
need a bit of different data from the one in server's response, or if
there's


### Data preprocessing

You can use a single schema to create in instance of form with predefined
values from the backend. And also you can also add a transformation
function for each property to transform predefined values. For example,
a server cannot send you an instance of `Set` or `Date`, and if you
need it, you can easily transform the data from response.

### Data postprocessing

Such data handling works in both directions. If your schema has data,
which must be processed before sending to a server, you can do it as
well. Your schema has some utility properties or user only fields like
"Confirm password" - you can cut them off. If you use `Date`, but the
server receives string of `yyyy/MM/dd` format - apply the transformation.

---

## Will it work with or without React?

MobX Form Schema does not depend on React in any way. The only one thing
you need in order to use it is the _MobX_ package.

Although, MobX Form Schema can be easily integrated into any React
application. You can see examples of using this package in React
application:
* [In the Web Documentation](https://yoskutik.github.io/mobx-form-schema/#/learn/complete-example);
* [On CodeSandbox.io](https://codesandbox.io/s/silent-morning-68myz9?file=/src/index.tsx);
* [On StackBlitz.com](https://stackblitz.com/edit/stackblitz-starters-g7hrxn?file=src%2Findex.tsx).
