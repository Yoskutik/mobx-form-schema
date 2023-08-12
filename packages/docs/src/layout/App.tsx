import React, { FC } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { Loader } from '@components';
import { Header } from './Header/Header';
import styles from './App.module.scss';

const Home = React.lazy(() => /* webpackPrefetch: true */ import('@pages/home/Home'));

const LoadingMask: FC = () => (
  <div className={styles.loadingMask}>
    <Loader />
  </div>
);

export const App: FC = () => (
  <HashRouter>
    <Header/>

    <main>
      <React.Suspense fallback={<LoadingMask />}>
        <Routes>
          <Route path="/" element={<Home />} />
          {/*<Route path="/getting-started" element={<GettingStarted />} />*/}
          {/*<Route path="/docs" element={<Docs />} />*/}
          {/*<Route path="/examples" element={<Examples />} />*/}
        </Routes>
      </React.Suspense>
    </main>

    {/*<Footer />*/}
  </HashRouter>
);
