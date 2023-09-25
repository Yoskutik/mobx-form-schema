import React from 'react';
import clsx from 'clsx';
import styles from './Loader.module.scss';

type Props = {
  className?: string;
};

export const Loader = ({ className }: Props) => (
  <span className={clsx(styles.root, className)} />
);
