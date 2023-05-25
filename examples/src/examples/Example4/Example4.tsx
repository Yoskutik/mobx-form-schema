import { observer } from 'mobx-react';
import React, { useState } from 'react';

import { useFormSchema } from '@utils';
import { ButtonFooter, ChoiceField, SchemaInformer, TextField } from '@components';

import styles from '../../App.module.scss';

import { ArraySetSchema } from './ArraySetSchema';

export const Example4 = observer(() => {
  const schema = useFormSchema(ArraySetSchema);

  const handleFormSubmit = (evt: React.FormEvent) => {
    evt.preventDefault();
    schema.isValid && schema.sync();
  };

  return (
    <div className={styles.example}>
      <form className={styles.form} autoComplete="off" onSubmit={handleFormSubmit}>
        <ChoiceField schema={schema} field="skillsSet" label="Skills as set" />
        <ChoiceField schema={schema} field="skillsArray" label="Skills as array" />
        <ButtonFooter schema={schema} onCancel={() => schema.reset()} />
      </form>
      <SchemaInformer schema={schema} />
    </div>
  );
});