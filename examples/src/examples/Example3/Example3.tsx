import React from 'react';
import { observer } from 'mobx-react';

import { useFormSchema } from '@utils';
import { ButtonFooter, SchemaInformer, TextField } from '@components';

import styles from '../../App.module.scss';

import { ResetExampleFormSchema } from './ResetExampleFormSchema';

export const Example3 = observer(() => {
  const schema = useFormSchema(ResetExampleFormSchema);

  const handleFormSubmit = (evt: React.FormEvent) => {
    evt.preventDefault();
    schema.isValid && schema.sync();
  };

  return (
    <div className={styles.example}>
      <form className={styles.form} autoComplete="off" onSubmit={handleFormSubmit}>
        <TextField schema={schema} field="email" label="E-mail" />
        <TextField schema={schema} field="telegram" label="Telegram" />
        <TextField schema={schema} field="instagram" label="Instagram" />
        <ButtonFooter schema={schema} onCancel={() => schema.reset()} />
      </form>
      <SchemaInformer schema={schema} />
    </div>
  );
});