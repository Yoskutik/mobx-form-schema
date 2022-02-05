import React, { CSSProperties, FC } from 'react';
import { HBox, VBox } from './boxes';
import { LoadingMask } from './LoadingMask';
import { Button } from './Button';

type FormProps = {
  title?: string;
  isLoading?: boolean;
  style?: CSSProperties;
  cls?: string;
  buttonText?: string;
  onClick?: () => void;
  disabled?: boolean;
};

export const Form: FC<FormProps> = ({ children, style, cls = '', isLoading, buttonText, onClick, disabled, title }) => (
  <VBox cls={`form ${cls}`} style={style}>
    {title && (
      <div className="form__title">
        <h2>{title}</h2>
      </div>
    )}
    {children}
    {(buttonText || onClick) && (
      <HBox justify="center">
        <Button text={buttonText} onClick={onClick} disabled={disabled}/>
      </HBox>
    )}
    {isLoading && <LoadingMask/>}
  </VBox>
);
