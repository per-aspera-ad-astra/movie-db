import { useEffect, useState } from 'react';
import { fetchMovieVideos } from '../services/tmdb';
import type { Video } from '../types/tmdb';

const Trailer = ({ movieId }: { movieId: number }) => {
  const [video, setVideo] = useState<Video | null>(null);

  useEffect(() => {
    fetchMovieVideos(movieId)
      .then((videos) => {
        const trailer = videos.find(
          (v) => v.type === 'Trailer' && v.site === 'YouTube'
        );
        setVideo(trailer ?? null);
      })
      .catch(console.error);
  }, [movieId]);

  if (!video) return null;

  return (
    <div className='my-4'>
      <h3 className='font-heading font-bold text-xl mb-2'>Trailer</h3>
      <div className='w-full'>
        <iframe
          className='aspect-video w-full'
          src={`https://www.youtube.com/embed/${video.key}`}
          title={video.name}
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default Trailer;
