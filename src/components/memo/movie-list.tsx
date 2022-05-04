import React from 'react';
import { Movie } from 'src/pages/memo';
import { MemoMovie } from '.';

type Props = {
  movies: Movie[];
  onDeleteMovie: (id: number) => void;
};

const MemoMovieList = ({ movies, onDeleteMovie }: Props) => {
  return (
    <section>
      {movies.map((v, i) => (
        <MemoMovie movie={v} onDeleteMovie={onDeleteMovie} key={i} />
      ))}
    </section>
  );
};

export default MemoMovieList;
