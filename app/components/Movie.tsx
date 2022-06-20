import { useState } from "react";
import { TrashX } from "tabler-icons-react";

export type MovieProps = {
  id: string;
  title: string;
  posterUrl: string;
  imdbUrl: string;
  removeMovie: (id: string) => void;
};

export default function Movie({
  id,
  title,
  posterUrl,
  imdbUrl,
  removeMovie,
}: MovieProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative my-4"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <a href={imdbUrl} target="_blank" rel="noreferrer">
        <div className="w-full flex items-stretch border border-gray-300">
          <div className="w-28">
            <img
              src={posterUrl}
              alt="Movie Poster"
              className="h-28 w-full border-r border-gray-300"
            />
          </div>

          <div className="w-full flex items-center justify-center">
            <h2 className="w-3/5 mx-auto text-sm text-center">{title}</h2>
          </div>
        </div>
      </a>

      {isHovered && (
        <button
          onClick={() => removeMovie(id)}
          className="absolute top-0 bottom-0 right-0 bg-red-500 ml-auto"
        >
          <div className="h-full flex items-center justify-center px-2">
            <TrashX className="text-white" />
          </div>
        </button>
      )}
    </div>
  );
}
