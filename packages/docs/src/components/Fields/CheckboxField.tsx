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

    return (
      <FieldBase
        {...props}
        error={schema.errors[field]}
        checked={!!schema[field]}
        onChange={handleChange}
        type="checkbox"
        name={field as string}
      />
    );
  },
);