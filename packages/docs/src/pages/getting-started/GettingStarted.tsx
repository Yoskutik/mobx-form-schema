import { FC, memo } from 'react';
import { Typography } from '@mui/material';
import { Code, Highlighter, PageBlock, PageWithNavigation, TextLink } from '@components';
import preparationExample from './Preparation.example';
import webpackExample from './WebpackIgnoreWarning.example';

const InstallBlock: FC<{ title: string, code: string }> = ({ title, code }) => (
  <PageBlock title={title}>
    <Highlighter
      code={`${code} @yoskutik/mobx-form-schema mobx reflect-metadata`}
      language="bash"
      forceShowCopy
    />
  </PageBlock>
);

const GettingStarted: FC = memo(() => (
  <PageWithNavigation hideNavigation>
    <PageBlock
      description={(
        <Typography component="p">
          MobX Form Schema depends on the <Code>mobx</Code> package, so in order to use it you must
          install it as well. You also have to install <Code>reflect-medata</Code> package in order
          to be able using decorators.
        </Typography>
      )}
      title="Installation"
    >
      <InstallBlock title="NPM" code="npm install" />
      <InstallBlock title="Yarn" code="yarn add" />
    </PageBlock>

    <PageBlock
      title="Usage"
      description={(
        <>
          <Typography component="p">
            All that provide the <i>MobX Form Schema</i> library - is a way of describing forms.
            So, it is up to you to decide how to use and with what other libraries combine it.
          </Typography>
          <Typography component="p">
            If you are interested in using it with React, you can
            <TextLink href="#/" text="visit the home page" /> to
            see some usage examples.
          </Typography>
        </>
      )}
    />

    <PageBlock
      title="Examples"
      description={(
        <Typography component="p">
          You can also see a complete example of all using MobX Form Schema features in React
          application in
          <TextLink
            href="https://github.com/Yoskutik/mobx-form-schema/tree/master/examples"
            text="this repository"
          />.
        </Typography>
      )}
    />

    {/*<PageBlock*/}
    {/*  title="Further read"*/}
    {/*  description={(*/}
    {/*    <Typography component="p">*/}
    {/*      Despite the fact that React VVM is an extremely small library, it can greatly affect the development process.*/}
    {/*      For a better understanding of the beauty of this library, we advise you to read an*/}
    {/*      <TextLink*/}
    {/*        // eslint-disable-next-line max-len*/}
    {/*        href="https://dev.to/yoskutik/mobx-with-mvvm-makes-frontend-developers-life-much-more-easier-than-redux-does-547j"*/}
    {/*        text="article about MobX and MVVM"*/}
    {/*      />.*/}
    {/*    </Typography>*/}
    {/*  )}*/}
    {/*/>*/}
  </PageWithNavigation>
));

export default GettingStarted;
