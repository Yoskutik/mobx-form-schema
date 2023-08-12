import { GitHub, Menu } from '@mui/icons-material';
import clsx from 'clsx';
import React, { useEffect, useRef, useState } from 'react';
import { Link } from '@components';
import { ContentsMenu } from './ContentsMenu/ContentsMenu';
import styles from './Header.module.scss';

export const Header = () => {
  const [isOnTop, setIsOnTop] = useState(true);
  const isOnTopRef = useRef(isOnTop);
  isOnTopRef.current = isOnTop;

  const [opened, setIsOpened] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isOnTopNow = window.scrollY === 0;
      if (isOnTopNow !== isOnTopRef.current) {
        setIsOnTop(isOnTopNow);
      }
    };

    document.addEventListener('scroll', handleScroll);

    return () => document.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header className={clsx(styles.root, !isOnTop && styles.root_withShadow)}>
        <button className={styles.menuButton} onClick={() => setIsOpened(true)}>
          <Menu/>
        </button>

        <h1 className={styles.title}>
          <Link className={styles.titleLink} to="/">
            Form Schema
          </Link>
        </h1>

        <search className={styles.search}/>

        <nav className={styles.nav}>
          <Link to="/learn" className={styles.link}>
            Learn
          </Link>
          <Link to="/reference" className={styles.link}>
            Reference
          </Link>
          <Link to="https://github.com/Yoskutik/form-schema" className={clsx(styles.link, styles.forceVisible)} icon={<GitHub/>} />
        </nav>
      </header>

      <ContentsMenu isOpened={opened} onClose={() => setIsOpened(false)} />
    </>
  );
};