// Shared file

import React, { ComponentProps } from 'react';
import { FormSchema } from '@yoskutik/form-schema';
import { observer } from 'mobx-react';
import { action } from 'mobx';
import { FieldBaseAuto } from './FieldBaseAuto';

type Props<T> = Omit<ComponentProps<typeof FieldBaseAuto>, 'value'> & {
  schema: T;
  field: keyof T & string;
};

export const DatetimeLocalFieldAuto = observer(
  <T extends FormSchema>({ schema, field, ...props }: Props<T>) => {

    const handleChange = action((evt: React.ChangeEvent<HTMLInputElement>) => {
      schema[field] = evt.target.valueAsDate as any;
      props.onChange?.(evt);
    });

    return (
      <FieldBaseAuto
        {...props}
        value={(schema[field] as Date).toISOString().slice(0, -8)}
        error={schema.errors[field]}
        onChange={handleChange}
        type="datetime-local"
        name={field}
      />
    );
  },
);
