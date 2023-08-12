import React, { useMemo } from 'react';
import { observer } from 'mobx-react';
import { Button, HFlexBox, SchemaInformer, DatetimeLocalField } from '@components';
import { TransformSchema } from './TransformSchema';

export const TransformForm = observer(() => {
  const schema = useMemo(() => (
    TransformSchema.create({
      datetime: '2023-01-01T00:00:00.000Z',
    })
  ), []);

  return (
    <>
      <form onSubmit={evt => evt.preventDefault()} style={{ marginBottom: 32 }}>
        <DatetimeLocalField schema={schema} field="datetime" label="Field1"/>

        <div style={{ marginTop: 8 }}>
          Is datetime an instance of Date: {(schema.datetime instanceof Date).toString()}
        </div>

        <HFlexBox className="form-footer">
          <Button type="submit">Submit</Button>
        </HFlexBox>
      </form>

      <SchemaInformer schema={schema} noErrors noChanged />
    </>
  );
})