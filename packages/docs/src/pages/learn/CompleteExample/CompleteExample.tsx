import { Text, Section, Code, EntireExample, Link } from '@components';
import NestedSchemaIntroduceSchemaSource from 'source-loader!./NestedSchemaIntroduceSchema';
import NestedSchemasArrayIntroduceSchemaSource from 'source-loader!./NestedSchemasArrayIntroduceSchema';
import CVSchemaSource from 'source-loader!./CVSchema';
import ContactsSchemaSource from 'source-loader!./ContactsSchema';
import ExperienceSchemaSource from 'source-loader!./ExperienceSchema';
import validatorsSource from 'source-loader!./validators';
import CVExampleSource from 'source-loader!./CVExample';
import CVExampleInformerSource from 'source-loader!./CVExampleInformer';
import ExperienceBlockSource from 'source-loader!./ExperienceBlock';
import styles from '../Learn.module.scss';
import { CVExample } from './CVExample';

const CompleteExample = () => (
  <Section title="A complete example of MobX Form Schema">
    <Text>
      This is a complete example of all the MobX Form Schema features. Here you can see the usage
      of all the decorators.
    </Text>

    <Text>
      But before the diving, we want to introduce 2 extra small decorators:
      the <Code>@nestedSchema</Code> and the <Code>@nestedSchemasArray</Code> decorators.
      All they do is replace several decorators with a single one.
    </Text>

    <EntireExample items={[NestedSchemaIntroduceSchemaSource, NestedSchemasArrayIntroduceSchemaSource]} />

    <Section title="And now you are completely ready!">
      <Text>
        Let&apos;s create a form for a CV. It must have all the validation, and there must be an opportunity
        to save the state of the form. Since, we won&apos;t use a backend, the state will be saved in session
        storage. Also, there must be a way to restore data from the storage.
      </Text>

      <Text>
        Besides, for your convenience, we uploaded this code into several sandboxes, so if you want to play
        with it, you can visit {' '}
        <Link to="https://codesandbox.io/s/silent-morning-68myz9?file=/src/index.tsx" className={styles.link}>
          CodeSandbox.io
        </Link> or {' '}
        <Link
          to="https://stackblitz.com/edit/stackblitz-starters-g7hrxn?file=src%2Findex.tsx"
          className={styles.link}
        >
          StackBlitz.com
        </Link>.
      </Text>

      <EntireExample
        items={[
          CVSchemaSource,
          ContactsSchemaSource,
          ExperienceSchemaSource,
          validatorsSource,
          CVExampleSource,
          CVExampleInformerSource,
          ExperienceBlockSource,
        ]}
        height={600}
      />

      <CVExample />
    </Section>
  </Section>
);

// eslint-disable-next-line import/no-default-export
export default CompleteExample;
