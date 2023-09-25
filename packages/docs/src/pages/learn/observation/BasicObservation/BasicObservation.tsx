import { Text, Section, EntireExample, Code, List, Alert } from '@components';
import SchemaObservationInfoSource from 'source-loader!../SchemaObservationInfo';
import BasicExampleSource from 'source-loader!./BasicExample';
import BasicSchemaSource from 'source-loader!./BasicSchema';
import SameSchema1Source from 'source-loader!./SameSchema1';
import SameSchema2Source from 'source-loader!./SameSchema2';
import { BasicExample } from './BasicExample';

const BasicObservation = () => (
  <>
    <Section title="Form changes observation">
      <Text>
        Form observation can be very useful. The most basic example is understanding whether your current
        state of the form is different from the initial one, in case you don&apos;t want to send an API request
        and want to disable the submit button.
      </Text>

      <Section title="The power of observation">
        <Text>
          Here&apos;s a full list of features that MobX Form Schema provides:
        </Text>

        <List>
          <li>You can understand whether the form is different from the initial state;</li>
          <li>You can retrieve a list of properties&apos; names that are different from the initial state;</li>
          <li>You can retrieve the property&apos;s value from the initial state;</li>
          <li>You can restore the whole schema into the initial state;</li>
          <li>And also, you can save the current state as the initial one.</li>
        </List>

        <Text>
          To enable form data observation, you have to apply <Code>@watch</Code> decorators to the properties
          you want to observe.
        </Text>

        <Alert>
          <Code>@watch</Code> decorator works well if you observe primitive values, like stings, numbers or
          boolean values. In case you want to observe complex objects, you have to
          use <Code>watch</Code> modifiers, which will be described in the next article.
        </Alert>

        <Text>
          In the short example below, you can see the most basic observation functionality. You try
          clicking <i>&quot;Save&quot;</i> and <i>&quot;Restore&quot;</i> buttons for better understanding
          how does it work.
        </Text>

        <EntireExample items={[BasicSchemaSource, BasicExampleSource, SchemaObservationInfoSource]}>
          <BasicExample />
        </EntireExample>
      </Section>

      <Section title="How does it check changes?">
        <Text>
          Form schema saves the initial state, and after each change in a property, checks whether the new
          property&apos;s value different from the one in the initial state. If you use
          plain <Code>@watch</Code> decorator, there will be reference comparison (via <Code>===</Code> operator).
        </Text>
      </Section>

      <Section title="How does watch decorator make property observable?">
        <Text>
          By default, if you apply <Code>@watch</Code> decorator to a property, it will automatically
          apply <Code>@observable.ref</Code> decorator from MobX. Therefore, in most cases if you use
          <Code>@watch</Code> decorator, you don&apos;t have to use decorators from MobX.
        </Text>

        <Text>
          But you can freely do it. If, for some reason, you have to compare different objects via their
          reference, but these objects have to be decorated with <Code>@observable</Code>, you can do it.
        </Text>

        <EntireExample items={[SameSchema1Source, SameSchema2Source]} />
      </Section>

      <Section title="Should you use watch decorator?">
        <Text>
          As you may have guessed when using it, MobX Form Schema has to save the initial data of the form,
          which means that memory consumption will grow. And also, each time the observed property changes,
          there will be a recalculation to understand whether the current property&apos;s value is different
          from the initial one.
        </Text>

        <Text>
          But in general, those additional computational loads and memory consumption are low because of
          MobX&apos;s and MobX Form Schema&apos;s optimizations. So, you shouldn&apos;t worry about
          using <Code>@watch</Code> decorators, especially if you have a need to observe form data.
        </Text>
      </Section>
    </Section>

    <Section title="Next" forcedLevel={3}>
      <Text>
        In this section you saw how to observe primitive data. In the next article you&apos;ll find out how
        to configure your form schema in order to use arrays, sets or nested schemas.
      </Text>
    </Section>
  </>
);

// eslint-disable-next-line import/no-default-export
export default BasicObservation;
