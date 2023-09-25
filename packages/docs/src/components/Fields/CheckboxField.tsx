// Shared file

import { FormSchema } from '@yoskutik/mobx-form-schema';
import React, { ComponentProps } from 'react';
import { observer } from 'mobx-react';
import { action } from 'mobx';
import { FieldBase } from './FieldBase';

type Props<T> = Omit<ComponentProps<typeof FieldBase>, 'value'> & {
  schema: T;
  field: keyof T;
};

export const CheckboxField = observer(
  <T extends FormSchema>({ schema, field, ...props }: Props<T>) => {
    const handleChange = action((evt: React.ChangeEvent<HTMLInputElement>) => {
      schema[field] = evt.target.checked as any;
      props.onChange?.(evt);
    });

    const handleKeydown = (evt: React.KeyboardEvent<HTMLInputElement>) => {
      if (evt.code === 'Enter') {
        (evt.target as HTMLInputElement).click();
      }
      props.onKeyDown?.(evt);
    };

    return (
      <FieldBase
        {...props}
        error={schema.errors[field]}
        onKeyDown={handleKeydown}
        checked={!!schema[field]}
        onChange={handleChange}
        name={field as string}
        type="checkbox"
      />
    );
  },
);
