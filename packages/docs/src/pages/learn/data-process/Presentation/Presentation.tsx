import { Text, Section, EntireExample, Code, Link } from '@components';
import BasicSchemaSource from 'source-loader!./BasicSchema';
import BasicExampleSource from 'source-loader!./BasicExample';
import HiddenSchemaSource from 'source-loader!./HiddenSchema';
import HiddenExampleSource from 'source-loader!./HiddenExample';
import styles from '../../Learn.module.scss';
import { BasicExample } from './BasicExample';
import { HiddenExample } from './HiddenExample';

const Presentation = () => (
  <>
    <Section title="Form data post-process: Presentation">
      <Text>
        The last thing left to be learned is the form data presentation. You can process the data in a form
        schema before sending it to the backend.
      </Text>

      <Text>
        If you want to change the presentation of a specific property, you have to use
        the <Code>@presentation</Code> decorator. Then, you have to use
        the <Code>presentation</Code> getter from the form schema in order to get post-processed
        data.
      </Text>

      <Text>
        In the example below 2 values are post-processed: the <i>&quot;name&quot;</i> and <i>&quot;title&quot;</i>.
        You try entering and deleting data in fields to see how the presentation changes.
      </Text>

      <EntireExample items={[BasicSchemaSource, BasicExampleSource]}>
        <BasicExample />
      </EntireExample>

      <Section title="Deleting data from presentation">
        <Text>
          You can also delete some properties from the presentation. For example, in the article {' '}
          <Link to="/learn/observation/modifiers" className={styles.link}>
            &quot;Form observation with non-primitive values&quot;
          </Link>,
          there is an example of using an array of nested schemas. And we created an extra <Code>id</Code> property
          in order to simplify the use of React. This property is only needed for React, and should not be sent to
          the backend. And if you have such properties, you can easily cut them of the presentation.
        </Text>

        <Text>
          To do it, you can use the <Code>@presentation.hidden</Code> decorator.
        </Text>

        <EntireExample items={[HiddenSchemaSource, HiddenExampleSource]}>
          <HiddenExample />
        </EntireExample>
      </Section>
    </Section>

    <Section title="Next" forcedLevel={3}>
      You&apos;ll see a complete example of using MobX Form Schema.
    </Section>
  </>
);

// eslint-disable-next-line import/no-default-export
export default Presentation;
