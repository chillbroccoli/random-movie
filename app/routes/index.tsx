import { useEffect, useState } from "react";
import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData, useNavigate } from "@remix-run/react";

import { User, Star, Plus, Menu2 } from "tabler-icons-react";

import { randomDate } from "~/utils/randomDate";

import type { MovieProps } from "~/components/Movie";

import SlideOver from "~/components/SlideOver";
import Notification from "~/components/Notification";

export const loader: LoaderFunction = async () => {
  const randomYear = randomDate().getFullYear();
  const randomPage = Math.floor(Math.random() * 10) + 1;
  const randomMovie = Math.floor(Math.random() * 20);

  const res = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=true&include_video=false&page=${randomPage}&primary_release_year=${randomYear}`
  );
  const data = await res.json();

  const movie = data.results[randomMovie];

  const res2 = await fetch(
    `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${process.env.API_KEY}&language=en-US`
  );
  const movieDetails = await res2.json();

  return json(movieDetails);
};

export default function Index() {
  const [showNotification, setShowNotification] = useState(false);
  const [open, setOpen] = useState(false);
  const [movies, setMovies] = useState<MovieProps[]>([]);
  const movie = useLoaderData();
  const navigate = useNavigate();

  const openSlideOver = () => setOpen(true);
  const closeSlideOver = () => setOpen(false);

  const removeMovie = (id: string) => {
    const newMovies = movies.filter(
      (bookmark: MovieProps) => bookmark.id !== id
    );
    setMovies(newMovies);
  };

  const addMovieToList = () => {
    const newMovie = {
      id: movie.id,
      title: movie.title,
      posterUrl: `https://image.tmdb.org/t/p/w185${movie.poster_path}`,
      imdbUrl: `https://www.imdb.com/title/${movie.imdb_id}`,
    } as MovieProps;

    setMovies([...movies, newMovie]);

    setShowNotification(true);

    setTimeout(() => {
      setShowNotification(false);
    }, 2000);
  };

  useEffect(() => {
    setMovies(JSON.parse(localStorage.getItem("movies") || "[]"));
  }, []);

  useEffect(() => {
    localStorage.setItem("movies", JSON.stringify(movies));
  }, [movies]);

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <button
        onClick={openSlideOver}
        className="absolute top-5 right-5 sm:top-10 sm:right-10 z-10"
      >
        <Menu2 />
      </button>
      <SlideOver
        isOpen={open}
        openSlideOver={openSlideOver}
        closeSlideOver={closeSlideOver}
        movies={movies}
        setMovies={setMovies}
        removeMovie={removeMovie}
      />
      <Notification show={showNotification} setShow={setShowNotification} />
      <div className="relative w-96">
        <div className="flex items-center justify-center">
          <button
            onClick={() => navigate(".")}
            className="w-3/4 mx-auto sm:w-full px-4 py-2 mb-6 mt-16 rounded-lg drop-shadow-2xl bg-white/20"
          >
            Generate Random Movie
          </button>
        </div>

        <div className="w-3/4 mx-auto sm:w-full mb-12 rounded-lg drop-shadow-2xl bg-white/30 overflow-hidden">
          <div className="overflow-hidden relative">
            <a
              href={`https://www.imdb.com/title/${movie.imdb_id}/`}
              target="_blank"
              rel="noreferrer"
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt="Movie Poster"
                className="h-72 w-full overflow-hidden transition-all duration-700 ease-in-out hover:scale-110 hover:brightness-50"
              />
            </a>
            <button
              onClick={addMovieToList}
              className="absolute top-10 right-0 py-1 px-2 rounded-tl-lg rounded-bl-lg bg-gradient-to-r bg-indigo-500 hover:bg-indigo-700 backdrop-opacity-60"
            >
              <Plus className="mr-1" />
            </button>
          </div>
          <div className="h-[200px] overflow-y-auto">
            <h1 className="w-3/4 mx-auto text-center text-2xl text-gray-700 font-bold subpixel-antialiased uppercase mt-4 pb-4">
              {movie.title}
            </h1>
            <p className="text-center text-sm text-gray-700 px-4 leading-6">
              {movie.overview}
            </p>
          </div>
          <div>
            <div className="flex justify-between items-center mx-2 mt-4">
              <div className="w-full px-2 py-2 flex items-center rounded-lg drop-shadow-2xl bg-white/30">
                <User />
                <span className="text-gray-700 ml-1">{movie.vote_count}</span>
              </div>
              <div className="w-full ml-2 px-2 py-2 flex items-center rounded-lg drop-shadow-2xl bg-white/30">
                <Star />
                <span className="text-gray-700 ml-1">{movie.vote_average}</span>
              </div>
            </div>
            <a
              href={`https://www.imdb.com/title/${movie.imdb_id}/`}
              target="_blank"
              rel="noreferrer"
              className="block bg-gradient-to-r from-cyan-500/50 to-blue-500/50 hover:from-cyan-500/70 hover:to-blue-500/70 backdrop-opacity-60 transition-colors duration-700 ease-in-out backdrop-invert mt-4 px-4 py-2 rounded-lg text-center uppercase"
            >
              Go To Imdb
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
