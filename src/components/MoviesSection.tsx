import { useEffect, useState } from 'react';
import {
  fetchPopularMovies,
  fetchTopRatedMovies,
  fetchTrendingMovies,
  fetchUpcomingMovies,
} from '../services/tmdb';
import type { Movie } from '../types/tmdb';
import Card from './Card';

type Props = {
  title: string;
  type: 'popular' | 'trending' | 'upcoming' | 'top-rated';
};

const MoviesSection = ({ title, type }: Props) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  const getMovies = async (type: Props['type']): Promise<Movie[]> => {
    switch (type) {
      case 'popular':
        return await fetchPopularMovies();
      case 'trending':
        return await fetchTrendingMovies();
      case 'upcoming':
        return await fetchUpcomingMovies();
      case 'top-rated':
        return await fetchTopRatedMovies();
      default:
        return [];
    }
  };

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getMovies(type);
        setMovies(data);
      } catch (err) {
        console.error('Ошибка загрузки фильмов:', err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  if (loading) return <p className='text-white'>Loading...</p>;

  return (
    <section>
      <h2 className='font-heading text-xl lg:text-2xl font-bold mb-4'>
        {title}
      </h2>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4'>
        {movies.map((movie) => (
          <Card key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
};

export default MoviesSection;
