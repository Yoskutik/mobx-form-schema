import { ComponentProps, createElement } from 'react';
import clsx from 'clsx';
import styles from './List.module.scss';

type Props = ComponentProps<'ul'> & {
  variant?: 'ul' | 'ol';
};

export const List = ({ variant = 'ul', ...props }: Props) => (
  createElement(variant, { ...props, className: clsx(props.className, styles.root) })
);
