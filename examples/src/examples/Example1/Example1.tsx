import { observer } from 'mobx-react';
import React from 'react';

import { ButtonFooter, SchemaInformer, TextField, Title, VBox } from '@components';
import { useFormSchema } from '@utils';

import styles from '../../App.module.scss';

import { ShortSignUpSchema } from './ShortSignUpSchema';

export const Example1 = observer(() => {
  const schema = useFormSchema(ShortSignUpSchema);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    schema.isValid && alert('The form is valid');
  };

  return (
    <VBox className={styles.example}>
      <Title variant="h2" className={styles.mb8}>
        #1 Simple validation
      </Title>

      <p className={styles.mb8}>
        In the example each field in the form is required to fill. The validation is
        applied every time the value of field is changed. But the error messages
        shows only after <b>blur</b> or <b>submit</b> evetns.
      </p>

      <div className={styles.exampleContent}>
        <form onSubmit={handleSubmit} className={styles.form} autoComplete="off">
          <TextField schema={schema} field="name" label="Name" />
          <TextField schema={schema} field="surname" label="Surname" />
          <ButtonFooter schema={schema} submit />
        </form>
        <SchemaInformer schema={schema} />
      </div>
    </VBox>
  );
});