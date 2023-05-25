import { observer } from 'mobx-react';
import React from 'react';

import { ButtonFooter, SchemaInformer, TextField } from '@components';
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
    <div className={styles.example}>
      <form onSubmit={handleSubmit} className={styles.form} autoComplete="off">
        <TextField schema={schema} field="name" label="Name" />
        <TextField schema={schema} field="surname" label="Surname" />
        <TextField schema={schema} field="email" label="Email"/>
        <TextField schema={schema} field="password" label="Password" type="password" />
        <TextField schema={schema} field="repeatedPassword" label="Repeat password" type="password" />
        <ButtonFooter schema={schema} />
      </form>
      <SchemaInformer schema={schema} />
    </div>
  );
});