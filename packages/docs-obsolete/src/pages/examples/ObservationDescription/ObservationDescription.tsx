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
import manual from './manual.example';

export const ObservationDescription = () => (
  <PageBlock
    title="Observation"
    description={(
      <Typography component="p">
        Sometimes it may be useful to understand whether the form is different from the initial
        state. For example, if we want to disable form submit button, if its content remain the same.
      </Typography>
    )}
  >
    <PageBlock
      title="Basic usage - primitives"
      description={(
        <>
          <Typography component="p">
            To start observing primitives values like strings or numbers, you should apply
            the <Code>@watch</Code> decorator to the needed property. With such decorator
            values from the current and the initial state are compared by their reference,
            which means <Code>@watch</Code> won't work with non-primitive structures.
          </Typography>

          <Typography component="p">
            With <Code>@watch</Code> the values from the current and the initial state are
            compared by their reference, which means <Code>@watch</Code> won't work with
            non-primitive structures. If you want to enable watching for objects, see the
            information below.
          </Typography>

          <Typography component="p">
            By default, <Code>@watch</Code> and all its modifiers make the property observable,
            so instead of using <Code>@watch @observable</Code> you can just use <Code>@watch</Code>.
            But you need to, you can freely use it with any other modification
            of <Code>@observable</Code> decorator, such
            as <Code>@observable.ref</Code> or <Code>observable.shallow</Code>.
          </Typography>
        </>
      )}
    >
      <Highlighter code={base} />

      <Typography component="p">
        And now you can use the <Code>isChanged</Code> getter to know whether any property of
        the form is changed. And also you can use <Code>getInitial</Code> method to get the
        initial value of any property.
      </Typography>

      <Highlighter code={base2} />

      <Typography component="p">
        And it's even more useful, when the form is pre-filled.
      </Typography>

      <Highlighter code={base3} />
    </PageBlock>

    <PageBlock
      title="Arrays of primitives"
      description={(
        <>
          <Typography component="p">
            Observing arrays of primitives may be useful, for example, if you have fields with
            multi choice, or an extendable list of items.
          </Typography>

          <Typography component="p">
            If you want to observe an array of primitive values you can
            use <Code>@watch.array</Code> decorator. And now, even if you pass <b>new</b> array
            with exact same content, the schema will understand, that it is not changed.
          </Typography>
        </>
      )}
    >
      <Highlighter code={watchArray} />
    </PageBlock>

    <PageBlock
      title="Sets of primitives"
      description={(
        <>
          <Typography component="p">
            Observing sets may be as useful as observing arrays. But with a little difference.
            Sometimes the order of items in the list doesn't matter. In such scenarios, it's
            better to use sets instead of arrays.
          </Typography>

          <Typography component="p">
            If you want to observe a set of primitive values you can
            use <Code>@watch.set</Code> decorator. And now, even if you pass <b>new</b> set
            with exact same content, the schema will understand, that it is not changed.
          </Typography>
        </>
      )}
    >
      <Highlighter code={watchSet} />
    </PageBlock>

    <PageBlock
      title="Nested schemas"
      description={(
        <>
          <Typography component="p">
            If you form start becoming too big, you may decide to create a logical block of
            data inside your schema. But if you use a simple object to do that, you'll lose
            all possible features, that schema provides, such as validation or observation.
            But if you use nested schema, all these features will be available.
          </Typography>

          <Typography component="p">
            In this case you can use <Code>@watch.schema</Code> decorator. And now, even if you
            pass <b>new</b> array with exact same content, the schema will understand, that it
            is not changed.
          </Typography>
        </>
      )}
    >
      <Highlighter code={watchSchema} />

      <Typography component="p">
        Also, with nested schemas you can reset only the nested schema instead of resetting
        the entire schema. For example, if you have a CV form and a block for the contacts
        there is a nested schema, you can add an opportunity to reset just the contacts block.
        You can see the example of it
        <TextLink
          href="https://github.com/Yoskutik/mobx-form-schema/blob/master/examples/src/examples/Example6/Example6.tsx"
          text="here"
        />.
      </Typography>
    </PageBlock>

    <PageBlock
      title="Arrays of nested schemas"
      description={(
        <Typography component="p">
          For the same reasons why it is useful to use nested schemas, it can be use to use
          arrays of nested schemas. But to do that, you have to apply the other decorator
          - <Code>@watch.schemasArray</Code>. And you guessed right, even if you
          pass <b>new</b> array with exact same content, schema will understand, that it is
          not changed.
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

      <Typography component="p">
        <Code>watch.configure</Code> function receives 3 arguments. The first one tells how the
        value must be compared with the initial version. The second one tells how the value
        must be save into the initial state. And the third one tells how to reset the value
        from the initial state. Usually, you have make a copy of your object in the second and
        third functions, to avoid changes in the initial state, when updating the current state.
      </Typography>
    </PageBlock>

    <PageBlock
      title="Reset and syncronization"
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

    <PageBlock
      title="Manual observation"
      description={(
        <Typography component="p">
          By default, all the observation applied automatically using <Code>autorun</Code> function
          from MobX. But if you want to turn off such behaviour, you have to set the configuration
          of your form.
        </Typography>
      )}
    >
      <Highlighter code={manual} />
    </PageBlock>
  </PageBlock>
);
