import { getMetadata, updateMetadata } from '@yoskutik/form-schema/utils';

describe('utils', () => {
  it('getMetadata for not classes', () => {
    const fn = () => {};
    const key = 'key';
    const prop = 'prop';

    updateMetadata(key, fn, 'prop', 1);
    expect(getMetadata('', () => {})).toEqual({});
  });
});