import React, { useEffect, useRef, useState, VFC } from 'react';
import { VBox } from './boxes';

type TList = {
  onSelect: (values: string[]) => void;
  all: string[];
  selected: string[];
};

const List: VFC<TList> = ({ all, selected, onSelect }) => (
  <div>
    {all.map(it => (
      <div
        key={Math.random()}
        onClick={() => onSelect(selected.includes(it) ? selected.filter(item => item !== it) : [...selected, it])}>
        {it}
      </div>
    ))}
  </div>
);

type SelectProps = {
  values: string[];
  onChange: (values: string[]) => void;
};

export const Select: VFC<SelectProps> = ({ values, onChange }) => {
  const [isListVisible, setIsListVisible] = useState(false);
  const [value, setValue] = useState('');
  const ref = useRef<HTMLInputElement>();

  useEffect(() => setValue(values.join(', ')), [values]);

  return (
    <VBox>
      <input
        value={value}
        ref={ref}
        onFocus={() => setIsListVisible(true)}
        className={isListVisible ? 'focus' : null}
      />
      <VBox>

      </VBox>
    </VBox>
  );
};
