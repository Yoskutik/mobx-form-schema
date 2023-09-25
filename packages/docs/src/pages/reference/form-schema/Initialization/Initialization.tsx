import { Code, EntireExample, Highlighter, List, Section, Text, Title } from '@components';
import CreateSource from 'source-loader!./Create';
import OnInitSource from 'source-loader!./OnInit';
import styles from '../../Reference.module.scss';

const Initialization = () => (
  <>
    <Section title={<>Static <Code>create</Code> method</>}>
      <Text>
        <Code>FormSchema.create</Code> method is used to create an instance of FormSchema. You should only
        create your schemas with <Code>FormSchema.create</Code> and never with the <Code>new</Code> keyword.
        Otherwise, your schemas may start working incorrectly.
      </Text>

      <Text>
        API reference:
      </Text>

      <Highlighter
        code="static create<T extends FormSchema>(data?: TFactoryData<T>, isManual?: boolean): T;"
        className={styles.referenceHighlighter}
      />

      <Text>
        <Code>FormSchema.create</Code> method receives 2 arguments:
      </Text>

      <List variant="ol">
        <li><Code>data</Code>: used to initialize the schema with initial values;</li>
        <li>
          <Code>isManual</Code>: must be used if you want to validate and check changes of your
          form manually.
        </li>
      </List>

      <Text>
        The <Code>data</Code> argument must have the same keys as FormSchema. If you don&apos;t use
        the <Code>@factory</Code> decorator, values from the <Code>data</Code> object will be applied
        to the schemas by their names.
      </Text>

      <Text>
        If <Code>data</Code> is not passed, is empty, or there&apos;s no value for a specific property in
        a schema, such a property will use a default value from the schema declaration.
      </Text>

      <Text>
        In the <Code>create</Code> static method schemas:
      </Text>

      <List>
        <li>
          All the methods and getters receive their decorators from MobX (e.g. <Code>observable</Code>, {' '}
          <Code>computed</Code> or <Code>action</Code>).
        </li>
        <li>
          Schema initializes with data from the <Code>data</Code> object.
        </li>
        <li>
          Schema creates reactions for automatic validation (if schema is not created in manual mode).
        </li>
        <li>
          Schema saves its initial value (if the <Code>watch</Code> decorator was used). And creates
          reactions for automatic change observation (if the schema is not created in manual mode).
        </li>
      </List>

      <Section title="Example">
        <EntireExample items={[CreateSource]} />
      </Section>
    </Section>

    <Section title={<><Code>onInit</Code> method</>}>
      <Text>
        All the logic that is applied in the <Code>create</Code> static method is applied after the
        schema&apos;s constructor is called. Which means that you cannot apply some reaction
        for the utility getters, like <Code>errors</Code> or <Code>changedProperties</Code>. Also,
        if you use the <Code>@watch</Code> decorator, your properties won&apos;t be observable in
        the constructor.
      </Text>

      <Text>
        But you can use the <Code>onInit</Code> protected method. This method is called right after
        the static <Code>create</Code> method is finished.
      </Text>

      <Text>
        API reference:
      </Text>

      <Highlighter
        className={styles.referenceHighlighter}
        code="protected onInit(): void;"
      />

      <Section title="Example">
        <EntireExample items={[OnInitSource]} />
      </Section>
    </Section>
  </>
);

export default Initialization;
