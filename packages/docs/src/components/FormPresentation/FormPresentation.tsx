import { observer } from 'mobx-react';
import clsx from 'clsx';
import { FormSchema } from '@yoskutik/mobx-form-schema';
import styles from './FormPresentation.module.scss';

type Props<T extends FormSchema> = {
  className?: string;
  schema: T;
  hideValidationInfo?: boolean;
  hideObservationInfo?: boolean;
};

export const FormPresentation = observer(<T extends FormSchema>({
  schema, className, hideObservationInfo, hideValidationInfo,
}: Props<T>) => (
  <div className={clsx(className, styles.root)}>
    <div className={styles.grid}>
      {!hideValidationInfo && (
        <>
          <span className={clsx(styles.label, schema.isValid ? styles.label_green : styles.label_red)} />
          <span>Schema is valid:</span>
          {schema.isValid ? (
            <span className={styles.text_green}>TRUE</span>
          ) : (
            <span className={styles.text_red}>FALSE</span>
          )}
        </>
      )}
      {!hideObservationInfo && (
        <>
          <span className={clsx(styles.label, schema.isChanged ? styles.label_green : styles.label_gray)} />
          <span>Schema has changed:</span>
          {schema.isChanged ? (
            <span className={styles.text_green}>TRUE</span>
          ) : (
            <span className={styles.text_gray}>FALSE</span>
          )}
        </>
      )}
    </div>
    <pre className={styles.presentation}>
      Form presentation: {' '}
      {JSON.stringify(schema.presentation, undefined, 2)}
    </pre>
  </div>
));