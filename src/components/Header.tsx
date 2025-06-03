import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BiSearch } from 'react-icons/bi';
import { AiOutlineMenu } from 'react-icons/ai';
import { AiOutlineClose } from 'react-icons/ai';

type Props = {
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
};

const Header = ({ toggleSidebar, isSidebarOpen }: Props) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim().length > 0) {
      navigate(`/search?query=${encodeURIComponent(query.trim())}`);
    }

    setQuery('');
  };

  return (
    <header className='sticky top-0 z-10 h-[var(--header-height)] bg-slate-950 text-white px-4 flex items-center justify-between'>
      <Link to='/' className='font-[Aladin] text-lg lg:text-2xl font-bold'>
        Movie DB
      </Link>

      <form onSubmit={onSubmit} className='flex max-w-1/2 relative ml-auto'>
        <input
          type='text'
          placeholder='Find the films...'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className='w-full rounded-full bg-white pl-3 pr-6 py-1 text-gray-500 text-[12px] focus:shadow-md'
        />
        <button
          type='submit'
          className='absolute top-[50%] right-[8px] transform-[translateY(-50%)] bg-transparent text-gray-500'
        >
          <BiSearch />
        </button>
      </form>
      <button
        className='ml-3 p-1 lg:hidden cursor-pointer'
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? (
          <AiOutlineClose size={18} />
        ) : (
          <AiOutlineMenu size={18} />
        )}
      </button>
    </header>
  );
};

export default Header;
