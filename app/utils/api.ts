export const getMovies = async (randomYear: number, randomPage: number) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=true&include_video=false&page=${randomPage}&primary_release_year=${randomYear}`
  );

  return await res.json();
};

export const getMovieDetails = async (id: string) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.API_KEY}&language=en-US`
  );

  return await res.json();
};
