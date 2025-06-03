import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchMoviesBySearch } from '../services/tmdb';
import type { Movie } from '../types/tmdb';
import Card from '../components/Card';
import GridContainer from '@/components/GridContainer';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const SearchPage = () => {
  const query = useQuery().get('query') || '';
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) return;
    setLoading(true);
    fetchMoviesBySearch(query)
      .then((data) => {
        setMovies(data.results);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [query]);

  return (
    <>
      <h2 className='text-xl mb-4'>
        <span className='font-heading font-bold'>Search results:</span> "{query}
        "
      </h2>

      {loading && <p>Loading...</p>}

      {!loading && movies.length === 0 && <p>Nothing found.</p>}

      <GridContainer>
        {movies.map((movie) => (
          <Card key={movie.id} movie={movie} />
        ))}
      </GridContainer>
    </>
  );
};

export default SearchPage;
