import { isFish, nimo } from 'src/lib/typings/typeGuard';

test('Test is type Guards', () => {
  expect(isFish(nimo)).toBe(true);
});
