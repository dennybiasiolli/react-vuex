import constants from '@/constants';


describe('constants', () => {
  test('should have all constants', () => {
    expect(constants).toEqual({
      STORE_KEY: '$store',
    });
  });
});
