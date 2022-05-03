import React, { memo } from 'react';
import { Movie } from 'src/pages/memo';

type Props = {
  movie: Movie;
  onDeleteMovie: (id: number) => void;
};

const MemoMovie = ({ movie, onDeleteMovie }: Props) => {
  const { content, title, id } = movie;
  return (
    <section>
      <h3>{title}</h3>
      <pre>{content}</pre>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto voluptas perspiciatis excepturi, inventore
      enim et perferendis eius quis quos iusto esse exercitationem eveniet voluptatibus aut dolorum consequatur facilis
      tempore sint. Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto voluptas perspiciatis excepturi,
      inventore enim et perferendis eius quis quos iusto esse exercitationem eveniet voluptatibus aut dolorum
      consequatur facilis tempore sint.
      <button className="bg-red-300" onClick={() => onDeleteMovie(id)}>
        삭제하기
      </button>
    </section>
  );
};

const compareTitleContent = (prev: Movie, next: Movie) => {
  return prev.title === next.title && prev.content === next.content;
};

// export default MemoMovie;
export default memo(MemoMovie, (p, n) => compareTitleContent(p.movie, n.movie));
