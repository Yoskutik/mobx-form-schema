import { Outlet } from 'react-router-dom';
import React, { memo, Suspense } from 'react';
import { TableOfContents, LoadingMask, Pagination } from '@components';
import { REFERENCE_TABLE_OF_CONTENTS_LINKS } from './tableOfContententsLinks';
import styles from './Reference.module.scss';

const LINKS_FOR_PAGINATION = REFERENCE_TABLE_OF_CONTENTS_LINKS.flatMap(it => it[1]);

const Reference = memo(() => (
  <>
    <TableOfContents links={REFERENCE_TABLE_OF_CONTENTS_LINKS} isForceExpanded />
    <article className={styles.page}>
      <Suspense fallback={<LoadingMask />}>
        <Outlet />
        <Pagination links={LINKS_FOR_PAGINATION} />
      </Suspense>
    </article>
  </>
));

// eslint-disable-next-line import/no-default-export
export default Reference;
