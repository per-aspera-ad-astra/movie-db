export type Movie = {
  id: number;
  title: string;
  release_date: string;
  poster_path: string;
  vote_average: string;
};

export type MovieDetails = {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  poster_path: string;
  vote_average: number;
  genres: { id: number; name: string }[];
  tagline: string;
  runtime: number;
  budget: number;
  revenue: number;
  production_countries: { iso_3166_1: string; name: string }[];
  spoken_languages: { iso_639_1: string; name: string }[];
  homepage: string | null;
  status: string;
};

export type Person = {
  id: number;
  name: string;
  profile_path: string;
  known_for: { title?: string; name?: string }[];
};

export type CastMember = {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
};

export type Video = {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
};

export type Review = {
  id: string;
  author: string;
  content: string;
};

export type Genre = {
  id: number;
  name: string;
};

export type GenreFilterOptions = {
  sort_by?: string;
  year?: number;
  page?: number;
};

export type MoviesResponse = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};
