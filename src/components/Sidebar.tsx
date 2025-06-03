import { NavLink } from 'react-router-dom';
import { useGenres } from '../context/GenresContext';

type Props = {
  isOpen: boolean;
  closeSidebar: () => void;
};

const Sidebar = ({ isOpen, closeSidebar }: Props) => {
  const genres = useGenres();
  const classes = 'block text-lg/8 transition duration-300';

  return (
    <aside
      className={`w-full lg:w-auto fixed z-10 lg:sticky top-[var(--header-height)] h-[calc(100vh_-_var(--header-height))] bg-slate-900 px-4 py-6 space-y-2 text-sm text-white ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-300 lg:translate-x-0`}
    >
      <nav className='overflow-y-auto h-full font-heading scrollbar'>
        {genres.map((genre) => (
          <NavLink
            key={genre.id}
            onClick={closeSidebar}
            to={`/genre/${genre.id}`}
            className={({ isActive }) =>
              isActive
                ? `${classes} text-yellow-400`
                : `${classes} hover:text-yellow-300`
            }
          >
            {genre.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
