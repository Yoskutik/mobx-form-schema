import { Text, Section, Code, EntireExample } from '@components';
import ManualExampleSource from 'source-loader!./ManualExample';
import { ManualExample } from './ManualExample';

const ManualObservation = () => (
  <>
    <Section title="Manual form changes check">
      <Text>
        Just like with validation, you can stop checking your form changes automatically and make these
        checks manually. On order to do it, you just have to create the schema in the manual mode.
      </Text>

      <EntireExample
        items={[
          {
            filename: 'ManualExample.ts',
            code: 'const schema = BasicSchema.create({}, true);',
          },
        ]}
      />

      <Text>
        And then, to make a check for a property, you can call the <Code>updateIsPropertyChanged</Code> method
        and pass the name of the property. This method will update the <Code>changedProperties</Code> set
        and return a boolean, which tells if the property is different from the initial state.
      </Text>

      <Text>
        Alternatively, you can call the <Code>updateIsChangedAny</Code> method to check the schema
        entirely. This method updates the <Code>changedProperties</Code> set as well.
      </Text>

      <EntireExample items={[ManualExampleSource]}>
        <ManualExample />
      </EntireExample>
    </Section>

    <Section title="Next" forcedLevel={3}>
      <Text>
        Read about how you can create form schemas with the data from the backend and how you can simplify
        your communication with the backend in the next articles.
      </Text>
    </Section>
  </>
);

// eslint-disable-next-line import/no-default-export
export default ManualObservation;
