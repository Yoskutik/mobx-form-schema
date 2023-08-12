# [Form Schema](https://yoskutik.github.io/form-schema/)

[![version](https://img.shields.io/npm/v/@yoskutik/form-schema)](https://www.npmjs.com/package/@yoskutik/form-schema)
[![ES6](https://img.shields.io/badge/EcmaScript-v.6-blue)](https://github.com/yoskutik/form-schema)
[![Weight](https://raw.githubusercontent.com/Yoskutik/form-schema/master/badges/weight.svg)](https://github.com/yoskutik/form-schema)
[![license](https://img.shields.io/npm/l/@yoskutik/form-schema)](https://www.npmjs.com/package/@yoskutik/form-schema)
![Jest coverage](https://raw.githubusercontent.com/Yoskutik/form-schema/master/badges/coverage-jest%20coverage.svg)
[![Build](https://github.com/Yoskutik/form-schema/actions/workflows/build.yml/badge.svg)](https://github.com/Yoskutik/mobx-form-schema/actions/workflows/build.yml)

---

_Form Schema_ is a small library that can simplify forms developing process by
providing a **Form Schema** concept. A form schema gives you:
* a convenient way to describe your form - its **validation**, **presentation**,
**creation** and **observation**.
* as well as a convenient way to use your data.

You can find the _Form Schema_ documentation
[on the website](https://yoskutik.github.io/form-schema/).



## Example


Just look at the short example of schema description

```typescript
import { FormSchema, watch, validate } from '@yoskutik/form-schema';
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
const schema1 = FeedbackSchema.create();

schema.email = 'incorrect.email';
schema.validateAll();
console.log(schema.isValid, schema.errors);
// false, {
//   email: 'Invalid email format',
//   body: 'The value is required',
// }

schema.checkAnyChanges();
console.log(schema.isChanged);
// true
```

And this is only the beginning!

---


## Simple validation!

You can apply **several validation functions** for each property in a schema.
And each function can generate its own error message.

Inside a validation function you can use not only current value of the field,
but **also entire schema as well**. It is useful for writing rules like
comparing repeated password field value with password field value.

**All the validation is applied automatically**. If the observable value or
any property from schema that is used in validation are changed, the
validation will be applied again.

**The validation can be applied conditionally**. It can be useful, if you want
to turn off the validation for optional fields, if they have empty value. And
you can also make the **condition based on entire schema as well**. And **the
condition is applied automatically** too.


## Simple observation!

With _Form Schema_ you can **understand whether the content of your
form is changed**. It can be useful, if you want to disable submit ability
if the form is not changed.

**It also works with predefined values**. And that's extremely helpful, if
there's an option to edit forms with predefined values in your project.

You can **get the initial value of a field** at any time.

You can observe not only primitive values, but also **sets, arrays, nested
form schemas and arrays of nested form schemas**. And the real cool part is
that the **properties aren't considered changed if you pass a set, array or
schema with the exact same content**.

And also **you can create your own rules to observe other structures**.


## Simple initialization!

**You can use a single schema to create in instance of form with predefined
values and without them**.

**You can also add a transformation function for each property to transform
predefined values**. This can be useful, for example, if you want to
convert ISO Date string into `Date` instance.


## Simple presentation!

Each form schema instance have its _presentation_ - an object that contains
only data of form's fields without any utility data or methods. This object
can be used as final presentation of your form and send to the server.

But also **you can add a transformation function for each property to
transform the presentation**. For example, you trim your strings or convert
Date instances into formatted strings.


## And finally, you can make it automate!

_Form Schema_ is well-integrated with MobX package. You still can use
it without MobX. But if you already use it, Form Schema can become
automated!

