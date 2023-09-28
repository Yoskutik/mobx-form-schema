import { Text, Section, Code, List, EntireExample } from '@components';
import CustomSchemaSource from 'source-loader!./CustomSchema';
import CustomExampleSource from 'source-loader!./CustomExample';
import { CustomExample } from './CustomExample';

const CustomObservation = () => (
  <>
    <Section title="Custom form changes observation">
      <Text>
        The out-of-box <Code>@watch</Code>cover most possible needs, but they are limited. You can only
        compare primitives, arrays of primitives, sets of primitives, form schemas and arrays of form
        schemas. And in order to provide you with an opportunity to create your own comparison function,
        MobX Form Schema created the <Code>watch.configure</Code> method.
      </Text>

      <Text>
        The <Code>watch.configure</Code> takes 3 arguments:
      </Text>

      <List variant="ol">
        <li>
          A comparison function.
        </li>
        <li>
          A function to save values to the form schema&apos;s initial state. Usually it has to be a copy
          of an object to prevent changes in the initial state.
        </li>
        <li>
          A function to save value to restore a property&apos;s value from the initial state.
        </li>
      </List>

      <Text>
        The <Code>watch.configure</Code> returns a function, that can be used as a decorator.
      </Text>

      <Section title="Example of custom observation">
        <Text>
          Let&apos;s assume we have a need for an array of two values. And we want to observe only the
          1<sup>st</sup> value. If the 2<sup>nd</sup> value is changed, the form schema must not react
          to that.
        </Text>

        <EntireExample items={[CustomSchemaSource, CustomExampleSource]}>
          <CustomExample />
        </EntireExample>
      </Section>
    </Section>

    <Section title="Next" forcedLevel={3}>
      <Text>
        You already saw, that you can temporary save your forms and restore them into the last saved
        or initial state. Read more about this functionality further.
      </Text>
    </Section>
  </>
);

// eslint-disable-next-line import/no-default-export
export default CustomObservation;
