test('mock test', () => {
  const mock = jest.fn();

  const result = mock('foo');

  expect(result).toBeUndefined();
  expect(mock).toHaveBeenCalledTimes(1);
  expect(mock).toHaveBeenCalledWith('foo');
});
