import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {!isHomePage && <Header />}
      <main className={isHomePage ? '' : 'flex-1'}>
        {children}
      </main>
      {!isHomePage && <Footer />}
    </div>
  );
};

export default Layout;