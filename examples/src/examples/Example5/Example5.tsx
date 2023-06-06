import React from 'react';
import { observer } from 'mobx-react';

import {
  TextField,
  SchemaInformer,
  Title,
  ButtonFooter,
  VBox
} from '@components';
import { useFormSchema } from '@utils';

import appStyles from '../../App.module.scss';

import { Example5Schema } from './Example5Schema';
import styles from './Example5.module.scss';

export const Example5 = observer(() => {
  const schema = useFormSchema(Example5Schema, {
    username: 'yoskutik',
    name: 'dmitrii',
  });

  return (
    <VBox className={appStyles.example}>
      <Title variant="h2" className={styles.mb8}>
        #5 Presentation and Initialization
      </Title>

      <p className={styles.mb8}>
        In this simple example you can see how can you improve your process of form presentation and
        initialization.
      </p>

      <p className={styles.mb8}>
        First of all, you can create pre-filled forms by passing data into <code>create</code> static
        method of the form. By default, all the data passed into this method will be applied without
        any transformations. But, if you add <code>factory</code> decorator for a property you can
        specify a transformation function. For example, here the <i>name</i> field will be pre-filled
        with a capitalize word, even if the initial value stated with a lowercase letter.
      </p>

      <p className={styles.mb8}>
        Each schema has an opportunity to return its presentation. You can see such presentations next
        to every schema on this page. The <i>presentation</i> object is the object that contains form's
        data and does not contain any utility methods or data. By default, <code>presentation</code> cuts
        off some methods and symbols from the schema, but you can create your the presentation for each
        property by using <code>presentation</code> decorator. For example, here the <i>username</i> field
        will be presented trimmed and with <i>"@"</i> character even if it's not really started with it.
      </p>

      <div className={appStyles.exampleContent}>
        <form className={appStyles.form} autoComplete="off">
          <TextField schema={schema} field="username" label="Username" />
          <TextField schema={schema} field="name" label="name" />

          <ButtonFooter schema={schema} save cancel />
        </form>

        <SchemaInformer schema={schema} title="General" />
      </div>
    </VBox>
  );
});
