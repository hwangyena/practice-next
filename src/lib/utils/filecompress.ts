export const getFileSize = (size: number) => {
  const byteUnits = ['KB', 'MB', ' GB', 'TB'];

  for (let i = 0; i < byteUnits.length; i++) {
    size = Math.floor(size / 1024);

    if (size < 1024) return size.toFixed(1) + byteUnits[i];
  }

  return -1;
};

export const fileToImage = (file: File, callback: (src: string | ArrayBuffer) => void) => {
  const reader = new FileReader();

  reader.onload = (e) => {
    callback(e.target.result);
  };

  reader.readAsDataURL(file);
};

type SizeUnit = 'KB' | 'MB' | 'GB' | 'TB';
export const isFileSizeOverflow = (fileSize: number, maxFileSize: number, byte: SizeUnit = 'KB') => {
  const unit = ['Byte', 'KB', 'MB', 'GB', 'TB'].indexOf(byte) + 1;

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
  ctx.drawImage(image, 0, 0, MAX_WIDTH, MAX_HEIGHT); //// width, height 확인

  return canvas.toDataURL('image/jpeg', 0.7); //quality 70
};

const convertURLtoFIle = async (url: string) => {
  const response = await fetch(url);
  const data = await response.blob();

  return new File([data], 'test');
};

export const imageCompress = (file: File, callback: (file: File) => void) => {
  if (!/image/i.test(file.type)) {
    new Error(`File is not an image.`);
    return;
  }

  const reader = new FileReader();
  reader.readAsArrayBuffer(file);

  reader.onload = (event) => {
    const blob = new Blob([event.target.result]); //create blob
    window.URL = window.URL || window.webkitURL;
    const blobURL = window.URL.createObjectURL(blob); //get URL

    const fr = new FileReader();
    const image = new Image();
    image.src = blobURL;

    image.onload = async () => {
      const resize = await convertURLtoFIle(resizeImage(image));

      console.log('resize', resize);
      callback(resize);
    };
  };
};
