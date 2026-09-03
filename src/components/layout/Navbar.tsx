import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const location = useLocation();
  
  const navLinks = [
    { name: 'Dashboard', path: '/' },
    { name: 'Validate', path: '/validate' },
    { name: 'API Docs', path: '/docs' },
  ];
  
  return (
    <nav className="glass-card m-4 p-4 flex justify-between items-center glow-border">
      <Link to="/" className="text-xl font-bold neon-text">
        PVC-U
      </Link>
      
      <div className="flex gap-6">
        {navLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`px-4 py-2 rounded-lg transition-all duration-200 ${
              location.pathname === link.path
                ? 'neon-text bg-[rgba(255,7,58,0.1)]'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {link.name}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
