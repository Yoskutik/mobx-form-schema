// Shared file

import { FormSchema } from '@yoskutik/mobx-form-schema';
import React, { ComponentProps, useState } from 'react';
import { observer } from 'mobx-react';
import { action } from 'mobx';
import { FieldBase } from './FieldBase';
import { Button } from '../Button';

type Props<T> = Omit<ComponentProps<typeof FieldBase>, 'value'> & {
  schema: T;
  field: keyof T & string;
};

export const ChoiceField = observer(
  <T extends FormSchema>({ schema, field, ...props }: Props<T>) => {
    const [value, setValue] = useState('');

    const items = schema[field] as Set<string> | string[];

    const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
      setValue(evt.target.value);
      props.onChange?.(evt);
    };

    const handleKeydown = action((evt: React.KeyboardEvent<HTMLInputElement>) => {
      const v = value.trim();
      if (['Space', 'Enter'].includes(evt.code) && v) {
        evt.preventDefault();
        if (Array.isArray(items)) {
          items.push(v);
        } else {
          items.add(v);
        }
        setValue('');
      }
      props.onKeyDown?.(evt);
    });

    const remove = action((v: string, i: number) => {
      if (Array.isArray(items)) {
        items.splice(i, 1);
      } else {
        items.delete(v);
      }
    });

    const itemsAsArray = [...items];

    return (
      <div className="input-container">
        {itemsAsArray.length > 0 && (
          <div>
            {itemsAsArray.map((it, i) => (
              <span key={it}>
                {it}
                <Button size="s" onClick={() => remove(it, i)}>
                  x
                </Button>
              </span>
            ))}
          </div>
        )}
        <FieldBase
          {...props}
          error={schema.errors[field]}
          onKeyDown={handleKeydown}
          onChange={handleChange}
          value={value}
          name={field}
        />
      </div>
    );
  },
);