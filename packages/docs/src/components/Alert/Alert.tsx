import { ComponentProps } from 'react';
import clsx from 'clsx';
import styles from './Alert.module.scss';

export const Alert = (props: ComponentProps<'div'>) => (
  <div {...props} className={clsx(props.className, styles.root)} />
);
