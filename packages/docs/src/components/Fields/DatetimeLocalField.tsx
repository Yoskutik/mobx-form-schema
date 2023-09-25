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

export const DatetimeLocalField = observer(
  <T extends FormSchema>({ schema, field, ...props }: Props<T>) => {

    const handleChange = action((evt: React.ChangeEvent<HTMLInputElement>) => {
      const validStringByTimeZone = evt.target.value.replace('T', ' ') + ':00';
      schema[field] = new Date(validStringByTimeZone) as any;
      props.onChange?.(evt);
    });

    return (
      <FieldBase
        {...props}
        value={(schema[field] as Date).toISOString().slice(0, 16)}
        error={schema.errors[field]}
        onChange={handleChange}
        type="datetime-local"
        name={field}
      />
    );
  },
);
