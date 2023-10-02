import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { LEARN_TABLE_OF_CONTENTS_LINKS } from '@pages/learn/tableOfContententsLinks';
import { REFERENCE_TABLE_OF_CONTENTS_LINKS } from '@pages/reference/tableOfContententsLinks';
import { lazyWithPreload } from '@hocs';
import { LoadingMask } from '@components';
import { Header } from './Header/Header';
import { Footer } from './Footer/Footer';
import styles from './App.module.scss';

const Home = lazyWithPreload(
  () => import(/* webpackPrefetch: true */ '@pages/home/Home'),
);
const Learn = lazyWithPreload(() => import('@pages/learn/Learn'));
const LearnStartPage = lazyWithPreload(() => import('@pages/learn/LearnStartPage/LearnStartPage'));
const Reference = lazyWithPreload(() => import('@pages/reference/Reference'));

const PageObserver = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export const App = () => {
  useEffect(() => {
    Learn.preload().then(LearnStartPage.preload);
    Reference.preload().then(REFERENCE_TABLE_OF_CONTENTS_LINKS[0][1][0].Component.preload);
  }, []);

  return (
    <HashRouter>
      <Header />

      <main className={styles.main}>
        <React.Suspense fallback={<LoadingMask />}>
          <Routes>
            <Route path="" element={<Home />} index />
            <Route path="learn/*" element={<Learn />}>
              <Route path="" element={<LearnStartPage />} />
              {LEARN_TABLE_OF_CONTENTS_LINKS
                .flatMap(it => it[1])
                .map(({ to, Component }) => (
                  <Route
                    path={to.replace(/^\/learn\//, '')}
                    element={<Component />}
                    key={to}
                  />
                ))}
            </Route>
            <Route path="reference/*" element={<Reference />}>
              {REFERENCE_TABLE_OF_CONTENTS_LINKS
                .flatMap(it => it[1])
                .map(({ to, Component }) => (
                  <Route
                    path={to.replace(/^\/reference\//, '')}
                    element={<Component />}
                    key={to}
                  />
                ))}
            </Route>
          </Routes>
        </React.Suspense>
      </main>

      <Footer />

      <PageObserver />
    </HashRouter>
  );
};
