import React, { FC } from 'react';
import { observer } from 'mobx-react';
import { FormSchema } from '@yoskutik/mobx-form-schema';
import clsx from 'clsx';

import { Title } from '../Title/Title';

import styles from './SchemaInformer.module.scss';

type Props<T extends FormSchema> = {
    schema: T;
    title?: string;
};

export const SchemaInformer = observer(<T extends FormSchema>({ schema, title }: Props<T>) => (
  <div className={styles.informer}>
    {title && (
      <>
        <Title variant="h1">{title}</Title>
        <hr className={styles.hr} />
      </>
    )}

    <b>Presentation:</b>
    <pre className={styles.pre}>{JSON.stringify(schema.presentation, undefined, 2)}</pre>

    <hr className={styles.hr} />

    <b>Errors:</b>
    <pre className={styles.pre}>{JSON.stringify(schema.errors, undefined, 2)}</pre>

    <hr className={styles.hr} />

    <div>
      <div>
        The form was changed:
        {' '}
        <span className={clsx(styles.boolean, schema.isChanged ? styles.green : styles.gray)}>
          {schema.isChanged.toString().toUpperCase()}
        </span>
      </div>
      <div>
        The form is valid:
        {' '}
        <span className={clsx(styles.boolean, schema.isValid ? styles.green : styles.red)}>
          {schema.isValid.toString().toUpperCase()}
        </span>
      </div>
    </div>
  </div>
));