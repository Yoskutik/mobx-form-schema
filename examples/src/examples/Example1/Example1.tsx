import { observer } from 'mobx-react';
import React from 'react';

import { ButtonFooter, SchemaInformer, TextField } from '@components';
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
    <div className={styles.example}>
      <form onSubmit={handleSubmit} className={styles.form} autoComplete="off">
        <TextField schema={schema} field="name" label="Name" />
        <TextField schema={schema} field="surname" label="Surname" />
        <ButtonFooter schema={schema} />
      </form>
      <SchemaInformer schema={schema} />
    </div>
  );
});