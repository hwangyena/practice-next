import Image from 'next/image';
import { ChangeEvent, useState } from 'react';
import { fileToImage, getFileSize, heifConvert, imageCompress, isFileSizeOverflow } from 'src/lib/utils/filecompress';

export default function FileSizePage() {
  const [files, setFiles] = useState<{ file: File; imageSrc: string; id: number }[]>([]);
  const [resizeFiles, setResizeFiles] = useState<{ file: File; imageSrc: string; id: number }[]>([]);

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files[0];

    console.log('file', file);
    if (!/image/i.test(file.type)) {
      new Error(`File is not an image.`);
      return;
    }

    const src = fileToImage(file);

    setFiles([...files, { file, imageSrc: src, id: files.length }]);

    if (/heif/.test(file.type)) {
      heifConvert(file, (resizeFile) => {
        console.log('resizeFile', resizeFile);
        setResizeFiles([
          ...resizeFiles,
          { file: resizeFile, imageSrc: fileToImage(resizeFile), id: resizeFiles.length },
        ]);
      });
      return;
    }

    if (isFileSizeOverflow(file.size, 1, 'MB')) {
      imageCompress(file, (resizeFile) => {
        setResizeFiles([
          ...resizeFiles,
          { file: resizeFile, imageSrc: fileToImage(resizeFile), id: resizeFiles.length },
        ]);
      });
    } else {
      setResizeFiles([...resizeFiles, { file, imageSrc: fileToImage(file), id: resizeFiles.length }]);
    }
  };

  return (
    <>
      <input type="file" onChange={handleFile} />
      <br />
      {files.map((file, index) => (
        <div key={index} className="flex gap-5 mt-12">
          <section>
            <h3>기존 파일</h3>
            <div className="w-[500px] h-[500px] relative">
              <Image src={file.imageSrc} alt="image" layout="fill" />
            </div>
            <p>
              <b>이름 </b>
              {file.file.name}
            </p>
            <p>
              <b>크기 </b>
              {getFileSize(file.file.size)}
            </p>
          </section>
          <section>
            <h3>수정 파일</h3>
            <div className="w-[500px] h-[500px] relative">
              {resizeFiles[index]?.imageSrc && <Image src={resizeFiles[index].imageSrc} alt="image" layout="fill" />}
            </div>
            <p>
              <b>이름 </b>
              {resizeFiles[index]?.file.name}
            </p>
            <p>
              <b>크기 </b>
              {getFileSize(resizeFiles[index]?.file.size)}
            </p>
          </section>
        </div>
      ))}
    </>
  );
}
