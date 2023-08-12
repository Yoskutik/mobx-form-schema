// Shared file

import React, { FC, ComponentProps, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import styles from '../Fields.module.scss';

type Props = ComponentProps<'input'> & {
  label?: string;
  error?: string | boolean;
  onFormSubmit?: () => void;
};

export const FieldBaseAuto: FC<Props> = ({ error, label, onFormSubmit, ...props }) => {
  const [shouldHideError, setShouldHideError] = useState(true);
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleSubmit = () => {
      onFormSubmit?.();
      if (error) {
        setShouldHideError(false);
      }
    };

    const form = ref.current?.form;
    form?.addEventListener('submit', handleSubmit);
    return () => form?.removeEventListener('submit', handleSubmit);
  }, [error]);

  const handleBlur = (evt: React.FocusEvent<HTMLInputElement>) => {
    error && setShouldHideError(false);
    props.onBlur?.(evt);
  };

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    !shouldHideError && setShouldHideError(true);
    props.onChange?.(evt);
  };

  return (
    <div className={clsx(styles.container, styles[`container_${props.type}`])}>
      {label && (
        <label htmlFor={props.id}>
          {label}
        </label>
      )}
      <input
        type="text"
        {...props}
        className={`${props.className} ${!shouldHideError && error ? 'error' : ''}`}
        onChange={handleChange}
        onBlur={handleBlur}
        ref={ref}
      />
      {!shouldHideError && typeof error === 'string' && (
        <span className="input-error-message">
          {error}
        </span>
      )}
    </div>
  );
};

FieldBaseAuto.defaultProps = {
  type: 'text',
  className: '',
}
