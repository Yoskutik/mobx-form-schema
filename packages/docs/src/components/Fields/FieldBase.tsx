// Shared file

import React, { FC, InputHTMLAttributes, useEffect, useRef, useState } from 'react';

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string | boolean;
};

export const FieldBase: FC<Props> = ({ error, label, ...props }) => {
  const [shouldHideError, setShouldHideError] = useState(true);
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!error) return undefined;

    const handleSubmit = () => setShouldHideError(false);
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
    <div className={`input-container input-container--${props.type}`}>
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

FieldBase.defaultProps = {
  type: 'text',
  className: '',
}
