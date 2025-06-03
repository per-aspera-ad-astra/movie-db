import { useEffect, useState } from 'react';
import { fetchSimilarMovies } from '../services/tmdb';
import type { Movie } from '../types/tmdb';
import Card from './Card';

const SimilarMovies = ({ movieId }: { movieId: number }) => {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    fetchSimilarMovies(movieId).then(setMovies).catch(console.error);
  }, [movieId]);

  return (
    movies && (
      <div className='my-4'>
        <h2 className='text-xl font-heading font-semibold mb-2'>
          Similar movies
        </h2>
        <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4'>
          {movies.map((movie) => (
            <Card key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    )
  );
};

export default SimilarMovies;
