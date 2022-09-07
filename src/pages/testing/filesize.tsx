import { ChangeEvent, useState } from 'react';
import { fileToImage, getFileSize, imageCompress } from 'src/lib/utils/filecompress';

export default function FileSizePage() {
  const [files, setFiles] = useState<{ file: File; imageSrc: string | ArrayBuffer; id: number }[]>([]);
  const [resizeFiles, setResizeFiles] = useState<{ file: File; imageSrc: string | ArrayBuffer; id: number }[]>([]);

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files[0];

    fileToImage(file, (src) => {
      setFiles([...files, { file, imageSrc: src, id: files.length }]);
      imageCompress(file, (file) => {
        setResizeFiles([...resizeFiles, { file, imageSrc: src, id: resizeFiles.length }]);
      });
    });
  };

  return (
    <>
      <input type="file" onChange={handleFile} />
      <br />
      {files.map((file, index) => (
        <div key={index} className="flex gap-5 mt-12">
          <section>
            <h3>기존 파일</h3>
            <img src={file.imageSrc as string} />
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
            <img src={file.imageSrc as string} />
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
