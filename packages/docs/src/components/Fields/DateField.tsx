// Shared file

import React, { ComponentProps } from 'react';
import { FormSchema } from '@yoskutik/mobx-form-schema';
import { observer } from 'mobx-react';
import { action } from 'mobx';
import { FieldBase } from './FieldBase';

type Props<T> = Omit<ComponentProps<typeof FieldBase>, 'value'> & {
  schema: T;
  field: keyof T & string;
};

export const DateField = observer(
  <T extends FormSchema>({ schema, field, ...props }: Props<T>) => {

    const handleChange = action((evt: React.ChangeEvent<HTMLInputElement>) => {
      const value = evt.target.valueAsDate ? evt.target.valueAsDate : null;
      schema[field] = value as any;
      props.onChange?.(evt);
    });

    return (
      <FieldBase
        {...props}
        value={schema[field] ? (schema[field] as Date).toISOString() : ''}
        error={schema.errors[field]}
        onChange={handleChange}
        name={field}
        type="date"
      />
    );
  },
);
