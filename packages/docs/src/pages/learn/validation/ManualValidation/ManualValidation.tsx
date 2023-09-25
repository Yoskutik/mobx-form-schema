import { Text, Section, Code, EntireExample, Alert } from '@components';
import ManualExampleSource from 'source-loader!./ManualExample';
import { ManualExample } from './ManualExample';

const ManualValidation = () => (
  <>
    <Section title="Manual validation">
      <Text>
        Usually, validation rules are atomic, and even if they are called repeatedly after each change
        in an input field, any computational load is not noticeable. But if you have some computationally
        expensive validation or any other reason to start validating your properties manually,
        this article will describe how to do it.
      </Text>

      <Alert>
        Be aware that even in the manual mode your properties must be observable!
      </Alert>

      <Text>
        To start validate your schema manually you must create it in manual mode. To do it simply
        pass <Code>true</Code> as second argument to <Code>create</Code> static method.
      </Text>

      <EntireExample
        items={[
          {
            filename: 'ManualExample.ts',
            code: 'const schema = ConditionalSchema.create({}, true);',
          },
        ]}
      />

      <Text>
        And then, to validate a property, you can call the <Code>updateIsPropertyValid</Code> method and
        pass the name of a property. This method will update the <Code>errors</Code> object and return an
        error for the specified field or <Code>false</Code> if validation is passed.
      </Text>

      <Text>
        Alternatively, you can call the <Code>updateIsValidAll</Code> method to validate all the properties
        in a schema. This method updates the <Code>errors</Code> object as well.
      </Text>

      <EntireExample items={[ManualExampleSource]}>
        <ManualExample />
      </EntireExample>
    </Section>

    <Section title="Next" forcedLevel={3}>
      <Text>
        You&apos;ll find out how can you observe form changes.
      </Text>
    </Section>
  </>
);

// eslint-disable-next-line import/no-default-export
export default ManualValidation;
