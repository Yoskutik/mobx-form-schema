import React, { ButtonHTMLAttributes, DetailedHTMLProps, FC } from 'react';
import clsx from 'clsx';
import styles from './Button.module.scss';

type BaseButtonProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

type Props = BaseButtonProps & {
  variant: 'primary' | 'secondary' | 'cancel';
  size?: 'm' | 's';
};

export const Button: FC<Props> = ({ variant, size = 'm', ...props }) => (
  <button type="button" {...props} className={clsx(props.className, styles.button, styles[variant], styles[`size-${size}`])} />
);