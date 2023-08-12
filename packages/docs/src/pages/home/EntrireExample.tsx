import React, { FC, ReactNode, useState, MouseEvent } from 'react';
// import { Box, styled } from '@mui/material';
import { Highlighter } from '@components';
import styles from './EntireExample.module.scss';

type TFile = {
  code: string;
  filename: string;
};

type Props = {
  items: TFile[];
  children: ReactNode;
};

export const EntireExample: FC<Props> = ({ items, children }) => {
  const [chosenItem, setChosenItem] = useState(items[0]);

  const createFileTabHandler = (it: TFile) => (evt: MouseEvent) => {
    setChosenItem(it);

    const target = evt.target as HTMLDivElement;
    const parent = target.parentElement as HTMLDivElement;

    parent.scroll({
      left: target.offsetLeft - parent.offsetLeft - 50,
      behavior: 'smooth'
    });
  };

  return (
    <div className={styles.block}>
      <div className={styles.vbox}>
        <div className={styles.tabContainer}>
          {items.map(it => (
            <div className={styles.tab}
              onClick={createFileTabHandler(it)}
              key={it.filename}
            >
              {it.filename}
            </div>
          ))}
        </div>
        <Highlighter code={chosenItem.code} style={{ height: 400, minHeight: '100%' }} />
      </div>

      <div className={styles[`right-side`]}>
        {children}
      </div>
    </div>
  );
};