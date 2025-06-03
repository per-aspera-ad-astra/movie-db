import { useEffect, useRef, useState, useCallback } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useGenres } from '../context/GenresContext';
import { fetchMoviesByGenre } from '../services/tmdb';
import Card from '../components/Card';
import SortSelect from '../components/SortSelect';
import YearSelect from '../components/YearSelect';
import GridContainer from '@/components/GridContainer';

const GenrePage = () => {
  const { id } = useParams<{ id: string }>();
  const genres = useGenres();
  const genre = genres.find((g) => g.id.toString() === id);
  const genreId = Number(id);

  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  const [sortBy, setSortBy] = useState(
    () => searchParams.get('sort') || 'popularity.desc'
  );
  const [year, setYear] = useState<number | undefined>(() => {
    const y = searchParams.get('year');
    return y ? Number(y) : undefined;
  });

  const observer = useRef<IntersectionObserver | null>(null);
  const lastMovieRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  useEffect(() => {
    setLoading(true);
    fetchMoviesByGenre(genreId, {
      page,
      sort_by: sortBy,
      year: typeof year === 'number' ? year : undefined,
    })
      .then((data) => {
        setMovies((prev) =>
          page === 1 ? data.results : [...prev, ...data.results]
        );
        setHasMore(data.page < data.total_pages);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [genreId, page, sortBy, year]);

  useEffect(() => {
    setMovies([]);
    setPage(1);
  }, [genreId]);

  useEffect(() => {
    const params: any = { sort: sortBy };
    if (year) params.year = year.toString();
    setSearchParams(params);
  }, [sortBy, year]);

  useEffect(() => {
    setSortBy('popularity.desc');
    setYear(undefined);
    setPage(1);
    setSearchParams({});
  }, [genreId]);

  return (
    <>
      <h2 className='font-heading text-xl lg:text-2xl font-bold mb-4'>
        {genre?.name || 'Films by genre'}
      </h2>

      <form className='mb-4 flex flex-wrap gap-3'>
        <SortSelect
          sort={sortBy}
          onChange={(val) => {
            setSortBy(val);
            setPage(1);
          }}
        />

        <YearSelect
          year={year}
          onChange={(val) => {
            setYear(val);
            setPage(1);
          }}
        />

        <button
          type='button'
          className='px-4 py-2 bg-gray-500 text-sm text-white rounded hover:bg-gray-400 transition cursor-pointer'
          onClick={() => {
            setSortBy('popularity.desc');
            setYear(undefined);
            setPage(1);
            setSearchParams({});
          }}
        >
          Reset
        </button>
      </form>

      <GridContainer>
        {movies.map((movie, index) => {
          const isLast = index === movies.length - 1;
          return (
            <div key={movie.id} ref={isLast ? lastMovieRef : null}>
              <Card movie={movie} />
            </div>
          );
        })}
      </GridContainer>

      {loading && <p className='mt-4 text-gray-500'>Loading...</p>}
      {!hasMore && <p className='mt-4 text-gray-400'>No more films</p>}
    </>
  );
};

export default GenrePage;
