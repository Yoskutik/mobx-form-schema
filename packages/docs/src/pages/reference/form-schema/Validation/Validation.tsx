import { Alert, Code, EntireExample, Highlighter, Section, Text } from '@components';
import ErrorsSource from 'source-loader!./Errors';
import IsValidSource from 'source-loader!./IsValid';
import ManualPropertySource from 'source-loader!./ManualProperty';
import ManualSource from 'source-loader!./Manual';
import styles from '../../Reference.module.scss';

const Validation = () => (
  <>
    <Section title="Form Schema's validity getters">
      <Section title={<>Getter <Code>isValid</Code></>}>
        <Text>
          Getter <Code>isValid</Code> tells whether the entire schema is valid or not.
        </Text>

        <Alert>
          If you don&apos;t use the <Code>@validate</Code> decorator, the <Code>isValid</Code> value
          will not be updated.
        </Alert>

        <Text>
          API reference:
        </Text>

        <Highlighter
          className={styles.referenceHighlighter}
          code="public get isValid(): boolean;"
        />

        <Section title="Example">
          <EntireExample items={[IsValidSource]} />
        </Section>
      </Section>

      <Section title={<>Getter <Code>errors</Code></>}>
        <Text>
          Getter <Code>errors</Code> returns all the errors in a schema. The <Code>errors</Code> getter
          returns an object whose keys have the same names as the properties. The value of the returned
          object can be a string or a boolean. If the property is valid, there won&apos;t be such a
          key in the object. If the property is not valid, the <Code>errors</Code> object will return
          the error from its validation rules.
        </Text>

        <Alert>
          If you don&apos;t use the <Code>@validate</Code> decorator, the <Code>errors</Code> value
          will not be updated.
        </Alert>

        <Text>
          API reference:
        </Text>

        <Highlighter
          code="public get errors(): ExcludedFormSchemaKeyToValue<this, string | true>;"
          className={styles.referenceHighlighter}
        />

        <Section title="Example">
          <EntireExample items={[ErrorsSource]} />
        </Section>
      </Section>
    </Section>

    <Section title="Form Schema's validity methods">
      <Section title={<><Code>updateIsPropertyValid</Code> method</>}>
        <Text>
          The <Code>updateIsPropertyValid</Code> method is used to calculate and update a property&apos;s
          validation in manual mode. If you didn&apos;t create your schema in manual mode, you
          don&apos;t have to call it. After you call this function, the <Code>errors</Code> object
          is updated for a desired property, as is the <Code>isValid</Code> getter.
        </Text>

        <Alert>
          Even though <Code>updateIsPropertyValid</Code> method should work in manual mode, you still have
          to make your properties observable by using the <Code>@watch</Code> decorator or
          the <Code>makeObservable</Code> function from the MobX package.
        </Alert>

        <Text>
          API reference:
        </Text>

        <Highlighter
          code="public updateIsPropertyValid(propertyName: keyof ExcludeFormSchema<this>): string | boolean;"
          className={styles.referenceHighlighter}
        />

        <Section title="Example">
          <EntireExample items={[ManualPropertySource]} />
        </Section>
      </Section>

      <Section title={<><Code>updateIsValidAll</Code> method</>}>
        <Text>
          The <Code>updateIsValidAll</Code> method is used to calculate and update the entire schema&apos;s
          validation in the manual mode. If you didn&apos;t create your schema in manual mode, you
          don&apos;t have to call it. After you call this function, the <Code>errors</Code> and
          the <Code>isValid</Code> values will be updated.
        </Text>

        <Alert>
          Even though <Code>updateIsValidAll</Code> method should work in manual mode, you still have to
          make your properties observable by using the <Code>@watch</Code> decorator or
          the <Code>makeObservable</Code> function from the MobX package.
        </Alert>

        <Text>
          API reference:
        </Text>

        <Highlighter
          code="public updateIsValidAll(): string | boolean;"
          className={styles.referenceHighlighter}
        />

        <Section title="Example">
          <EntireExample items={[ManualSource]} />
        </Section>
      </Section>
    </Section>
  </>
);

export default Validation;
