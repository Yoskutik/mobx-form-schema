import { ComponentProps } from 'react';
import clsx from 'clsx';
import styles from './A11yButton.module.scss';

export const A11yButton = (props: ComponentProps<'button'>) => (
  <button type="button" {...props} className={clsx(styles.root, props.className)} />
);