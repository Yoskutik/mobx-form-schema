// Shared file

import React, { ComponentProps } from 'react';
import { FormSchema } from '@yoskutik/mobx-form-schema';
import { observer } from 'mobx-react';
import { action } from 'mobx';
import { FieldBase } from './FieldBase';

type TextFieldProps<T> = Omit<ComponentProps<typeof FieldBase>, 'value'> & {
  schema: T;
  field: keyof T & string;
};

export const TextField = observer(
  <T extends FormSchema>({ schema, field, ...props }: TextFieldProps<T>) => {

    const handleChange = action((evt: React.ChangeEvent<HTMLInputElement>) => {
      schema[field] = evt.target.value as any;
      props.onChange?.(evt);
    });

    return (
      <FieldBase
        {...props}
        value={schema[field] as string}
        error={schema.errors[field]}
        onChange={handleChange}
        name={field}
      />
    );
  },
);
