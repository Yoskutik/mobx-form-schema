import { observer } from 'mobx-react';
import React from 'react';

import { ButtonFooter, SchemaInformer, TextField, Title, VBox } from '@components';
import { useFormSchema } from '@utils';

import styles from '../../App.module.scss';

import { SignUpSchema } from './SignUpSchema';

export const Example2 = observer(() => {
  const schema = useFormSchema(SignUpSchema);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    schema.isValid && alert(JSON.stringify(schema.presentation, undefined, 2));
  };

  return (
    <VBox className={styles.example}>
      <Title variant="h2" className={styles.mb8}>
        #2 Advanced validation
      </Title>

      <p className={styles.mb8}>
        Things become a bit complex now. Every field beside <b>E-mail</b> are required to
        fill. But if a user type anything into <b>E-mail</b> field, it should be
        validated to be a valid email address. Also, <b>Password</b> must be at least 8
        characters, and <b>Repeated password</b> must match the Password's value.
      </p>

      <p className={styles.mb8}>
        The <b>Repeated password</b> is the real field for the user, but backend doesn't
        need it to be in the request's body. So, we add a <i>presentation</i> of
        the <b>Repeated password</b> field to remove it from schema's presentation.
      </p>

      <div className={styles.exampleContent}>
        <form onSubmit={handleSubmit} className={styles.form} autoComplete="off">
          <TextField schema={schema} field="name" label="Name" required />
          <TextField schema={schema} field="surname" label="Surname" required />
          <TextField schema={schema} field="email" label="E-mail" />
          <TextField schema={schema} field="password" label="Password" type="password" required />
          <TextField schema={schema} field="repeatedPassword" label="Repeat password" type="password" required />
          <ButtonFooter schema={schema} submit />
        </form>
        <SchemaInformer schema={schema} />
      </div>
    </VBox>
  );
});