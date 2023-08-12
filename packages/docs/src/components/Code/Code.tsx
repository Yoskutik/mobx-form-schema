import React, { ComponentProps } from 'react';
import clsx from 'clsx';
import styles from './Code.module.scss';

type Props = ComponentProps<'code'>;

export const Code = (props: Props) => <code {...props} className={clsx(styles.root, props.className)} />;