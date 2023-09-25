import { ComponentProps, createElement } from 'react';
import clsx from 'clsx';
import styles from './Title.module.scss';

type Props = ComponentProps<'h1'> & {
  variant: 'h2' | 'h3' | 'h4' | 'h5';
};

export const Title = ({ variant, ...props }: Props) => (
  createElement(variant, { ...props, className: clsx(props.className, styles.root, styles[variant]) })
);
