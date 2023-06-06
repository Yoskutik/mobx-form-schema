import React from 'react';
import { observer } from 'mobx-react';

import { useFormSchema } from '@utils';
import { ButtonFooter, SchemaInformer, TextField, Title, VBox } from '@components';

import styles from '../../App.module.scss';

import { ResetExampleFormSchema } from './ResetExampleFormSchema';

export const Example3 = observer(() => {
  const schema = useFormSchema(ResetExampleFormSchema);

  return (
    <VBox className={styles.example}>
      <Title variant="h2" className={styles.mb8}>
        #3 Simple observation
      </Title>

      <p className={styles.mb8}>
        It maybe useful to understand when your form is changed from the initial state.
        Especially when the form was prefilled inputs. And this examples show how's it
        working with MobX Form Schema. If the form is different from the initial state
        the buttons start being disabled.
      </p>

      <p className={styles.mb8}>
        Also, you can try clicking <b>Save</b> and <b>Reset</b> buttons to set current
        state as the initial or to reset current state to the initial one.
      </p>

      <div className={styles.exampleContent}>
        <form className={styles.form} autoComplete="off">
          <TextField schema={schema} field="email" label="E-mail" />
          <TextField schema={schema} field="telegram" label="Telegram" />
          <TextField schema={schema} field="instagram" label="Instagram" />
          <ButtonFooter schema={schema} save cancel />
        </form>
        <SchemaInformer schema={schema} />
      </div>
    </VBox>
  );
});