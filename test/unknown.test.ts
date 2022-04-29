import { isOfType, objectType } from 'src/lib/typings/isOfType';

test('Test building isOfType', () => {
  expect(isOfType<objectType>({ str: 'hello' }, 'str')).toBe(true);
  expect(isOfType<objectType>({ str: 123 }, 'str')).toBe(false);
});
