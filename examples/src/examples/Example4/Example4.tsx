import { observer } from 'mobx-react';
import React from 'react';

import { useFormSchema } from '@utils';
import { ButtonFooter, ChoiceField, SchemaInformer, Title, VBox } from '@components';

import styles from '../../App.module.scss';

import { ArraySetSchema } from './ArraySetSchema';

export const Example4 = observer(() => {
  const schema = useFormSchema(ArraySetSchema);

  return (
    <VBox className={styles.example}>
      <Title variant="h2" className={styles.mb8}>
        #4 Observing more complex structures
      </Title>

      <p className={styles.mb8}>
        You can also observe arrays or sets of data. Like in the example below.
      </p>

      <p className={styles.mb8}>
        The <b>Skills as set</b> presents a set of data - if the size of the
        current set is equal to the size of the original one, and all the items
        presented in both of them, the field is considered to be not changed.
      </p>

      <p className={styles.mb8}>
        The <b>Skills as array</b> presents an array of data. The items must
        remain the same position to field to be considered to be not changed.
      </p>

      <p className={styles.mb8}>
        Try adding data to the schema, using <i>Space</i> and <i>Enter</i> keys.
        Also, you can try clicking <b>Save</b> and <b>Reset</b> buttons to set current
        state as the initial or to reset current state to the initial one.
      </p>

      <div className={styles.exampleContent}>
        <form className={styles.form} autoComplete="off">
          <ChoiceField schema={schema} field="skillsSet" label="Skills as set" />
          <ChoiceField schema={schema} field="skillsArray" label="Skills as array" />
          <ButtonFooter schema={schema} save cancel />
        </form>
        <SchemaInformer schema={schema} />
      </div>
    </VBox>
  );
});