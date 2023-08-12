import React, { CSSProperties, FC, useState } from 'react';
import { PrismLight } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { CopyAll } from '@mui/icons-material';
import styles from './Highlighter.module.scss';
import { Button } from '../Button/Button';

type Props = {
  code: string;
  forceShowCopy?: boolean;
  language?: 'tsx' | 'json' | 'bash';
  style?: CSSProperties;
};

export const Highlighter: FC<Props> = ({ code, style, forceShowCopy, language = 'tsx' }) => (
  <div className={styles.block}>
    <PrismLight
      customStyle={{
        boxShadow: '0 1px 4px 0 rgba(0,0,0,0.1)',
        borderRadius: 8,
        fontSize: 13,
        margin: 0,
        ...style
      }}
      language={language}
      style={dracula}
    >
      {code}
    </PrismLight>
    {(forceShowCopy === undefined ? code.includes('\n') : forceShowCopy) && (
      <Button
        onClick={() => navigator.clipboard.writeText(code)}
        icon={<CopyAll sx={{ fill: '#e0e0e0' }}/>}
        className={styles.copy}
      />
    )}
  </div>
);
