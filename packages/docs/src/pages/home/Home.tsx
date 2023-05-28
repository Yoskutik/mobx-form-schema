import { FC, memo, ReactNode } from 'react';
import { Box, Card, Grid, SxProps, Typography } from '@mui/material';
import { Block } from './components';

import { ValidateIt } from './Validation/ValidateIt';
import { ObserveIt } from './Observation/ObserveIt';
import { InitializeIt } from './Initialization/InitializeIt';
import { PresentIt } from './Presentation/PresentIt';

const Badges: FC = () => (
  <Box sx={{ backgroundColor: 'rgba(0,0,0,0.03)' }}>
    <Grid justifyContent="center" gap={1} container sx={{ width: '1200px', m: '0 auto', p: 2, maxWidth: '100%' }}>
      <img src="https://img.shields.io/npm/v/@yoskutik/mobx-form-schema" alt="NPM version" />
      <img src="https://img.shields.io/badge/EcmaScript-v.6-blue" alt="EcmaScript 6" />
      <img src="https://raw.githubusercontent.com/Yoskutik/mobx-form-schema/master/badges/weight.svg" alt="Weight" />
      <img src="https://img.shields.io/npm/l/@yoskutik/mobx-form-schema" alt="License" />
      <img
        src="https://img.shields.io/snyk/vulnerabilities/npm/@yoskutik/mobx-form-schema?label=Vulnerabilities"
        alt="Vulnerabilities"
      />
      <img
        src="https://raw.githubusercontent.com/Yoskutik/mobx-form-schema/master/badges/coverage-jest%20coverage.svg"
        alt="Coverage"
      />
      <img src="https://github.com/Yoskutik/mobx-form-schema/actions/workflows/build.yml/badge.svg" alt="Build" />
    </Grid>
  </Box>
);

const Description: FC<{ children: ReactNode, sx?: SxProps }> = ({ children, sx }) => (
  <Typography component="p" sx={{ fontSize: '1.3rem', ...sx }}>
    {children}
  </Typography>
);

const Home: FC = memo(() => (
  <Box>
    <Badges />
    <Box>
      <Block style={{ height: 220, alignItems: 'center', padding: '1rem' }}>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h2" component="h1">
            MobX Form Schema
          </Typography>
          <Typography variant="h5" component="h2" sx={{ mt: 2 }}>
            The simple way to organize you forms!
          </Typography>
        </Box>
      </Block>

      <Block>
        <Card sx={{ width: '800px', p: 4, maxWidth: '95vw' }}>
          <Description>
            Mobx Form Schema is a small library that can simplify forms developing process by providing
            a <b>Form Schema</b> concept.
          </Description>
          <Description sx={{ mt: 2 }}>
            MobX Form Schema gives you a convenient way to describe your form - its <b>validation</b>, {' '}
            <b>presentation</b>, <b>initialization</b> and <b>observation</b>.
          </Description>
          <hr style={{ width: '60%', margin: '24px auto' }} />
          <Description>
            The developing process of forms may be quite repetitive - fields from different forms can
            have same validation rules; in order to understand whether the form is changed you have
            to manually check all the properties; etc. And <i>MobX Form Schema</i> <b>can help you with
            it!</b>
          </Description>
          <Description sx={{ mt: 2 }}>
            With <i>MobX Form Schema</i> you can:
            <ul>
              <li>simplify your validation;</li>
              <li>automate changes observation;</li>
              <li>configure form's presentation;</li>
              <li>create rules for its initialization.</li>
            </ul>
          </Description>
        </Card>
      </Block>

      <ValidateIt />

      <ObserveIt />

      <InitializeIt />

      <PresentIt />
    </Box>
  </Box>
));

export default Home;
