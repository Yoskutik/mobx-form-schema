// Shared file

import React, { ComponentProps, useEffect, useRef, useState, useId } from 'react';
import clsx from 'clsx';
import styles from './Fields.module.scss';

type Props = ComponentProps<'input'> & {
  label?: string;
  error?: string | boolean;
  onFormSubmit?: () => void;
};

export const FieldBase = ({ error, label, onFormSubmit, className, ...props }: Props) => {
  const [shouldHideError, setShouldHideError] = useState(true);
  const ref = useRef<HTMLInputElement>(null);
  const hookId = useId();
  const id = props.id || hookId;

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
    <div className={clsx(styles.container, styles[`container_${props.type}`], className)}>
      {label && (
        <label htmlFor={id}>
          {label}
          {props.required && (
            <span className={styles.requiredAsterisk}>{' '}✱</span>
          )}
        </label>
      )}
      <input
        type="text"
        {...props}
        aria-errormessage={typeof error === 'string' ? error : undefined}
        className={clsx(!shouldHideError && error && 'error')}
        aria-invalid={error ? 'true' : 'false'}
        onChange={handleChange}
        onBlur={handleBlur}
        ref={ref}
        id={id}
      />
      {!shouldHideError && typeof error === 'string' && (
        <span className={styles.error}>
          {error}
        </span>
      )}
    </div>
  );
};
