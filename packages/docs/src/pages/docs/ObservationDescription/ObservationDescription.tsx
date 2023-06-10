import { Alert, Typography } from '@mui/material';
import { Highlighter, Code, PageBlock, TextLink } from '@components';
import base from './base.example';
import base2 from './base2.example';
import base3 from './base3.example';
import watchArray from './watch.array.example';
import watchSet from './watch.set.example';
import watchSchema from './watch.schema.example';
import watchSchemasArray from './watch.shemasArray.example';
import watchConfigure from './watch.configure.example';
import save from './save.example';
import save2 from './save2.example';

export const ObservationDescription = () => (
  <PageBlock
    title="Observation"
    description={(
      <Typography component="p">
        Sometimes it may be useful to understand whether the form is different from the initial
        state. For example, if we want to disable form submit button, if its content remain the
        same. And usually, we have to check each field in a form separately.
      </Typography>
    )}
  >
    <PageBlock
      title="Usage"
      description={(
        <>
          <Typography component="p">
            But not with <i>MobX Form Schema</i>! You can simply apply <Code>watch</Code> decorator
            for the properties you want to observe for changes from the initial state.
          </Typography>

          <Typography component="p">
            By default <Code>watch</Code> applies <Code>observable</Code> decorator on a property,
            so instead of using <Code>@watch @observable</Code> you can just use <Code>@watch</Code>.
            But you can freely use it with any other modification of <Code>observable</Code> decorator,
            such as <Code>observable.ref</Code> or <Code>observable.shallow</Code>.
          </Typography>
        </>
      )}
    >
      <Highlighter code={base} />

      <Typography component="p">
        And now you can use <Code>isChanged</Code> getter to know whether any property of
        the field is changed. And also you can use <Code>getInitial</Code> method to get
        the initial value of any property.
      </Typography>

      <Typography component="p">
        You can provide several validation rules, in order to separate your validation
        logic and get an ability to use different validation messages for different rules.
      </Typography>

      <Highlighter code={base2} />

      <Typography component="p">
        And it's even more useful, when the form is pre-filled.
      </Typography>

      <Highlighter code={base3} />
    </PageBlock>

    <PageBlock
      title="Non-primitive values"
      description={(
        <Typography component="p">
          The <Code>watch</Code> decorator works well with primitive values, such as numbers,
          strings, booleans, nulls, undefined, symbols or BigInt, because it uses reference
          comparison to understand that value was changed. But sometimes we have to observe
          objects, and objects reference comparison is not the best type of comparison for
          them. So, in order to observe objects and other non-primitives structures in your
          schema, you have to use watch's modifiers.
        </Typography>
      )}
    >
      <PageBlock
        title="Arrays of primitives"
        description={(
          <Typography component="p">
            If you want to observe an array of primitive values you can
            use <Code>watch.array</Code> decorator. And now, even if you pass <b>new</b> array
            with exact same content, the <Code>FormSchema</Code> will understand, that it is
            not changed.
          </Typography>
        )}
      >
        <Highlighter code={watchArray} />
      </PageBlock>

      <PageBlock
        title="Sets of primitives"
        description={(
          <Typography component="p">
            If you want to observe a set of primitive values you can
            use <Code>watch.set</Code> decorator. And now, even if you pass <b>new</b> set
            with exact same content, the <Code>FormSchema</Code> will understand, that it
            is not changed.
          </Typography>
        )}
      >
        <Highlighter code={watchSet} />
      </PageBlock>

      <PageBlock
        title="Nested schemas"
        description={(
          <Typography component="p">
            And you can also have an array of schemas in your schema. In this case you
            can use <Code>watch.schema</Code> decorator. And now, even if you
            pass <b>new</b> array with exact same content, the <Code>FormSchema</Code> will
            understand, that it is not changed.
          </Typography>
        )}
      >
        <Highlighter code={watchSchema} />
      </PageBlock>

      <PageBlock
        title="Arrays of nested schemas"
        description={(
          <Typography component="p">
            You can use one form schema as a property of another one. And when the nested
            schema is changed, we want to think that parent schema is changed as well. In
            order to do that you can use <Code>watch.schema</Code> decorator. And now,
            even if you pass <b>new</b> schema with exact same content,
            the <Code>FormSchema</Code> will understand, that it is not changed.
          </Typography>
        )}
      >
        <Highlighter code={watchSchemasArray} />
      </PageBlock>

      <PageBlock
        title="Configurable observation"
        description={(
          <>
            <Typography component="p">
              Basically, <Code>watch</Code>, <Code>watch.set</Code>, <Code>watch.array</Code> {' '}
              <Code>watch.schema</Code> and <Code>watch.schemasArray</Code> can cover most of
              your need. But, if you need to use any non-primitive value, you can
              use <Code>watch.configure</Code> method to create your own decorator.
            </Typography>

            <Alert severity="info">
              Please make sure that the need for a new decorator is justified. Perhaps if you change
              your approach, existing decorators will be enough.
            </Alert>

            <Typography component="p">
              The example below present observation rule for observing only the second value
              in the array. That means, that the schema will be considered changed only if
              the second value is changed.
            </Typography>
          </>
        )}
      >
        <Highlighter code={watchConfigure} />
      </PageBlock>
    </PageBlock>

    <PageBlock
      title="Resetting and syncronazing forms"
      description={(
        <>
          <Typography component="p">
            In order to understand that form was changed, the schema must contain the information
            about the initial state. And due to that fact, there's an opportunity to reset your
            form into the initial state. To do that you can use <Code>reset</Code> method.
          </Typography>

          <Typography component="p">
            Also you can save the current state of the schema as the initial one. To do that, you
            can use <Code>sync</Code> method.
          </Typography>
        </>
      )}
    >
      <Highlighter code={save} />

      <Typography component="p">
        No matter how complex your schema is, there is an opportunity to reset it. In the example above
        the schema contains a primitive value, an array and a nested schema. And resetting the parent
        schema will reset the nested one. As well as all the over properties in the schema.
      </Typography>

      <Highlighter code={save2} />
    </PageBlock>
  </PageBlock>
);
