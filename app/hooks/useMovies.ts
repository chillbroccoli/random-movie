import { useState } from "react";

import type { MovieProps } from "./../components/Movie";

type TmdbMovie = {
  id: string;
  title: string;
  poster_path: string;
  imdbUrl: string;
};

export const useMovies = () => {
  const [movies, setMovies] = useState<MovieProps[]>([]);

  const removeMovie = (id: string) => {
    const newMovies = movies.filter(
      (bookmark: MovieProps) => bookmark.id !== id
    );
    setMovies(newMovies);
  };

  const addMovieToList = (movie: TmdbMovie, cb: (value: boolean) => void) => {
    const { id, title, poster_path, imdbUrl } = movie;

    const newMovie = {
      id,
      title,
      posterUrl: `https://image.tmdb.org/t/p/w185${poster_path}`,
      imdbUrl: `https://www.imdb.com/title/${imdbUrl}`,
    } as MovieProps;

    setMovies([...movies, newMovie]);

    cb(true);

    setTimeout(() => {
      cb(false);
    }, 2000);
  };

  return {
    movies,
    setMovies,
    removeMovie,
    addMovieToList,
  };
};
