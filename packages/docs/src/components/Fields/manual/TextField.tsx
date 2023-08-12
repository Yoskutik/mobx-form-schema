// Shared file

import React, { ComponentProps, useState } from 'react';
import { ExcludeFormSchema, FormSchema } from '@yoskutik/form-schema';
import { FieldBase, FieldBaseProps } from './FieldBase';

type Props<T extends FormSchema> = Omit<FieldBaseProps<T>, 'value'>;

export const TextField = <T extends FormSchema>({ schema, field, ...props }: Props<T>) => {
  const [value, setValue] = useState(schema[field] as string);

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    schema[field] = evt.target.value as any;
    setValue(evt.target.value);
    props.onChange?.(evt);
  };

  return (
    <FieldBase
      {...props}
      onChange={handleChange}
      schema={schema}
      value={value}
      field={field}
    />
  );
};
