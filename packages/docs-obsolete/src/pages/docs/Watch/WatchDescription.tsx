import { ReactNode } from 'react';
import { Typography } from '@mui/material';
import { Code, Highlighter, PageBlock, TextLink } from '@components';
import watch from './watch.example';
import watchArray from './watch.array.example';
import watchSet from './watch.set.example';
import watchSchema from './watch.schema.example';
import watchSchemasArray from './watch.schemasArray.example';
import watchConfigure from './watch.configure.example';

type BlockProps = {
  decorator: string;
  linkId: string;
  code: string;
  children: ReactNode;
};

const Block = ({ decorator, code, children, linkId }: BlockProps) => (
  <PageBlock
    title={<Code>@{decorator}</Code>}
    description={(
      <>
        {children}

        <Typography component="p">
          For better understanding see:
          <TextLink text="example" id={`observation.${linkId}`} />.
        </Typography>
      </>
    )}
  >
    <Highlighter code={code} />
  </PageBlock>
)

export const WatchDescription = () => (
  <PageBlock
    title="Watch"
    description={(
      <Typography component="p">
        Applying <Code>@watch</Code> decorator and its modifiers to a property
        enables its observation. The schema saves the initial value of such
        properties, which makes possible to tell whether the property differs
        from the initial state. Also it makes possible to reset the property
        from the current state into initial and mark the current state as the
        initial.
      </Typography>
    )}
  >
    <Block decorator="watch" linkId="basic-usage---primitives" code={watch}>
      <Typography component="p">
        If you want to observe any primitive value, you should use
        the <Code>@watch</Code> decorator. This decorator enables observing your
        property and compares the current value with the initial one with
        reference comparison to understand whether it's changed.
      </Typography>

      <Typography component="p">
        Using <Code>@watch</Code> decorator applies <Code>@observable</Code> decorator
        on the property.
      </Typography>
    </Block>

    <Block decorator="watch.array" linkId="arrays-of-primitives" code={watchArray}>
      <Typography component="p">
        If you want to observe an arrays of primitive values, you should use
        the <Code>@watch.array</Code> decorator.
      </Typography>

      <Typography component="p">
        Using <Code>@watch.array</Code> decorator applies <Code>@observable.shallow</Code> decorator
        on the property. This decorator is supposed to be used on sets of primitive values,
        which means there's no need to use any other types of observation.
      </Typography>
    </Block>

    <Block decorator="watch.set" linkId="sets-of-primitives" code={watchSet}>
      <Typography component="p">
        If you want to observe a set of primitive values, you should use
        the <Code>@watch.set</Code> decorator.
      </Typography>

      <Typography component="p">
        Using <Code>@watch.set</Code> decorator applies <Code>@observable.shallow</Code> decorator
        on the property. This decorator is supposed to be used on sets of primitive values,
        which means there's no need to use any other types of observation.
      </Typography>
    </Block>

    <Block decorator="watch.schema" linkId="nested-schemas" code={watchSchema}>
      <Typography component="p">
        If you want to observe a nested form schema, you should use
        the <Code>@watch.schema</Code> decorator.
      </Typography>

      <Typography component="p">
        Using <Code>@watch.schema</Code> decorator applies <Code>@observable.ref</Code> decorator
        on the property. And it's more preferable to make your nested schema
        observable by it's reference, because nested schema must decide on its own which
        properties should be observable. But if you need, you can set any other decorator.
      </Typography>
    </Block>

    <Block decorator="watch.schemasArray" linkId="arrays-of-nested-schemas" code={watchSchemasArray}>
      <Typography component="p">
        If you want to observe an array of nested form schemas, you should use
        the <Code>@watch.schemasArray</Code> decorator.
      </Typography>

      <Typography component="p">
        Using <Code>@watch.schemasArray</Code> decorator
        applies <Code>@observable.shallow</Code> decorator on the property. And it's more preferable
        to make your nested schema observable by it's reference, because nested schema must decide on
        its own which properties should be observable. But if you need, you can set any other decorator.
      </Typography>
    </Block>

    <PageBlock
      title={<Code>watch.configure</Code>}
      description={(
        <Typography component="p">
          All the existing modifiers of <Code>@watch</Code> decorator must covers almost all of your
          needs. But in case you have to create some extra ordinary rules, you can
          use <Code>watch.configure</Code> function to create your own decorator.
        </Typography>
      )}
    >
      <Highlighter code={watchConfigure} />

      <Typography component="p">
        <Code>watch.configure</Code> function takes 3 paramets - a function, which tells how to compare
        current version of the structure with the previous one; a function which tells how to save
        structure as the initial state; and a function which tells how to restore a structure from
        the initial state.
      </Typography>

      <Typography component="p">
        For better understanding see:
        <TextLink text="example" id="observation.configurable-observation" />.
      </Typography>
    </PageBlock>
  </PageBlock>
);