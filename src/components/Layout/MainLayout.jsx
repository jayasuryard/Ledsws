import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import useStore from '../../store/useStore';

const MainLayout = () => {
  const { theme } = useStore();

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-950' : 'bg-gray-50'}`}>
      <Sidebar />
      <Header />
      <main className="ml-72 mt-16 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
