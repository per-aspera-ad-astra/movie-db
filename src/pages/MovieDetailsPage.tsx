import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieDetails } from '../services/tmdb';
import type { MovieDetails } from '../types/tmdb';
import Trailer from '../components/Trailer';
import Cast from '../components/Cast';
import Reviews from '../components/Reviews';
import SimilarMovies from '../components/SimilarMovies';

const MovieDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState(true);

  const infoClasses = 'font-heading text-bold';

  useEffect(() => {
    if (!id) return;

    const load = async () => {
      try {
        const data = await fetchMovieDetails(id);
        setMovie(data);
      } catch (err) {
        console.error('Film loading error:', err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id]);

  if (loading) return <p className=' p-4'>Loading...</p>;
  if (!movie) return <p className=' p-4'>Movie not found</p>;

  return (
    <>
      <div className='grid gap-4 md:grid-cols-3'>
        <div className='flex justify-center mb-1 md:self-start'>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className='w-full max-w-sm rounded-md '
            onError={(e) => {
              e.currentTarget.src = '/movie-db/fallback-movie.jpg';
            }}
          />
        </div>

        <div className='flex flex-col gap-2 md:col-span-2'>
          <h1 className='text-2xl md:text-3xl font-heading font-bold mb-1'>
            {movie.title}
          </h1>

          {movie.tagline && (
            <p className='italic text-yellow-400'>"{movie.tagline}"</p>
          )}

          <p className='text-gray-700 mb-2 font-heading'>
            {movie.release_date}
          </p>
          <p className='mb-4'>{movie.overview}</p>
          {movie.vote_average !== 0 && (
            <p className='mb-2'>
              <strong className={infoClasses}>Vote:</strong>{' '}
              {Number(movie.vote_average).toFixed(2) + ' / 10'}
            </p>
          )}

          <p>
            <strong className={infoClasses}>Genres:</strong>{' '}
            {movie.genres.map((g) => g.name).join(', ')}
          </p>

          <p>
            <strong className={infoClasses}>Duration:</strong> {movie.runtime}{' '}
            min.
          </p>

          <p>
            <strong className={infoClasses}>Status:</strong> {movie.status}
          </p>

          {movie.budget !== 0 && (
            <p>
              <strong className={infoClasses}>Budget:</strong>{' '}
              {movie.budget.toLocaleString()} $
            </p>
          )}

          {movie.revenue !== 0 && (
            <p>
              <strong className={infoClasses}>Revenue:</strong>{' '}
              {movie.revenue.toLocaleString()} $
            </p>
          )}

          <p>
            <strong className={infoClasses}>Countries:</strong>{' '}
            {movie.production_countries.map((c) => c.name).join(', ')}
          </p>

          <p>
            <strong className={infoClasses}>Languages:</strong>{' '}
            {movie.spoken_languages.map((l) => l.name).join(', ')}
          </p>

          {movie.homepage && (
            <p>
              <strong className={infoClasses}>Site:</strong>{' '}
              <a
                href={movie.homepage}
                target='_blank'
                className='text-blue-400 text-[14px] underline'
              >
                {movie.homepage}
              </a>
            </p>
          )}
        </div>
        <div className='overflow-hidden md:col-span-2 md:col-start-2'>
          <Trailer movieId={movie.id} />
          <Cast movieId={movie.id} />
          <SimilarMovies movieId={movie.id} />
          <Reviews movieId={movie.id} />
        </div>
      </div>
    </>
  );
};

export default MovieDetailsPage;
