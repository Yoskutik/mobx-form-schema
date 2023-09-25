// eslint-disable-next-line import/no-relative-packages
import { getMetadata, updateMetadata } from '../../mobx-form-schema/src/utils';

describe('utils', () => {
  it('getMetadata for not classes', () => {
    const fn = () => {};
    const key = 'key';

    updateMetadata(key, fn, 'prop', 1);
    expect(getMetadata('', () => {})).toEqual({});
  });
});
