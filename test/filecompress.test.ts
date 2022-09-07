import { imageCompress } from 'src/lib/utils/filecompress';

test('[Test] file size check', () => {
  expect(imageCompress).toBe(true);
});
