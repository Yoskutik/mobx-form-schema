import { useLocation } from 'react-router-dom';
import clsx from 'clsx';
import { useEffect } from 'react';
import { lazyWithPreload } from '@hocs';
import { Chevron } from '../TableOfContents/Chevron';
import { Link } from '../Link/Link';
import styles from './Pagination.module.scss';

export type TPageLink = {
  Component?: ReturnType<typeof lazyWithPreload>;
  to: string;
  title: string;
};

type Props = {
  links: TPageLink[];
};

export const Pagination = ({ links }: Props) => {
  const { pathname } = useLocation();

  const currentIndex = links.findIndex(({ to }) => to === pathname);

  useEffect(() => {
    if (currentIndex < links.length - 1) {
      links[currentIndex + 1].Component?.preload();
    }
  }, [currentIndex]);

  return (
    <nav className={styles.root}>
      {currentIndex > 0 ? (
        <Link to={links[currentIndex - 1].to} className={styles.link}>
          <Chevron className={clsx(styles.icon, styles.icon_left)} />
          <div className={styles.wrapper}>
            <b className={styles.linkTitle}>PREVIOUS</b>
            <span className={styles.linkContent}>{links[currentIndex - 1].title}</span>
          </div>
        </Link>
      ) : (
        <div />
      )}

      {currentIndex < links.length - 1 ? (
        <Link to={links[currentIndex + 1].to} className={clsx(styles.link, styles.link_right)}>
          <div className={styles.wrapper}>
            <b className={styles.linkTitle}>NEXT</b>
            <span className={styles.linkContent}>{links[currentIndex + 1].title}</span>
          </div>
          <Chevron className={styles.icon} />
        </Link>
      ) : (
        <div />
      )}
    </nav>
  );
};
