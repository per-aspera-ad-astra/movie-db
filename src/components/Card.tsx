import { Link } from 'react-router-dom';
import type { Movie } from '../types/tmdb';

const Card = ({ movie }: { movie: Movie }) => {
  return (
    <Link
      to={`/movie/${movie.id}`}
      className='relative overflow-hidden group/card'
    >
      <div className='relative overflow-hidden rounded before:absolute before:z-1 before:-inset-0 before:block before:bg-[rgba(0,0,0,0.2)]'>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className='w-full aspect-2/3 object-top object-cover group-hover/card:scale-105 transition transform duration-300'
          onError={(e) => {
            e.currentTarget.src = '/fallback-movie.jpg';
          }}
        />
      </div>
      <div className='p-1 w-full'>
        <h2 className='text-sm text-inherit font-heading font-bold line-clamp-2'>
          {movie.title}
        </h2>
        <p className='text-sm text-gray-600'>
          {movie.release_date ? movie.release_date.slice(0, 4) : '—'}
        </p>
      </div>
      <div className='flex items-center justify-center absolute z-2 top-[5px] right-[5px] rounded-[50%] p-1 size-8 bg-orange-600 text-white'>
        <p className='text-[12px] font-heading'>
          {Number(movie.vote_average).toFixed(2)}
        </p>
      </div>
    </Link>
  );
};

export default Card;
