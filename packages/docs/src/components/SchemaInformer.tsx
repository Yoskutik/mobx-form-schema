import React from 'react';
import { observer } from 'mobx-react';
import { FormSchema } from '@yoskutik/mobx-form-schema';

import { Box, SxProps } from '@mui/material';
import { Code, VFlexBox } from '@components';

type Props<T extends FormSchema> = {
  schema: T;
  sx?: SxProps;
  noErrors?: boolean;
  noChanged?: boolean;
};

export const SchemaInformer = observer(<T extends FormSchema>({ schema, sx, noErrors, noChanged }: Props<T>) => (
  <VFlexBox sx={{ fontSize: 14, ...sx }}>
    <b>Presentation:</b>
    <Code sx={{ overflow: 'auto' }}>
      {JSON.stringify(schema.presentation, undefined, 2)}
    </Code>

    <hr style={{ width: '100%' }} />

    {!noErrors && (
      <>
        <b>Errors:</b>
        <Code sx={{ overflow: 'auto' }}>
          {JSON.stringify(schema.errors, undefined, 2)}
        </Code>
        <hr style={{ width: '100%' }} />
      </>
    )}

    <div>
      {!noChanged && (
        <div>
          The form was changed:
          {' '}
          <span style={{ color: schema.isChanged ? 'green' : 'gray' }}>
          {schema.isChanged.toString().toUpperCase()}
        </span>
        </div>
      )}

      {!noErrors && (
        <div>
          The form is valid:
          {' '}
          <span style={{ color: schema.isValid ? 'green' : 'red' }}>
          {schema.isValid.toString().toUpperCase()}
        </span>
        </div>
      )}
    </div>
  </VFlexBox>
));