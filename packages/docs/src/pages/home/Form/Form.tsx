import { ComponentProps } from 'react';
import { FormSchema } from '@yoskutik/mobx-form-schema';
import { FormPresentation } from '@components';
import styles from './Form.module.scss';

type Props<T extends FormSchema> = ComponentProps<'form'> & {
  schema: T;
  hideValidationInfo?: boolean;
  hideObservationInfo?: boolean;
};

export function Form<T extends FormSchema>({ schema, hideObservationInfo, hideValidationInfo, ...props }: Props<T>) {
  return (
    <div className={styles.root}>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <form {...props} />
      <FormPresentation
        hideObservationInfo={hideObservationInfo}
        hideValidationInfo={hideValidationInfo}
        schema={schema}
        className={styles.presentation}
      />
    </div>
  );
}
