import { useCallback, useState } from 'react';
import { MemoMovie, MemoText } from 'src/components/memo';

let movieId = 1;
export type Movie = {
  id: number;
  title: string;
  content: string;
};

const initialMovie: Movie = {
  id: movieId++,
  title: '어벤져스',
  content: `Lorem ipsum dolor sit amet consectetur adipisicing elit.\nEarum nemo atque sint perferendis eveniet delectus aliquam itaque quasi! Illo necessitatibus sed ut inventore. Dolorem, totam maiores? Nobis dolorum optio non.`,
};

export default function MemoPage() {
  const [movies, setMovies] = useState<Movie[]>([initialMovie]);

  const onAddMovie = useCallback(({ content, title }: Omit<Movie, 'id'>) => {
    setMovies((p) => [...p, { title, content, id: movieId++ }]);
  }, []);

  const onDeleteMovie = useCallback((id: number) => {
    setMovies((p) => p.filter((v) => v.id !== id));
  }, []);

  return (
    <>
      <h1>React 성능 향상</h1>
      <MemoText {...{ onAddMovie }} />
      {movies.map((v, i) => (
        <MemoMovie movie={v} onDeleteMovie={onDeleteMovie} key={i} />
      ))}
    </>
  );
}
