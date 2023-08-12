// Shared file

import React, { ComponentProps } from 'react';
import { FormSchema } from '@yoskutik/form-schema';
import { observer } from 'mobx-react';
import { action } from 'mobx';
import { FieldBaseAuto } from './FieldBaseAuto';

type TextFieldProps<T> = Omit<ComponentProps<typeof FieldBaseAuto>, 'value'> & {
  schema: T;
  field: keyof T & string;
};

export const TextFieldAuto = observer(
  <T extends FormSchema>({ schema, field, ...props }: TextFieldProps<T>) => {

    const handleChange = action((evt: React.ChangeEvent<HTMLInputElement>) => {
      schema[field] = evt.target.value as any;
      props.onChange?.(evt);
    });

    return (
      <FieldBaseAuto
        {...props}
        value={schema[field] as string}
        error={schema.errors[field]}
        onChange={handleChange}
        name={field}
      />
    );
  },
);
