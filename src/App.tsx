import { Route, Routes } from 'react-router-dom';
import MovieDetails from './pages/MovieDetailsPage';
import GenrePage from './pages/GenrePage';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path='/movie/:id' element={<MovieDetails />} />
        <Route path='/genre/:id' element={<GenrePage />} />
        <Route path='/search' element={<SearchPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
