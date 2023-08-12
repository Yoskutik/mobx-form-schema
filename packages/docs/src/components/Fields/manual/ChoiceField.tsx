// Shared file

import { FormSchema } from '@yoskutik/form-schema';
import React, { useState } from 'react';
import { observer } from 'mobx-react';
import { action } from 'mobx';
import { Button } from '../../Button/Button';
import styles from '../Fields.module.scss';
import { FieldBase, FieldBaseProps } from './FieldBase';

type Props<T extends FormSchema> = Omit<FieldBaseProps<T>, 'value'>;

export const ChoiceField = <T extends FormSchema>({ schema, field, ...props }: Props<T>) => {
  const [value, setValue] = useState('');
  const [items, setItems] = useState(schema[field] as Set<string> | string[]);

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
      setItems([...items]);
    } else {
      items.delete(v);
      setItems(new Set(items));
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
      <FieldBase
        {...props}
        onKeyDown={handleKeydown}
        onChange={handleChange}
        schema={schema}
        field={field}
        value={value}
      />
    </div>
  );
};