import React, { CSSProperties, VFC } from 'react';

type ButtonProps = {
  text: string;
  onClick: () => void;
  disabled?: boolean;
  style?: CSSProperties;
};

export const Button: VFC<ButtonProps> = ({ text, onClick, disabled, style }) => (
    <button onClick={() => !disabled && onClick()} className={`button ${disabled ? 'disabled' : ''}`} style={style}>
        {text}
    </button>
);
