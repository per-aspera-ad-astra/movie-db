import MoviesSection from '../components/MoviesSection';

const HomePage = () => {
  return (
    <div className='min-h-screen space-y-10'>
      <MoviesSection type='popular' title='Popular movies' />

      <MoviesSection type='trending' title='Trending movies' />

      <MoviesSection type='upcoming' title='Upcoming movies' />

      <MoviesSection type='top-rated' title='Top rated movies' />
    </div>
  );
};

export default HomePage;
