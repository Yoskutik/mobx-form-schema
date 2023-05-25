# MobX Form Schema

[![version](https://img.shields.io/npm/v/@yoskutik/mobx-form-schema)](https://www.npmjs.com/package/@yoskutik/mobx-form-schema)
[![ES6](https://img.shields.io/badge/EcmaScript-v.6-blue)](https://github.com/yoskutik/mobx-form-schema)
[![Weight](https://raw.githubusercontent.com/Yoskutik/mobx-form-schema/master/badges/weight.svg)](https://github.com/yoskutik/mobx-form-schema)
[![license](https://img.shields.io/npm/l/@yoskutik/mobx-form-schema)](https://www.npmjs.com/package/@yoskutik/mobx-form-schema)
[![Vulnerabilities](https://img.shields.io/snyk/vulnerabilities/npm/@yoskutik/mobx-form-schema?label=Vulnerabilities)](https://www.npmjs.com/package/@yoskutik/mobx-form-schema)
![Jest coverage](https://raw.githubusercontent.com/Yoskutik/mobx-form-schema/master/badges/coverage-jest%20coverage.svg)
[![Build](https://github.com/Yoskutik/mobx-form-schema/actions/workflows/build.yml/badge.svg)](https://github.com/Yoskutik/mobx-form-schema/actions/workflows/build.yml)

---

_Mobx Form Schema_ is a small library that can simplify forms developing process by
providing a **Form Schema** concept. A form schema gives you:
* a convenient way to describe your form - its **validation**, **presentation**,
**creation** and **observation**.
* as well as a convenient way to use your data.


Just look at the short example of schema description

```javascript
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



# Validation

_MobX Form Schema_ does not provide any validation rules out of the box, but
you can your own.

You can use `isVaid` getter to understand whether all the fields are valid.

You can use `errors` getter to get all the errors of the form.

```typescript
export const required = () => (value) => {
  if (value?.trim()) return false;
  return 'The field is required';
};

export const minLength = (minLength) => (value) => {
  if (value.length >= minLength) return false;
  return `The field is supposed to be ${minLength} symbols at least`;
};

export class SignUpSchema extends FormSchema {
  @validate(required(), minLength(8))
  @watch password = '';
}
```

Each time `password` is changed, `FormSchema` will automatically apply the
validation.

You can provide several validation rules, in order to separate your validation
logic and get an ability to use different validation messages for different
rules.

```javascript
const schema = SignUpSchema.create();

console.log(
  schema.password, // ''
  schema.errors,   // { password: 'The field is required' }
  schema.isValid,  // false
);

schema.password = '1234';
console.log(
  schema.password, // '1234'
  schema.errors,   // { password: 'The field is supposed to be 8 symbols at least' }
  schema.isValid,  // false
);

schema.password = '12345678';
console.log(
  schema.password, // '12345678'
  schema.errors,   // {}
  schema.isValid,  // true
);
```


## Advanced validation

A _validator_ function can take 2 parameters as an input - the value to validate
and the entire schema.

```typescript
export const repeatedPassword = () => (repeatedPassword, schema) => {
  if (repeatedPassword === schema.password) return false;
  return 'Your passwords are mispamatched';
};

class SignUpSchema extends FormSchema {
  @validate(required(), minLength(8))
  @watch password = '';

  @validate(required(), repeatedPassword())
  @watch repeatedPassword = '';
}
```

All the validation applies using MobX's `autorun` function, which means
that in the example of `repeatedPassword` the validation will be applied
not only when `repeatedPassword`, but also when `password` is changed as
well.

```typescript
const schema = SignUpSchema.create();

schema.password = '12345678';
console.log(
  schema.errors,   // { repeatedPassword: 'Your passwords are mispamatched' }
  schema.isValid,  // false
);

schema.repeatedPassword = '12345678';
console.log(
  schema.errors,   // {}
  schema.isValid,  // true
);

schema.password = 'another password';
console.log(
  schema.errors,   // { repeatedPassword: 'Your passwords are mispamatched' }
  schema.isValid,  // false
);
```


## Conditional validation

With _MobX Form Schema_ you can also apply rules to turn off the validation using
`validate(...).if(...)` decorator.

```typescript
const nameValidationCondition = (_, schema: SignUpSchema) => (
  schema.wantToFillInTheName
);

class SignUpSchema extends FormSchema {
  @validate(email()).if(email => !!email) // or simply `.if(Boolean)`
  @watch email = '';

  @validate(required()).if(nameValidationCondition) // or simply `.if(Boolean)`
  @watch name = '';

  @watch wantToFillInTheName = true;
}
```

In the example above the validation for `email` will be applied it's not an
empty string. This trick is helpful for validating non-required fields.

The condition of `name` property is based on the other property of schema.
And `name` will be validated only, when `wantToFillInTheName` is true.

```typescript
const schema = SignUpSchema.create();

console.log(schema.errors);
// { name: 'The field is required' }

schema.wantToFillInTheName = false;
console.log(schema.errors);
// {}

schema.email = 'not.valid.email';
console.log(schema.errors);
// { email: 'The email is not valid' }
```



# Observation

Sometimes it may be useful to understand whether the form is different from
the initial state. For example, if we want to disable form submit button, if
its content remain the same. And usually, we have to check each field in a form
separately.

But not with _MobX Form Schema_! You can simply apply `watch` decorator for
the properties you want to observe for changes from the initial state.

By default `watch` applies `observable` decorator on a property, so instead of
using `@watch @observable` you can just use `@watch`. But you can freely use it
with any other modification of `observable` decorator, such as `observable.ref`
or `observable.shallow`.

```typescript
import { FormSchema, watch } from '@yoskutik/mobx-form-schema';

export class UserSchema extends FormSchema {
  @watch name = '';

  @watch surname = '';
}
```

And now you can use `isChanged` getter to know whether any property of
the field is changed. And also you can use `getInitial` method to get
the initial value of any property.

```typescript
const schema = UserSchema.create();

console.log(schema.isChanged) // false

schema.name = 'Name';
console.log(
  schema.isChanged,           // true
  schema.getInitial('name'),  // ''
);

schema.name = '';
console.log(schema.isChanged) // false
```

And it's even more useful, when the form is pre-filled.

```typescript
const schema = UserSchema.create({
  name: 'Initial name',
  surname: 'Initial surname',
});

console.log(
  schema.isChanged,         // false
  schema.presentation,      // { name: 'Initial name', surname: 'Initial surname' }
),

schema.name = 'Changed name';
console.log(
  schema.isChanged,           // true
  schema.getInitial('name'),  // 'Initial name'
);

schema.name = 'Initial name';
console.log(schema.isChanged) // false
```


## Observing non-primitive values

The `watch` decorator works well with primitive values, such as numbers,
strings, booleans, nulls, undefined, symbols or BigInt. But sometimes it
may be useful observing some non-primitive values. To do that, you can
use watch's modifiers.

### Observing array of primitives

If you want to observe an array of primitive values you can use `watch.array`
decorator. And now, even if you pass **new** array with exact same content,
the `FormSchema` will understand, that it is not changed.

```typescript
import { FormSchema, watch } from '@yoskutik/mobx-form-schema';

export class CVSchema extends FormSchema {
  @watch.array skills = [];
}

const schema = CVFormSchema.create({
  skills: ['JavaScript', 'HTML'],
});

console.log(schema.isChanged); // false

schema.skills.push('CSS');
console.log(schema.isChanged); // true

schema.skills.pop();
console.log(schema.isChanged); // false

// The array is new, but its content the same as in initial one
schema.skills = ['JavaScript', 'HTML'];
console.log(schema.isChanged); // false
```

### Observing set of primitives

If you want to observe a set of primitive values you can use `watch.set`
decorator. And now, even if you pass **new** set with exact same content,
the `FormSchema` will understand, that it is not changed.

```typescript
import { FormSchema, watch } from '@yoskutik/mobx-form-schema';

export class CVSchema extends FormSchema {
  @watch.set skills = new Set();
}

const schema = CVFormSchema.create({
  skills: new Set(['JavaScript', 'HTML']),
});

console.log(schema.isChanged); // false

schema.skills.add('CSS');
console.log(schema.isChanged); // true

schema.skills.delete('CSS');
console.log(schema.isChanged); // false

// The set is new, but its content the same as in initial one
schema.skills = new Set(['JavaScript', 'HTML']);
console.log(schema.isChanged); // false
```

### Observing nested schema

You can use one form schema as a property of another one. And when the nested
schema is changed, we want to think that parent schema is changed as well. In
order to do that you can use `watch.schema` decorator. And now, even if
you pass **new** schema with exact same content, the `FormSchema` will
understand, that it is not changed.

```typescript
import { FormSchema, watch } from '@yoskutik/mobx-form-schema';

export class NestedSchema extends FormSchema {
  @watch field = 0;
}

export class SuperSchema extends FormSchema {
  @watch.schema nested = NestedSchema.create();
}

const schema = SuperSchema.create();

console.log(schema.isChanged); // false

schema.nested.field++;
console.log(schema.isChanged); // true

schema.nested.field--;
console.log(schema.isChanged); // false

// The schema is new, but its content the same as in initial one
schema.skills = NestedSchema.create();
console.log(schema.isChanged); // false
```

### Observing nested schemas array

And you can also have an array of schemas in your schema. In this case you
can use `watch.schema` decorator. And now, even if you pass **new** array
with exact same content, the `FormSchema` will understand, that it is not
changed.

```typescript
import { FormSchema, watch } from '@yoskutik/mobx-form-schema';

export class NestedSchema extends FormSchema {
  @watch field = 0;
}

export class SuperSchema extends FormSchema {
  @watch.schema nested = [NestedSchema.create(), NestedSchema.create()];
}

const schema = SuperSchema.create();

console.log(schema.isChanged); // false

schema.nested[0].field++;
console.log(schema.isChanged); // true

schema.nested[0].field--;
console.log(schema.isChanged); // false

// The array is new, but its content the same as in initial one
schema.skills = [NestedSchema.create(), NestedSchema.create()];
console.log(schema.isChanged); // false
```



# Initialize your schema

To create an instance of _MobX Form Schema_ you have to call static
method `create`. This method can be called without any data or with
a data, that will be used in the initialization process. By default,
data from the passed object is applied without any transformations.

```typescript
export class Schema extends FormSchema {
  field = 0;
}

const schema1 = Schema.create();
console.log(schema1.field);   // 0

const schema2 = Schema.create({ field: 100 });
console.log(schema1.field);   // 100
```

But you can use `factory` decorator to apply a transformation
function for the passed data.

```typescript
import { FormSchema, factory } from '@yoskutik/mobx-form-schema';

export class Schema extends FormSchema {
  @factory(schema => new Date(schema.data))
  realDate: Date;
  
  stringDate: string;
}

const schema = Schema.create({
  realDate: '2023-05-25T10:00:00.000Z',
  stringDate: '2023-05-25T10:00:00.000Z',
});

console.log(schema.realDate instanceof Date);    // true
console.log(schema.stringDate instanceof Date);  // false
```



# Presentation

An instance of _MobX Form Schema_ contains some utility data. You
can get rid of all that data by using `presentation` decorator.

```typescript
export class Schema extends FormSchema {
  field = 0;
}

const schema = Schema.create();
console.log(schema.presentation);   // { field: 0 }
```

But you can also apply any transformation function to change the
presentation of the exact field. For example, you can trim your
string or convert `Date` object into string of `yyyy-mm` format.

```typescript
import { presentation, FormSchema } from '@yoskutik/mobx-form-schema';
import { format } from 'date-fns';

export class Schema extends FormSchema {
  @presentation(value => value.trim())
  description = '  Description  ';

  @presentation(value => format(value, 'yyyy-MM'))
  month = new Date();

  name = 'Name';
}

const schema = Schema.create();
console.log(schema.presentation);
// {
//   description: 'Description',
//   month: '2023-05',
//   name: 'Name',
// }

// But the real values remains the same
console.log(schema.description);  // '  Description  '
console.log(schema.month);        // Fri May 26 2023 00:00:00 GMT+0000 (Eastern European Summer Time)
console.log(schema.name);         // 'Name'
```