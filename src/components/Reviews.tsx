import { useEffect, useState } from 'react';
import { fetchMovieReviews } from '../services/tmdb';
import type { Review } from '../types/tmdb';

const Reviews = ({ movieId }: { movieId: number }) => {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    fetchMovieReviews(movieId).then(setReviews).catch(console.error);
  }, [movieId]);

  if (reviews.length === 0) return null;

  return (
    reviews && (
      <div className='my-4'>
        <h2 className='text-xl font-heading font-semibold mb-2'>Reviews</h2>
        <div className='space-y-4'>
          {reviews.map((r) => (
            <div key={r.id} className='bg-gray-200 p-4 rounded'>
              <p className='font-heading font-bold text-sm mb-2'>{r.author}</p>
              <p className='text-sm'>{r.content.slice(0, 500)}...</p>
            </div>
          ))}
        </div>
      </div>
    )
  );
};

export default Reviews;
