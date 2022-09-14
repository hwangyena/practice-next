type SizeUnit = 'KB' | 'MB' | 'GB' | 'TB';

export const getFileSize = (size: number) => {
  const byteUnits = ['KB', 'MB', ' GB', 'TB'];

  for (let i = 0; i < byteUnits.length; i++) {
    size = Math.floor(size / 1024);

    if (size < 1024) return size.toFixed(2) + byteUnits[i];
  }

  return -1;
};

export const fileToImage = (file: File) => URL.createObjectURL(file);

export const isFileSizeOverflow = (fileSize: number, maxFileSize: number, byte: SizeUnit = 'KB') => {
  const unit = ['KB', 'MB', 'GB', 'TB'].indexOf(byte) + 1;
  const maxSize = Math.pow(1024, unit) * maxFileSize;

  return !unit || maxSize < fileSize;
};

const MAX_WIDTH = 1000;
const MAX_HEIGHT = 1000;

const resizeImage = (image: HTMLImageElement) => {
  const canvas = document.createElement('canvas');

  let width = image.width;
  let height = image.height;

  if (width > MAX_WIDTH) {
    width = Math.round((width *= MAX_WIDTH / width));
  }
  if (height > MAX_HEIGHT) {
    height = Math.round((height *= MAX_HEIGHT / height));
  }

  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext('2d');
  ctx.drawImage(image, 0, 0, MAX_WIDTH, MAX_HEIGHT);

  return canvas.toDataURL('image/jpeg', 0.7); //quality 70
};

const convertURLtoFile = async (url: string, fileName: string) => {
  const response = await fetch(url);
  const data = await response.blob();

  return new File([data], fileName);
};

export const imageCompress = (file: File, callback: (file: File) => void) => {
  const reader = new FileReader();
  reader.readAsArrayBuffer(file);

  reader.onload = (event) => {
    const blob = new Blob([event.target.result]); //create blob
    const blobURL = URL.createObjectURL(blob); //get URL

    const image = new Image();
    image.src = blobURL;

    image.onload = async () => {
      const resize = await convertURLtoFile(resizeImage(image), file.name);
      callback(resize);

      URL.revokeObjectURL(blobURL);
    };
  };
};
