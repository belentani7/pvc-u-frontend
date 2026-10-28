import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const location = useLocation();
  
  const navLinks = [
    { name: 'Inicio', path: '/' },
    { name: 'Validar', path: '/validate' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Guía', path: '/docs' },
  ];
  
  return (
    <nav aria-label="Navegación principal" className="glass-card m-4 p-4 flex flex-wrap justify-between items-center gap-3 glow-border">
      <Link to="/" aria-label="PVC-U — Inicio" className="text-xl font-bold neon-text">
        PVC-U
      </Link>
      
      <div className="flex flex-wrap gap-2 sm:gap-4">
        {navLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            aria-current={location.pathname === link.path ? 'page' : undefined}
            className={`px-3 py-2 text-sm rounded-lg transition-all duration-200 ${
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
