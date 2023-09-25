import React, { CSSProperties, FC } from 'react';
import { PrismLight } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';
import clsx from 'clsx';
import { Button } from '../Button/Button';
import styles from './Highlighter.module.scss';
import { Copy } from './Copy';

type Props = {
  code: string;
  forceShowCopy?: boolean;
  language?: 'tsx' | 'json' | 'bash';
  className?: string;
  style?: CSSProperties;
};

export const Highlighter: FC<Props> = ({ code, style, forceShowCopy, language = 'tsx', className }) => (
  <div className={clsx(styles.block, className)}>
    <PrismLight
      customStyle={{
        boxShadow: '0 1px 4px 0 rgba(0,0,0,0.1)',
        backgroundColor: '#262632',
        borderRadius: 8,
        fontSize: 13,
        margin: 0,
        ...style,
      }}
      language={language}
      style={dracula}
    >
      {code}
    </PrismLight>
    {(forceShowCopy === undefined ? code.includes('\n') : forceShowCopy) && (
      <Button
        onClick={() => {
          navigator.clipboard.writeText(code);
        }}
        className={styles.copy}
        aria-label="Copy code to clipboard"
        icon={<Copy />}
      />
    )}
  </div>
);
