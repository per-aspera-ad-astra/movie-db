import { useEffect, useState } from 'react';
import { fetchMovieCredits } from '../services/tmdb';
import type { CastMember } from '../types/tmdb';

const Cast = ({ movieId }: { movieId: number }) => {
  const [cast, setCast] = useState<CastMember[]>([]);

  useEffect(() => {
    fetchMovieCredits(movieId).then(setCast).catch(console.error);
  }, [movieId]);

  return (
    <div className='grid gap-2'>
      <h2 className='font-heading font-bold text-xl mb-2'>Cast</h2>
      <div className='w-full overflow-x-auto flex gap-4 no-scrollbar'>
        {cast.slice(0, 10).map((member) => (
          <div key={member.id} className='w-24 text-center shrink-0'>
            <img
              src={
                member.profile_path
                  ? `https://image.tmdb.org/t/p/w185${member.profile_path}`
                  : '/fallback-actor.jpg'
              }
              alt={member.name}
              className='rounded-full w-20 h-20 object-cover mx-auto'
            />
            <p className='font-heading text-xs mt-1 font-medium'>
              {member.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cast;
