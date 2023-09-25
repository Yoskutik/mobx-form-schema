import { Text, EntireExample, Code, Section, Link, List } from '@components';
import SignUpSchemaSource from 'source-loader!./SignUpSchema';
import BackendSchemaSource from 'source-loader!@pages/home/BackendExample/BackendSchema';
import BackendExampleSource from 'source-loader!@pages/home/BackendExample/BackendExample';
import { BackendExample } from '@pages/home/BackendExample/BackendExample';
import { SignUpExample } from './SignUpExample';
import styles from '../Learn.module.scss';

const LearnStartPage = () => (
  <>
    <Section title="Learn Mobx Form Schema">
      <Text>
        Welcome to the Mobx Form Schema documentation! Here you&apos;ll get a short introduction
        to what is the MobX Form Schema, when you should use it, and how you can use it.
      </Text>
    </Section>

    <Section title="What is Form Schema?">
      <Text>
        Usually, in the development of web forms, there must be some logic behind them:
      </Text>

      <List>
        <li>
          The most basic example is the need for validation. And it can be quite a task. Especially when
          the validation of one property can depend on the value of another property. Or when it is a
          conditional validation, like the validation of optional fields.
        </li>
        <li>
          Also, sometimes forms must understand if their current state is different from the initial one. Or
          they may have a need to be able to be restored to their initial state.
        </li>
        <li>
          And on top of that, forms must communicate with the backend. And sometimes backend response must be
          pre-processed before being used, or forms content must be processed before being sent to the backend.
        </li>
      </List>

      <Text>
        The bigger your forms become, the bigger those problems grow, and the more difficult their maintenance
        becomes. But MobX Form Schema is ready to fight all of them! This is an extremely tiny library (4KB)
        that provides an opportunity to describe all the logic of a form in a convenient way with the power of
        decorators. And even with massive forms, it is easy to use it.
      </Text>

      <Section title="Validation example">
        <Text>
          In the example below, you can see a simple example of form validation. Each field has several
          validation rules, and each rule must a corresponding error message. Also, you can see that each field
          in a form is a separate property in a form schema. You try to interact with the form by entering data.
        </Text>

        <EntireExample items={[SignUpSchemaSource]}>
          <SignUpExample />
        </EntireExample>
      </Section>

      <Section title="Backend communication and data observation">
        <Text>
          In the example below, you can see how can response from the backend be pre-process before being used.
          For example, backend sent an array of strings, but we need it to be an instance of <Code>Set</Code>.
          Also, there&apos;s a field <i>&quot;Confirm email&quot;</i>, but it&apos;s visible only to the user,
          that&apos;s why the backend does not send this info.
        </Text>

        <Text>
          You can also try changing the data after you receive it. And you&apos;ll notice, that if the current
          state of a form is the same as when it was sent, the <i>&quot;Save&quot;</i> button becomes disabled.
        </Text>

        <EntireExample items={[BackendSchemaSource, BackendExampleSource]}>
          <BackendExample />
        </EntireExample>
      </Section>

      <Section title="Does it works only with React?">
        <Text>
          Absolutely not! In fact, the only dependency &quot;MobX Form Schema&quot; has i
          s just <Code>mobx</Code>. Therefore, you can use anywhere with MobX.
        </Text>
      </Section>
    </Section>

    <Section title="When should you use it?">
      <Text>
        The best scenario to use MobX Form Schema is when you are already using MobX. It does work great with
        big forms, but even if you have only small ones there&apos;s no disadvantages of using it. Because it
        is lightweight and optimized!
      </Text>
    </Section>

    <Section title="How to use?">
      <Text>
        You can follow this tutorial to master using MobX Form Schema. If you are ready, {' '}
        <Link to="/learn/getting-started/installation" className={styles.link}>
          click here
        </Link>.
      </Text>
    </Section>
  </>
);

// eslint-disable-next-line import/no-default-export
export default LearnStartPage;
