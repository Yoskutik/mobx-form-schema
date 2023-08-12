// Shared file

import { FormSchema } from '@yoskutik/form-schema';
import React, { ComponentProps } from 'react';
import { observer } from 'mobx-react';
import { action } from 'mobx';
import { FieldBaseAuto } from './FieldBaseAuto';

type Props<T> = Omit<ComponentProps<typeof FieldBaseAuto>, 'value'> & {
  schema: T;
  field: keyof T;
};

export const CheckboxFieldAuto = observer(
  <T extends FormSchema>({ schema, field, ...props }: Props<T>) => {

    const handleChange = action((evt: React.ChangeEvent<HTMLInputElement>) => {
      schema[field] = evt.target.checked as any;
      props.onChange?.(evt);
    });

    return (
      <FieldBaseAuto
        {...props}
        error={schema.errors[field]}
        checked={!!schema[field]}
        onChange={handleChange}
        name={field as string}
        type="checkbox"
      />
    );
  },
);