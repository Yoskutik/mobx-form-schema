import React, { useState, VFC } from 'react';
import { HBox } from '@components';

export const NewTodoField: VFC<{ onAdd: (title: string) => void }> = ({ onAdd }) => {
  const [value, setValue] = useState('');

  const onClick = () => {
    onAdd(value);
    setValue('');
  };

  return (
    <HBox style={{ marginBottom: 10 }}>
      <input
        value={value}
        onChange={(evt) => setValue(evt.target.value)}
        style={{ marginRight: 10 }}
        placeholder="Enter new Todo"
      />
      <button onClick={onClick} disabled={!value}>
        Add
      </button>
    </HBox>
  );
};
