import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';

const Layout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const closeSidebar = () => setSidebarOpen(false);

  useEffect(() => {
    const body = document.body;
    if (isSidebarOpen) {
      body.classList.add('overflow-hidden');
    } else {
      body.classList.remove('overflow-hidden');
    }

    return () => {
      body.classList.remove('overflow-hidden');
    };
  }, [isSidebarOpen]);

  return (
    <div className='flex flex-col min-h-screen'>
      <Header
        toggleSidebar={() => setSidebarOpen((prev) => !prev)}
        isSidebarOpen={isSidebarOpen}
      />

      <div className='flex flex-col lg:grid lg:grid-cols-[200px_1fr]'>
        <Sidebar isOpen={isSidebarOpen} closeSidebar={closeSidebar} />
        <main className='flex-1 py-6'>
          <div className='container'>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
