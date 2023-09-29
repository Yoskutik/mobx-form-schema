import { Code, EntireExample, Highlighter, List, Section, Text } from '@components';
import WatchSchemaSource from 'source-loader!./WatchSchema';
import WatchArraySchemaSource from 'source-loader!./WatchArraySchema';
import WatchSetSchemaSource from 'source-loader!./WatchSetSchema';
import WatchNestedSchemaSource from 'source-loader!./WatchNestedSchema';
import WatchNestedSchemasArraySource from 'source-loader!./WatchNestedSchemasArray';
import configureSource from 'source-loader!./configure';
import ConfigureSchemaSource from 'source-loader!./ConfigureSchema';
import styles from '@pages/reference/Reference.module.scss';

const Watch = () => (
  <>
    <Section title={<>The <Code>@watch</Code> decorator</>}>
      <Text>
        With the <Code>@watch</Code> decorator, you can understand whether your form&apos;s current
        state is different from the initial one. After you use this decorator, you can use
        the <Code>isChanged</Code> in order to understand if the entire form is changed and
        the <Code>changedProperties</Code> set in order to determine which properties are changed.
      </Text>

      <Text>
        If you use <Code>@watch</Code> decorator on a property, MobX Form Schema will mark this
        property with <Code>observable.ref</Code> decorator. But if you need any other type of
        observation, you can use the <Code>makeObservable</Code> function from MobX and pass
        the object with properties observation declaration or use MobX&apos; decorators.
      </Text>

      <Text>
        With the <Code>watch</Code> decorators, values are checked with their reference
        (using <Code>===</Code> comparison). And because of that, the <Code>@watch</Code> decorator
        should be mostly used with primitive values.
      </Text>

      <Section title="Example of usage">
        <EntireExample items={[WatchSchemaSource]} />
      </Section>
    </Section>

    <Section title={<>The <Code>@watch.array</Code> decorator</>}>
      <Text>
        The <Code>@watch.array</Code> is a modification of the <Code>@watch</Code> decorator, which
        must be used with arrays.
      </Text>

      <Text>
        If you use <Code>@watch.array</Code> decorator on a property, MobX Form Schema will mark this
        property with <Code>observable.shallow</Code> decorator, but you can freely overwrite it.
      </Text>

      <Text>
        With the <Code>watch.arrays</Code>, values are shallowly compared, which means that every
        item from the current is compared by reference with the value from the initial state. But if
        arrays have different lengths, they are automatically considered to be changed.
      </Text>

      <Section title="Example of usage">
        <EntireExample items={[WatchArraySchemaSource]} />
      </Section>
    </Section>

    <Section title={<>The <Code>@watch.set</Code> decorator</>}>
      <Text>
        The <Code>@watch.set</Code> is a modification of the <Code>@watch</Code> decorator, which
        must be used with sets.
      </Text>

      <Text>
        If you use <Code>@watch.set</Code> decorator on a property, MobX Form Schema will mark this
        property with <Code>observable.shallow</Code> decorator, but you can freely overwrite it.
      </Text>

      <Text>
        With the <Code>watch.set</Code>, values are shallowly compared, which means that every item
        from the current is compared. But if sets have different sizes, they automatically considered
        to be changed.
      </Text>

      <Section title="Example of usage">
        <EntireExample items={[WatchSetSchemaSource]} />
      </Section>
    </Section>

    <Section title={<>The <Code>@watch.schema</Code> decorator</>}>
      <Text>
        The <Code>@watch.schema</Code> is a modification of the <Code>@watch</Code> decorator, which
        must be used with nested form schemas.
      </Text>

      <Text>
        If you use <Code>@watch.schema</Code> decorator on a property, MobX Form Schema will mark this
        property with <Code>observable.ref</Code> decorator, but you can freely overwrite it.
      </Text>

      <Text>
        The <Code>watch.schema</Code> comparison is a bit complex:
      </Text>

      <List>
        <li>
          If a nested schema is changed, then the main schema is considered to be changed as well.
        </li>
        <li>
          If a new instance of nested a schema replaces an old one, but it has exact the same initial state
          and it&apos;s not changed, then the main schema is considered to be not changed. Otherwise, the
          main schema is considered to be changed.
        </li>
      </List>

      <Section title="Example of usage">
        <EntireExample items={[WatchNestedSchemaSource]} />
      </Section>
    </Section>

    <Section title={<>The <Code>@watch.schemasArray</Code> decorator</>}>
      <Text>
        The <Code>@watch.schemasArray</Code> is a modification of the <Code>@watch</Code> decorator, which
        must be used with an array of nested form schemas of the same class.
      </Text>

      <Text>
        If you use <Code>@watch.schemasArray</Code> decorator on a property, MobX Form Schema will mark this
        property with <Code>observable.shallow</Code> decorator, but you can freely overwrite it.
      </Text>

      <Text>
        The <Code>watch.schemasArray</Code> comparison is a mix of the <Code>watch.array</Code> and
        the <Code>watch.schema</Code> comparisons. If arrays have the same length, each schema is compared
        with the <Code>watch.schema</Code> comparison. And if all of them is considered not to be changed,
        then the main schema is also considered not to be changed.
      </Text>

      <Section title="Example of usage">
        <EntireExample items={[WatchNestedSchemasArraySource]} />
      </Section>
    </Section>

    <Section title={<>The <Code>watch.create</Code> method</>}>
      <Text>
        The <Code>watch.create</Code> allows you to create your own modification
        of <Code>watch</Code> decorator. You only have to pass 3 functions:
      </Text>

      <List variant="ol">
        <li>a function that compares values from the current state and the initial one;</li>
        <li>a function that saves the current state into the initial one;</li>
        <li>a function that restores the value from the initial state.</li>
      </List>

      <Highlighter
        className={styles.referenceHighlighter}
        code={configureSource.code}
      />

      <Text>
        The <Code>watch.create</Code> method creates a separate decorator.
      </Text>

      <Text>
        If you use the decorator created by the <Code>watch.create</Code> on a property, MobX Form Schema
        will mark this property with <Code>observable</Code> decorator, but you can freely overwrite it.
      </Text>

      <Section title="Example of usage">
        <EntireExample items={[ConfigureSchemaSource]} />
      </Section>
    </Section>
  </>
);

export default Watch;
