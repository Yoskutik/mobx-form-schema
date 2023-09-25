import { Alert, Code, EntireExample, Highlighter, Section, Text } from '@components';
import IsChangedSource from 'source-loader!./IsChanged';
import ChangedPropertiesSource from 'source-loader!./ChangedProperties';
import GetInitialSource from 'source-loader!./GetInitial';
import SyncSource from 'source-loader!./Sync';
import ResetSource from 'source-loader!./Reset';
import ManualPropertySource from 'source-loader!./ManualProperty';
import ManualSource from 'source-loader!./Manual';
import styles from '../../Reference.module.scss';

const Observation = () => (
  <>
    <Section title="Form Schema changes observation getters">
      <Section title={<>Getter <Code>isChanged</Code></>}>
        <Text>
          Getter <Code>isChanged</Code> tells whether the entire schema is different from the initial
          state or not.
        </Text>

        <Alert>
          If you don&apos;t use the <Code>@watch</Code> decorator, the <Code>isChanged</Code> value
          will not be updated.
        </Alert>

        <Text>
          API reference:
        </Text>

        <Highlighter
          className={styles.referenceHighlighter}
          code="public get isChanged(): boolean;"
        />

        <Section title="Example">
          <EntireExample items={[IsChangedSource]} />
        </Section>
      </Section>

      <Section title={<>Getter <Code>changedProperties</Code></>}>
        <Text>
          Getter <Code>changedProperties</Code> returns the set of properties names which values are
          different from the initial state.
        </Text>

        <Alert>
          If you don&apos;t use the <Code>@watch</Code> decorator, the <Code>changedProperties</Code> value
          will not be updated.
        </Alert>

        <Text>
          API reference:
        </Text>

        <Highlighter
          code="public get changedProperties(): Set<keyof ExcludeFormSchema<this>>;"
          className={styles.referenceHighlighter}
        />

        <Section title="Example">
          <EntireExample items={[ChangedPropertiesSource]} />
        </Section>
      </Section>
    </Section>

    <Section title="Form Schema changes observation methods">
      <Section title={<>Method <Code>getInitial</Code></>}>
        <Text>
          The <Code>getInitial</Code> method receives a name of a property and returns its value from
          the initial state.
        </Text>

        <Text>
          API reference:
        </Text>

        <Highlighter
          code="public getInitial(field: keyof ExcludeFormSchema<this>): this[typeof field];"
          className={styles.referenceHighlighter}
        />

        <Section title="Example">
          <EntireExample items={[GetInitialSource]} />
        </Section>
      </Section>

      <Section title={<>Method <Code>sync</Code></>}>
        <Text>
          The <Code>sync</Code> method saves the current state of schema as initial.
        </Text>

        <Text>
          API reference:
        </Text>

        <Highlighter
          className={styles.referenceHighlighter}
          code="public sync(): void;"
        />

        <Section title="Example">
          <EntireExample items={[SyncSource]} />
        </Section>
      </Section>

      <Section title={<>Method <Code>reset</Code></>}>
        <Text>
          The <Code>reset</Code> method restore schema into the initial state.
        </Text>

        <Text>
          API reference:
        </Text>

        <Highlighter
          className={styles.referenceHighlighter}
          code="public reset(): void;"
        />

        <Section title="Example">
          <EntireExample items={[ResetSource]} />
        </Section>
      </Section>

      <Section title={<>Method <Code>updateIsPropertyChanged</Code></>}>
        <Text>
          The <Code>updateIsPropertyChanged</Code> method is used to calculate if the desired property is
          different from the initial state and update the <Code>changedProperties</Code> and
          the <Code>isChanged</Code> values in manual mode.
        </Text>

        <Alert>
          Even though the <Code>updateIsPropertyChanged</Code> method should work in manual mode, you still
          have to make your properties observable by using the <Code>@watch</Code> decorator or its modifiers.
        </Alert>

        <Text>
          API reference:
        </Text>

        <Highlighter
          code="public updateIsPropertyChanged(propertyName: keyof ExcludeFormSchema<this>): boolean;"
          className={styles.referenceHighlighter}
        />

        <Section title="Example">
          <EntireExample items={[ManualPropertySource]} />
        </Section>
      </Section>

      <Section title={<>Method <Code>updateIsChangedAny</Code></>}>
        <Text>
          The <Code>updateIsChangedAny</Code> method is used to calculate all the changes in the schema
          and update the <Code>changedProperties</Code> and the <Code>isChanged</Code> values in manual mode.
        </Text>

        <Alert>
          Even though the <Code>updateIsChangedAny</Code> method should work in manual mode, you still have
          to make your properties observable by using the <Code>@watch</Code> decorator or its modifiers.
        </Alert>

        <Text>
          API reference:
        </Text>

        <Highlighter
          code="public updateIsChangedAny(): boolean;"
          className={styles.referenceHighlighter}
        />

        <Section title="Example">
          <EntireExample items={[ManualSource]} />
        </Section>
      </Section>
    </Section>
  </>
);

export default Observation;
