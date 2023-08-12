import React, { FC, memo, ReactNode } from 'react';

import styles from './Home.module.scss';
import { Code, Link, TextFieldSource, FieldBaseSource } from '@components';
import { EntireExample } from '@pages/home/EntrireExample';
import { ValidationExample } from '@pages/home/ValidationExample/ValidationExample';
import { SingUpExample } from '@pages/home/SingUpExample/SingUpExample';
import { ObservationExample } from '@pages/home/ObservationExample/ObservationExample';

import SingUpSchemaSource from 'source-loader!./SingUpExample/SingUpSchema';
import SingUpExampleSource from 'source-loader!./SingUpExample/SingUpExample';

import ValidationSchemaSource from 'source-loader!./ValidationExample/ValidationSchema';
import ValidationExampleSource from 'source-loader!./ValidationExample/ValidationExample';

import ObservationSchemaSource from 'source-loader!./ObservationExample/ObservationSchema';
import ObservationExampleSource from 'source-loader!./ObservationExample/ObservationExample';

const Home: FC = memo(() => (
  <>
    <section className={styles.main}>
      <h2 className={styles.mainTitle}>
        Form Schema
      </h2>
      <p className={styles.description}>
        The simple way to organize you forms!
      </p>
      <div className={styles.mainLinks}>
        <Link to="/learn" linkStyle="primary" className={styles.mainLink}>
          Learn
        </Link>
        <Link to="/reference" linkStyle="secondary" className={styles.mainLink}>
          Reference
        </Link>
      </div>
    </section>

    <section className={styles.block}>
      <h3 className={styles.h3}>
        Describe the form logic
      </h3>
      <p className={styles.description}>
        Form Schema allows to describe all the form logic besides user events handling.
        Simply, create a class that will be extends from <Code>FormSchema</Code> to
        create your form description.
      </p>
      <EntireExample items={[SingUpSchemaSource, SingUpExampleSource, TextFieldSource, FieldBaseSource]}>
        <SingUpExample />
      </EntireExample>
      <p className={styles.description}>
        In the short example above, you can see how can you describe a sign up form and
        use such description in react application. However, Form Schema does not depend
        on React, so you can use it with any other libraries or in Vanilla JavaScript.
      </p>
    </section>

    <section className={styles.block}>
      <h3 className={styles.h3}>
        Describe form validation
      </h3>
      <p className={styles.description}>
        Your form may include optional fields with their validation rules. Also, your
        form may include fields, which validation depends on other fields. And with
        Form Schema you can easily describe such validation! Just use the <Code>@validate</Code> decorator.
      </p>
      <EntireExample items={[ValidationSchemaSource, ValidationExampleSource, TextFieldSource, FieldBaseSource]}>
        <ValidationExample />
      </EntireExample>
    </section>

    <section className={styles.block}>
      <h3 className={styles.h3}>
        Observe form changes
      </h3>
      <p className={styles.description}>
        It may be useful to understand whether your form is changed or not. Usually,
        the more fields the form contains the harder it is to understand that. But not
        with Form Schema.
      </p>
      <p className={styles.description}>
        With Form Schema you can always understand if the form became changed. Even
        if it has complex structures in it.
      </p>
      <EntireExample items={[ObservationSchemaSource, ObservationExampleSource, TextFieldSource, FieldBaseSource]}>
        <ObservationExample />
      </EntireExample>
    </section>

    {/*<ValidateIt />*/}

    {/*<ObserveIt />*/}

    {/*<InitializeIt />*/}

    {/*<PresentIt />*/}
  </>
));

export default Home;
