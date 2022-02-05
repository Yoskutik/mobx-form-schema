import React, { CSSProperties, useRef, useState } from 'react';
import { ExcludeModel, Model } from '@yoskutik/mobx-react-mvvm';
import { observer } from 'mobx-react-lite';
import { VBox } from './boxes';
import { generateId } from '@utils';

type TextFieldProps<T extends Model> = {
  model: T;
  name: keyof ExcludeModel<T>;
  label?: string;
  type?: 'text' | 'password';
  required?: boolean;
  style?: CSSProperties;
};

export const TextField = observer(<T extends Model>({
  model, name, label = model.labels?.[name], type = 'text', style, required,
}: TextFieldProps<T>) => {
  const [hasBeenFocused, setHasBeenFocused] = useState(false);
  const id = useRef(generateId()).current;

  return (
        <VBox style={style} onFocus={() => setHasBeenFocused(true)} cls="text-field">
            {label && (
                <label htmlFor={id} style={{ marginBottom: 4 }}>
                    {required && <span style={{ color: 'red' }}>* </span>}
                    {label}:
                </label>
            )}
            <input value={model[name] as any} onChange={evt => model[name] = evt.target.value as any} type={type}
                id={id}/>
            {hasBeenFocused && model.errors[name] && (
                <span style={{ color: 'red', marginTop: 4 }}>{model.errors[name]}</span>
            )}
        </VBox>
  );
});
