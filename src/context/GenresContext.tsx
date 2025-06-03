import { createContext, useContext, useEffect, useState } from 'react';
import type { Genre } from '../types/tmdb';
import { fetchGenres } from '../services/tmdb';

const GenresContext = createContext<Genre[]>([]);

export function GenresProvider({ children }: { children: React.ReactNode }) {
  const [genres, setGenres] = useState<Genre[]>([]);

  useEffect(() => {
    fetchGenres().then(setGenres).catch(console.error);
  }, []);

  return (
    <GenresContext.Provider value={genres}>{children}</GenresContext.Provider>
  );
}

export function useGenres() {
  return useContext(GenresContext);
}
