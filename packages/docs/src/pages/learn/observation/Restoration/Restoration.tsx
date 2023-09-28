import { Text, Section, Code, EntireExample } from '@components';
import BasicSchemaSource from 'source-loader!./BasicSchema';
import BasicExampleSource from 'source-loader!./BasicExample';
import { BasicExample } from './BasicExample';

const Restoration = () => (
  <>
    <Section title="Resetting form into the initial state">
      <Text>
        It may be useful to ba able to reset the current state of the form into the initial one. For
        example, usually, those form that&apos;s developed to edit some data, can be restored into
        the initial state.
      </Text>

      <Text>
        If you use the <Code>@watch</Code> decorator, schema has to remember initial state of the
        desired property. And since, it knows the initial state, there is no problems in the ability
        of resetting current form state into the initial one.
      </Text>

      <Text>
        Each schema has the <Code>reset</Code> method. You can the example of using it in
        the <i>&quot;Example of usage&quot;</i> section.
      </Text>

      <Section title="Saving initial state as current">
        <Text>
          Also, you can save the initial state of the schema as current. After you do that, resetting
          schema will lead to restoring last saved state.
        </Text>

        <Text>
          To do that, you have to use the <Code>sync</Code> method.
        </Text>
      </Section>

      <Section title="Example of usage">
        <EntireExample items={[BasicSchemaSource, BasicExampleSource]}>
          <BasicExample />
        </EntireExample>
      </Section>
    </Section>

    <Section title="Next" forcedLevel={3}>
      <Text>
        Just like with validation, there is a manual mode for checking form changes. Read about it
        in the next article.
      </Text>
    </Section>
  </>
);

// eslint-disable-next-line import/no-default-export
export default Restoration;
