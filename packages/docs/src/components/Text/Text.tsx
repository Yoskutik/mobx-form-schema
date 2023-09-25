import { ComponentProps } from 'react';
import clsx from 'clsx';
import styles from './Text.module.scss';

export const Text = ({ className, ...props }: ComponentProps<'p'>) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <p {...props} className={clsx(className, styles.root)} />
);
