import clsx from 'clsx';
import React, { useEffect, useRef, useState } from 'react';
import { Button, Link } from '@components';
import { useLocation } from 'react-router-dom';
import { ContentsMenu } from './ContentsMenu/ContentsMenu';
import styles from './Header.module.scss';
import { Moon } from './Moon';
import { Sun } from './Sun';
import { GitHub } from './GitHub';
import { Menu } from './Menu';

const html = document.querySelector('html');

const ModeButton = () => {
  const [isDark, setIsDark] = useState(html?.classList.contains('dark'));

  const handleClick = () => {
    setIsDark(!isDark);
    html.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'light' : 'dark');
  };

  return (
    <Button
      className={clsx(styles.link, styles.link_theme, styles.forceVisible)}
      aria-label={`Use ${isDark ? 'Light' : 'Dark'} Mode`}
      icon={!isDark ? <Moon /> : <Sun />}
      onClick={handleClick}
    />
  );
};

export const Header = () => {
  const [isOnTop, setIsOnTop] = useState(true);
  const isOnTopRef = useRef(isOnTop);
  isOnTopRef.current = isOnTop;

  const { pathname } = useLocation();
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
        <Button className={styles.menuButton} onClick={() => setIsOpened(true)} icon={<Menu />} />

        <h1 className={styles.title}>
          <Link className={styles.titleLink} to="/">
            MobX Form Schema
          </Link>
        </h1>

        <div className={styles.search} />

        <nav className={styles.nav}>
          <Link to="/learn" className={styles.link} isActive={pathname.startsWith('/learn')}>
            Learn
          </Link>
          <Link
            isActive={pathname.startsWith('/reference')}
            to="/reference/form-schema/create"
            className={styles.link}
          >
            Reference
          </Link>
          <ModeButton />
          <Link
            to="https://github.com/Yoskutik/mobx-form-schema"
            aria-label="GitHub Repository"
            className={styles.link}
            icon={<GitHub />}
          />
        </nav>
      </header>

      <ContentsMenu isOpened={opened} onClose={() => setIsOpened(false)} />
    </>
  );
};
