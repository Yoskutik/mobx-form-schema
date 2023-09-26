import React, { memo } from 'react';
import clsx from 'clsx';

import { Link, TextFieldSource, FieldBaseSource, ChoiceFieldSource, EntireExample } from '@components';

import LoginSchemaSource from 'source-loader!./LoginExample/LoginSchema';
import LoginExampleSource from 'source-loader!./LoginExample/LoginExample';

import ValidationSchemaSource from 'source-loader!./SignUpSchema/SignUpSchema';
import ValidationExampleSource from 'source-loader!./SignUpSchema/SignUpExample';

import ObservationSchemaSource from 'source-loader!./ObservationExample/ObservationSchema';
import ObservationExampleSource from 'source-loader!./ObservationExample/ObservationExample';

import BackendSchemaSource from 'source-loader!./BackendExample/BackendSchema';
import BackendExampleSource from 'source-loader!./BackendExample/BackendExample';

import styles from './Home.module.scss';
import { BackendExample } from './BackendExample/BackendExample';
import { ObservationExample } from './ObservationExample/ObservationExample';
import { LoginExample } from './LoginExample/LoginExample';
import { SignUpExample } from './SignUpSchema/SignUpExample';

const Home = memo(() => (
  <div className={styles.root}>
    <section className={styles.main}>
      <h2 className={styles.mainTitle}>
        MobX Form Schema
      </h2>
      <h3 className={styles.mainSubtitle}>
        The simple way to organize you forms!
      </h3>
      <div className={styles.mainLinks}>
        <Link to="/learn" variant="primary" className={styles.mainLink} size="l">
          Learn
        </Link>
        <Link to="/reference/form-schema/create" variant="secondary" className={styles.mainLink} size="l">
          Reference
        </Link>
      </div>
      <p className={clsx(styles.description, styles.mainDescription)}>
        MobX Form Schema allows you to describe all the form logic besides user event handling. You
        can easily <b>validate</b> your form, <b>observe</b> its changes and <b>simplify</b> your
        communication with the backend!
      </p>
    </section>

    <section className={styles.block}>
      <h4 className={styles.h4}>
        Describe form&apos;s logic
      </h4>
      <p className={styles.description}>
        In the short example below, you can see how you can describe the logic of a login form in a
        React application. Although, this package doesn&apos;t depend on React, so you can use it
        with any other library or in vanilla JavaScript.
      </p>
      <EntireExample
        items={[LoginSchemaSource, LoginExampleSource, TextFieldSource, FieldBaseSource]}
        className={styles.codeExample}
      >
        <LoginExample />
      </EntireExample>
    </section>

    <section className={styles.block}>
      <h4 className={styles.h4}>
        Describe form&apos;s validation
      </h4>
      <p className={styles.description}>
        With MobX Form Schema, you can easily describe the rules of validation for your forms. Even
        if a field has several validation rules or the validation of one field depends on the value
        of another one.
      </p>
      <EntireExample
        items={[ValidationSchemaSource, ValidationExampleSource, TextFieldSource, FieldBaseSource]}
        className={styles.codeExample}
      >
        <SignUpExample />
      </EntireExample>
    </section>

    <section className={styles.block}>
      <h4 className={styles.h4}>
        Observe form changes
      </h4>
      <p className={styles.description}>
        It may be useful to understand whether your form has changed or not. Especially if a form
        is pre-filled with data from the server. And usually, the more fields the form contains,
        the harder it is to understand that. But not with MobX Form Schema, because here the
        observation is automized!
      </p>
      <EntireExample
        className={styles.codeExample}
        items={[
          ObservationSchemaSource,
          ObservationExampleSource,
          TextFieldSource,
          ChoiceFieldSource,
          FieldBaseSource,
        ]}
      >
        <ObservationExample />
      </EntireExample>
    </section>

    <section className={styles.block}>
      <h4 className={styles.h4}>
        Simplify communication with backend
      </h4>
      <p className={styles.description}>
        With MobX Form Schema, you can simply describe how received data from the backend must be
        preprocessed before it is used in the form and how the data must be processed before it
        is sent to the backend.
      </p>
      <EntireExample
        className={styles.codeExample}
        items={[
          BackendSchemaSource,
          BackendExampleSource,
          TextFieldSource,
          ChoiceFieldSource,
          FieldBaseSource,
        ]}
      >
        <BackendExample />
      </EntireExample>
    </section>

    <section className={styles.block}>
      <h4 className={styles.h4}>
        And there&apos;s more!
      </h4>
      <p className={styles.description}>
        MobX Form Schema can be extremely helpful, especially if you have large forms with complex
        validation or observation logic. You can
        {' '}
        <Link to="" isButton={false}>
          read more
        </Link>
        {' '}
        about what is MobX Form Schema and how to use it. And you can also explore the
        &quot;Learn&quot; and the &quot;Reference&quot; sections.
      </p>
      <div className={styles.mainLinks}>
        <Link to="/learn" variant="primary" className={styles.mainLink} size="l">
          Learn
        </Link>
        <Link to="/reference/form-schema/create" variant="secondary" className={styles.mainLink} size="l">
          Reference
        </Link>
      </div>
    </section>
  </div>
));

// eslint-disable-next-line import/no-default-export
export default Home;
