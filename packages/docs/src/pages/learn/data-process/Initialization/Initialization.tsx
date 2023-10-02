import { Text, Section, EntireExample, Code, List } from '@components';
import BasicSchemaSource from 'source-loader!./BasicSchema';
import BasicExampleSource from 'source-loader!./BasicExample';
import FactoryBasicExampleSource from 'source-loader!./FactoryBasicExample';
import ModifiersSchemaSource from 'source-loader!./ModifiersSchema';
import ModifiersExampleSource from 'source-loader!./ModifiersExample';
import ComplexSchemaSource from 'source-loader!./ComplexSchema';
import ComplexExampleSource from 'source-loader!./ComplexExample';
import { BasicExample } from './BasicExample';
import { FactoryBasicExample } from './FactoryBasicExample';
import { ModifiersExample } from './ModifiersExample';
import { ComplexExample } from './ComplexExample';

const Initialization = () => (
  <>
    <Section title="Form data pre-process: Initialization">
      <Text>
        As you may have noticed earlier, with MobX Form Schema, you can not only describe your forms with
        schemas but also fill in these schemas with some data. In order to do it, you have to pass an
        object into the <Code>create</Code> static method.
      </Text>

      <Text>
        Look at the example below. By default, this schema&apos;s values are undefined, and they must be
        defined only by the API response. You emulate an API request by
        clicking <i>&quot;Get data&quot;</i> button.
      </Text>

      <EntireExample items={[BasicSchemaSource, BasicExampleSource]}>
        <BasicExample />
      </EntireExample>

      <Section title="Data pre-process">
        <Text>
          But here&apos;s a problem: you cannot get the <Code>Set</Code> or the <Code>Date</Code> objects
          from an API request because of the JSON syntax. And usually, developers somehow pre-process the
          received data before using it. But MobX Form Schema can simplify this process with
          the <Code>@factory</Code> decorator.
        </Text>

        <Text>
          With MobX Form Schema, you can use the <Code>@factory</Code> decorator if you want to pre-process
          a specific property in a schema.
        </Text>

        <Text>
          In the example below, the API response mock is the same as it would be on the real backend. And
          you can see that even though we&apos;ve specified that the type of the <i>&quot;set&quot;</i> property
          is <Code>Date</Code>, the real value is actually an array, because the schema receives an array
          from the mocked API request. But if we switch to using <Code>FactoryBasicSchema</Code> instead
          of <Code>BasicSchema</Code> everything will start to work as intended.
        </Text>

        <EntireExample items={[FactoryBasicExampleSource, BasicSchemaSource, BasicExampleSource]}>
          <FactoryBasicExample />
        </EntireExample>
      </Section>

      <Section title="Factory decorators modifiers">
        <Text>
          Like in the <Code>@watch</Code> decorator, <Code>@factory</Code> also has a few modifiers to
          simplify the process of development. You can use:
        </Text>

        <List>
          <li><Code>@factory.set</Code> in order to create <Code>Set</Code>;</li>
          <li><Code>@factory.schema</Code> in order to create nested form schema;</li>
          <li><Code>@factory.schemasArray</Code> in order to create array of nested form schemas;</li>
        </List>

        <Text>
          As you see in the example below, a mocked API request returns only plain objects, arrays or numbers.
          But because of the <Code>@factory</Code> decorator, they convert into data of the needed types.
        </Text>

        <EntireExample items={[ModifiersSchemaSource, ModifiersExampleSource]}>
          <ModifiersExample />
        </EntireExample>
      </Section>

      <Section title="Complex factory functions">
        <Text>
          A function passed into the <Code>@factory</Code> decorator receives 2 arguments:
        </Text>

        <List variant="ol">
          <li>A property&apos;s value before pre-processing;</li>
          <li>An object passed into the <Code>create</Code> static method;</li>
          <li>A form schema object;</li>
          <li>A default value for a property (the one that is declared in a class).</li>
        </List>

        <Text>
          So, if some of your properties must be initialized using a few other properties from the schema,
          you can use this second argument.
        </Text>

        <EntireExample items={[ComplexSchemaSource, ComplexExampleSource]}>
          <ComplexExample />
        </EntireExample>
      </Section>
    </Section>

    <Section title="Next" forcedLevel={3}>
      <Text>
        In this section, you saw how to observe primitive data. In the next article, you&apos;ll find out how
        to configure your form schema in order to use arrays, sets or nested schemas.
      </Text>
    </Section>
  </>
);

export default Initialization;
