import React, { FC, ReactNode, RefObject, useEffect, useMemo, useRef, useState } from 'react';
import { observer } from 'mobx-react';
import { FormSchema } from '@yoskutik/mobx-form-schema';
import clsx from 'clsx';
import { action } from 'mobx';

import { VBox } from '../Boxes/Boxes';
import styles from './Fields.module.scss';

type BaseInputProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

type FieldWrapperProps = BaseInputProps & {
  shouldShowErrorsOnFormSubmit?: boolean;
  inputRef?: RefObject<HTMLInputElement>;
  label?: string | JSX.Element;
  error?: string | boolean;
  children?: ReactNode;
  baseClassName?: string;
};

let id = 0;
const generateId = (prefix: string) => `${prefix}-${id++}`;

const BaseField: FC<FieldWrapperProps> = ({
  shouldShowErrorsOnFormSubmit = true,
  error: errorFromProps,
  label,
  inputRef: inputRefFromProps,
  children,
  baseClassName,
  ...props
}) => {
  const [shouldHideError, setShouldHideError] = useState(true);
  const hookInputRef = useRef<HTMLInputElement>(null);
  const inputRef = inputRefFromProps || hookInputRef;
  const refId = useMemo(() => generateId('field'), []);
  const id = props.id || refId;

  useEffect(() => {
    if (!errorFromProps || !shouldShowErrorsOnFormSubmit) return undefined;

    const submitHandler = () => setShouldHideError(false);
    const form = inputRef.current?.form;

    form?.addEventListener('submit', submitHandler);
    return () => form?.removeEventListener('submit', submitHandler);
  }, [shouldShowErrorsOnFormSubmit, errorFromProps]);

  const error = !shouldHideError && errorFromProps;

  const handleBlur = (evt: React.FocusEvent<HTMLInputElement>) => {
    errorFromProps && setShouldHideError(false);
    props.onBlur?.(evt);
  };

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setShouldHideError(true);
    props.onChange?.(evt);
  };

  return (
    <VBox className={clsx(styles.base, baseClassName, props.disabled && styles.disabled)}>
      {typeof label === 'string' ? (
        <label className={styles.label} htmlFor={id}>
          {label}

          {props.required && (
            <span className={styles.requiredStar}>✱</span>
          )}
        </label>
      ) : (
        label
      )}
      <input
        type="text"
        id={id}
        {...props}
        aria-errormessage={typeof errorFromProps === 'string' ? errorFromProps : undefined}
        className={clsx(props.className, styles.input, error && styles.inputWithError)}
        aria-invalid={errorFromProps ? 'true' : undefined}
        onChange={handleChange}
        onBlur={handleBlur}
        ref={inputRef}
      />
      {children}
      {error && (
        <span className={styles.error}>
          {error}
        </span>
      )}
    </VBox>
  );
};

type SpecificTypeKeyOf<Type, Obj> = Extract<
  keyof Obj,
  string & { [K in keyof Obj]: Obj[K] extends Type ? K : never }[keyof Obj]
>;

type TextFieldProps<T> = Omit<FieldWrapperProps, 'value' | 'children'> & {
  schema: T;
  field: SpecificTypeKeyOf<string, T>;
};

export const TextField = observer(
  <T extends FormSchema>({ schema, field, ...props }: TextFieldProps<T>) => {

    const handleChange = action((evt: React.ChangeEvent<HTMLInputElement>) => {
      schema[field] = evt.target.value as any;
      props.onChange?.(evt);
    });

    const handleBlur = action((evt: React.FocusEvent<HTMLInputElement>) => {
      schema[field] = evt.target.value.trim() as any;
      props.onBlur?.(evt);
    });

    return (
      <BaseField
        {...props}
        value={schema[field] as string}
        error={schema.errors[field]}
        onChange={handleChange}
        onBlur={handleBlur}
        name={field}
      />
    );
  },
);

type NumberFieldProps<T> = Omit<FieldWrapperProps, 'value' | 'children'> & {
  schema: T;
  field: SpecificTypeKeyOf<number, T>;
};

export const NumberField = observer(
  <T extends FormSchema>({ schema, field, ...props }: NumberFieldProps<T>) => {

    const handleChange = action((evt: React.ChangeEvent<HTMLInputElement>) => {
      schema[field] = evt.target.valueAsNumber as any;
      props.onChange?.(evt);
    });

    return (
      <BaseField
        {...props}
        value={schema[field]?.toString() ?? ''}
        error={schema.errors[field]}
        onChange={handleChange}
        type="number"
        name={field}
      />
    );
  },
);

type ChoiceFieldProps<T> = Omit<FieldWrapperProps, 'value' | 'children'> & {
  schema: T;
  field: SpecificTypeKeyOf<Set<string> | string[], T>;
};

export const ChoiceField = observer(
  <T extends FormSchema>({ schema, field, ...props }: ChoiceFieldProps<T>) => {
    const [value, setValue] = useState('');

    const items = schema[field] as Set<string>;

    const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
      setValue(evt.target.value);
      props.onChange?.(evt);
    };

    const handleKeydown = action((evt: React.KeyboardEvent<HTMLInputElement>) => {
      const v = value.trim();
      if (['Space', 'Enter'].includes(evt.code) && v) {
        if (Array.isArray(items)) {
          items.push(v);
        } else {
          items.add(v);
        }
        setValue('');
      }
      props.onKeyDown?.(evt);
    });

    const remove = action((v: string, i: number) => {
      if (Array.isArray(items)) {
        items.splice(i, 1);
      } else {
        items.delete(v);
      }
    });

    const itemsAsArray = [...items];

    return (
      <VBox className={styles.base}>
        {itemsAsArray.length > 0 && (
          <div className={styles.choiceBlock}>
            {itemsAsArray.map((it, i) => (
              <span key={i} className={styles.choice}>
                {it}
                <span className={styles.choiceClose} onClick={() => remove(it, i)}>x</span>
              </span>
            ))}
          </div>
        )}
        <BaseField
          {...props}
          error={schema.errors[field]}
          onKeyDown={handleKeydown}
          onChange={handleChange}
          value={value}
          name={field}
        />
      </VBox>
    );
  },
);

type CheckboxFieldProps<T> = Omit<FieldWrapperProps, 'value' | 'children'> & {
  schema: T;
  field: SpecificTypeKeyOf<boolean, T>;
};

export const CheckboxField = observer(
  <T extends FormSchema>({ schema, field, ...props }: CheckboxFieldProps<T>) => {

    const handleChange = action((evt: React.ChangeEvent<HTMLInputElement>) => {
      schema[field] = evt.target.checked as any;
      props.onChange?.(evt);
    });

    return (
      <BaseField
        {...props}
        baseClassName={clsx(props.baseClassName, styles.checkboxField)}
        error={schema.errors[field]}
        checked={!!schema[field]}
        onChange={handleChange}
        type="checkbox"
        name={field}
      />
    );
  },
);