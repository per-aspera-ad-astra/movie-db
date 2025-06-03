import type {
  Movie,
  MovieDetails,
  Person,
  CastMember,
  Video,
  Review,
  Genre,
  GenreFilterOptions,
  MoviesResponse,
} from '../types/tmdb';

const API_KEY = '99a49e5d6d09dd6351f775f4b73f09ad';
const BASE_URL = 'https://api.themoviedb.org/3';

export async function fetchPopularMovies(): Promise<Movie[]> {
  const res = await fetch(
    `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-GB&page=1`
  );
  if (!res.ok) {
    throw new Error('Не удалось загрузить популярные фильмы');
  }
  const data = await res.json();
  return data.results;
}

export async function fetchMovieDetails(id: string): Promise<MovieDetails> {
  const res = await fetch(
    `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-GB`
  );
  if (!res.ok) {
    throw new Error('Не удалось загрузить детали фильма');
  }
  return await res.json();
}

export async function fetchTrendingMovies(): Promise<Movie[]> {
  const res = await fetch(
    `${BASE_URL}/trending/movie/day?api_key=${API_KEY}&language=en-GB`
  );
  if (!res.ok) throw new Error('Ошибка загрузки трендовых фильмов');
  const data = await res.json();
  return data.results;
}

// Upcoming movies
export async function fetchUpcomingMovies(): Promise<Movie[]> {
  const res = await fetch(
    `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=en-GB&page=1`
  );
  if (!res.ok) throw new Error('Ошибка загрузки предстоящих фильмов');
  const data = await res.json();
  return data.results;
}

export async function fetchTopRatedMovies(): Promise<Movie[]> {
  const res = await fetch(
    `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-GB&page=1`
  );
  if (!res.ok) throw new Error('Ошибка загрузки топ фильмов');
  const data = await res.json();
  return data.results;
}

export async function fetchTrendingPeople(): Promise<Person[]> {
  const res = await fetch(
    `${BASE_URL}/trending/person/day?api_key=${API_KEY}&language=en-GB`
  );
  if (!res.ok) throw new Error('Ошибка загрузки популярных людей');
  const data = await res.json();
  return data.results;
}

export async function fetchMovieCredits(
  movieId: number
): Promise<CastMember[]> {
  const res = await fetch(
    `${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}&language=en-GB`
  );
  const data = await res.json();
  return data.cast;
}

export async function fetchMovieVideos(movieId: number): Promise<Video[]> {
  const res = await fetch(
    `${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}&language=en-GB`
  );
  const data = await res.json();
  return data.results;
}

export async function fetchSimilarMovies(movieId: number): Promise<Movie[]> {
  const res = await fetch(
    `${BASE_URL}/movie/${movieId}/similar?api_key=${API_KEY}&language=en-GB`
  );
  const data = await res.json();
  return data.results;
}

export async function fetchMovieReviews(movieId: number): Promise<Review[]> {
  const res = await fetch(
    `${BASE_URL}/movie/${movieId}/reviews?api_key=${API_KEY}&language=en-GB`
  );
  const data = await res.json();
  return data.results;
}

export async function fetchGenres(): Promise<Genre[]> {
  const res = await fetch(
    `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-GB`
  );
  const data = await res.json();
  return data.genres;
}

export async function fetchMoviesByGenre(
  genreId: number,
  { sort_by = 'popularity.desc', year, page = 1 }: GenreFilterOptions = {}
) {
  const params = new URLSearchParams({
    api_key: API_KEY,
    with_genres: genreId.toString(),
    sort_by,
    page: page.toString(),
  });

  if (year) params.append('year', year.toString());

  const res = await fetch(`${BASE_URL}/discover/movie?${params}`);
  if (!res.ok) throw new Error('Failed to fetch movies');
  return res.json();
}

export async function fetchMoviesBySearch(
  query: string
): Promise<MoviesResponse> {
  const params = new URLSearchParams({
    api_key: API_KEY,
    query,
    page: '1',
  });

  const res = await fetch(`${BASE_URL}/search/movie?${params}`);
  if (!res.ok) throw new Error('Failed to fetch search results');
  return res.json();
}
