import { connect, Provider } from '@/index.js';
import realConnect from '@/components/PresentationalComponent';
import realProvider from '@/components/Provider';


describe('index', () => {
  test('should exports connect and Provider', () => {
    expect(connect).toBeDefined();
    expect(connect).toBe(realConnect);
    expect(Provider).toBeDefined();
    expect(Provider).toBe(realProvider);
  });
});
