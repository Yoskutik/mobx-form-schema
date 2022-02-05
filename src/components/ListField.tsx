import React, { CSSProperties, useRef, useState } from 'react';
import { HBox, VBox } from './boxes';
import { Button } from './Button';
import { ExcludeModel, Model } from '@yoskutik/mobx-react-mvvm';
import { observer } from 'mobx-react-lite';
import { generateId } from '@utils';

type SelectProps<T> = {
  model: T;
  name: keyof ExcludeModel<T>;
  label?: string;
  required?: boolean;
  style?: CSSProperties;
};

export const ListField = observer(<T extends Model>({
  model, name, label = model.labels?.[name], style, required,
}: SelectProps<T>) => {
  const [hasBeenFocused, setHasBeenFocused] = useState(false);
  const [value, setValue] = useState('');
  const id = useRef(generateId()).current;

  const values = model[name] as unknown as string[];

  const onAddClick = () => {
    model[name] = [...values, value] as any;
    setValue('');
  };

  return (
    <VBox cls="list-field" style={style}>
      {label && (
        <label htmlFor={id} style={{ marginBottom: 4 }}>
          {required && <span style={{ color: 'red' }}>* </span>}
          {label}:
        </label>
      )}
      <HBox>
        <input
          value={value}
          id={id}
          onFocus={() => setHasBeenFocused(true)}
          onChange={evt => setValue(evt.target.value)}
        />
        <Button text="+" onClick={onAddClick} style={{ width: 28, marginLeft: 8 }} disabled={!value}/>
      </HBox>
      {!!values?.length && (
        <VBox cls="list-field__list">
          {values.map((it, i) => (
            <HBox key={Math.random()} cls="list-field__item" justify="space-between" align="center">
              {it}
              <Button text="x" onClick={() => {
                model[name] = values.filter((_, j) => j !== i) as any;
              }} style={{ width: 28, marginLeft: 8 }}/>
            </HBox>
          ))}
        </VBox>
      )}
      {hasBeenFocused && model.errors[name] && (
        <span style={{ color: 'red', marginTop: 4 }}>{model.errors[name]}</span>
      )}
    </VBox>
  );
});
