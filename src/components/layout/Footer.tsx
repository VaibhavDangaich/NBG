import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <div className="text-lg font-bold">NBG</div>
            <div className="text-sm text-gray-400">NEET Battleground</div>
          </div>
          
          <div className="text-sm text-gray-400">
            © {new Date().getFullYear()} NBG. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;