// Shared file

import { FormSchema } from '@yoskutik/form-schema';
import React, { ComponentProps, useState } from 'react';
import { observer } from 'mobx-react';
import { action } from 'mobx';
import { FieldBaseAuto } from './FieldBaseAuto';
import { Button } from '../../Button/Button';
import styles from '../Fields.module.scss';

type Props<T> = Omit<ComponentProps<typeof FieldBaseAuto>, 'value'> & {
  schema: T;
  field: keyof T & string;
};

export const ChoiceFieldAuto = observer(
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
      <div className={styles.container}>
        {itemsAsArray.length > 0 && (
          <div>
            {itemsAsArray.map((it, i) => (
              <span key={it} style={{ marginRight: 4 }}>
                {it}
                <Button size="s" onClick={() => remove(it, i)} icon="x" />
              </span>
            ))}
          </div>
        )}
        <FieldBaseAuto
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