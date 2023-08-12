// Shared file

import React, { useState } from 'react';
import { FormSchema } from '@yoskutik/form-schema';
import { FieldBase, FieldBaseProps } from './FieldBase';

type Props<T extends FormSchema> = Omit<FieldBaseProps<T>, 'value'>;

export const CheckboxField = <T extends FormSchema>({ schema, field, ...props }: Props<T>) => {
  const [value, setValue] = useState(schema[field] as boolean);

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    schema[field] = evt.target.checked as any;
    setValue(evt.target.checked);
    props.onChange?.(evt);
  };

  return (
    <FieldBase
      {...props}
      onChange={handleChange}
      checked={!!value}
      schema={schema}
      field={field}
      type="checkbox"
    />
  );
};