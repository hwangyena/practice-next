import React, { memo, useState } from 'react';
import { Movie } from 'src/pages/memo';

type Props = {
  onAddMovie: (movie: Omit<Movie, 'id'>) => void;
};

const MemoText = ({ onAddMovie }: Props) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  return (
    <section className="my-5">
      <h3>영화추가하기</h3>
      <div className="flex flex-col gap-3 w-[300px]">
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        <textarea className="border border-black" value={content} onChange={(e) => setContent(e.target.value)} />
      </div>
      <button onClick={() => onAddMovie({ title, content })} className="bg-slate-200">
        영화 추가하기
      </button>
    </section>
  );
};

export default memo(MemoText);
