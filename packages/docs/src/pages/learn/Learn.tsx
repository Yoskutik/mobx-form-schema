import { Outlet } from 'react-router-dom';
import React, { memo, Suspense } from 'react';
import { TableOfContents, LoadingMask, Pagination } from '@components';
import { LEARN_TABLE_OF_CONTENTS_LINKS } from './tableOfContententsLinks';
import styles from './Learn.module.scss';

const LINKS_FOR_PAGINATION = LEARN_TABLE_OF_CONTENTS_LINKS.flatMap(it => it[1]);
LINKS_FOR_PAGINATION.unshift({
  title: 'Learn MobX Form Schema',
  to: '/learn',
});

const Learn = memo(() => (
  <>
    <TableOfContents links={LEARN_TABLE_OF_CONTENTS_LINKS} />
    <article className={styles.page}>
      <Suspense fallback={<LoadingMask />}>
        <Outlet />
        <Pagination links={LINKS_FOR_PAGINATION} />
      </Suspense>
    </article>
  </>
));

// eslint-disable-next-line import/no-default-export
export default Learn;
