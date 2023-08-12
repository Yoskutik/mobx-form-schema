// Shared file

import React, { FC, ComponentProps, useEffect, useRef, useState, useMemo } from 'react';
import clsx from 'clsx';
import styles from '../Fields.module.scss';
import { ExcludeFormSchema, FormSchema } from '@yoskutik/form-schema';

export type FieldBaseProps<T extends FormSchema> = ComponentProps<'input'> & {
  label?: string;
  schema: T;
  field: keyof ExcludeFormSchema<T> & string;
};

let i = 0;
const generateId = () => `input-${i++}`;

export const FieldBase = <T extends FormSchema>({ label, schema, field, ...props }: FieldBaseProps<T>) => {
  const [error, setError] = useState<string | boolean>(false);
  const ref = useRef<HTMLInputElement>(null);
  const hookId = useMemo(generateId, []);
  const id = props.id || hookId;

  useEffect(() => {
    const handleSubmit = () => {
      setError(schema.validateOnly(field));
    };

    const form = ref.current?.form;
    form?.addEventListener('submit', handleSubmit);
    return () => form?.removeEventListener('submit', handleSubmit);
  }, [schema, field]);

  const handleBlur = (evt: React.FocusEvent<HTMLInputElement>) => {
    setError(schema.validateOnly(field));
    props.onBlur?.(evt);
  };

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setError(false);
    props.onChange?.(evt);
  };

  return (
    <div className={clsx(styles.container, styles[`container_${props.type}`])}>
      {label && (
        <label htmlFor={id}>
          {label}
        </label>
      )}
      <input
        name={field}
        type="text"
        {...props}
        aria-errormessage={typeof error === 'string' ? error : undefined}
        className={`${props.className} ${error ? 'error' : ''}`}
        aria-invalid={error ? 'true' : undefined}
        onChange={handleChange}
        onBlur={handleBlur}
        ref={ref}
        id={id}
      />
      {typeof error === 'string' && (
        <span className="input-error-message">
          {error}
        </span>
      )}
    </div>
  );
};

FieldBase.defaultProps = {
  type: 'text',
  className: '',
}
