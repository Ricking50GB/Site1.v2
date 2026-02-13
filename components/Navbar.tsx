import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { Menu, X, LogOut, User as UserIcon, Wrench, Sun, Moon, UserCog } from 'lucide-react';
import Button from './Button';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  // Helper to determine if a link is active
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center gap-2" onClick={closeMenu}>
              <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center transform -skew-x-12">
                <Wrench className="w-5 h-5 text-white transform skew-x-12" />
              </div>
              <span className="font-bold text-xl text-slate-900 dark:text-white tracking-tight uppercase italic">Welington <span className="text-red-600">Motors</span></span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
             {/* Theme Toggle Desktop */}
             <button 
                onClick={toggleTheme}
                className="p-2 rounded-full text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 transition-colors"
                aria-label="Toggle Dark Mode"
             >
                {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
             </button>

            {user ? (
              <>
                <Link to="/dashboard">
                  <Button variant={isActive('/dashboard') ? 'primary' : 'ghost'}>
                    Mi Garaje
                  </Button>
                </Link>
                <Link to="/profile">
                  <Button variant={isActive('/profile') ? 'primary' : 'ghost'} className="flex items-center gap-2">
                    <UserCog className="w-4 h-4" />
                    Mi Usuario
                  </Button>
                </Link>
                <div className="h-6 w-px bg-slate-200 dark:bg-slate-700 mx-2"></div>
                <span className="text-sm text-slate-600 dark:text-slate-300 flex items-center gap-2">
                   {user.profilePicture ? (
                     <img 
                      src={user.profilePicture} 
                      alt={user.name} 
                      className="w-8 h-8 rounded-full object-cover border border-slate-200 dark:border-slate-700 shadow-sm"
                     />
                   ) : (
                     <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                        <UserIcon className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                     </div>
                   )}
                </span>
                <Button variant="outline" onClick={logout} className="ml-2">
                  <LogOut className="w-4 h-4" />
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost">Area Clientes</Button>
                </Link>
                <Link to="/register">
                  <Button variant="primary">Registrarse</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden gap-2">
             <button 
                onClick={toggleTheme}
                className="p-2 rounded-full text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 transition-colors"
             >
                {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
             </button>
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-500"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {user ? (
              <>
                <div className="px-3 py-2 text-base font-medium text-slate-700 dark:text-slate-200 flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 mb-2">
                   {user.profilePicture ? (
                     <img 
                      src={user.profilePicture} 
                      alt={user.name} 
                      className="w-8 h-8 rounded-full object-cover"
                     />
                   ) : (
                     <UserIcon className="w-5 h-5 text-slate-400" />
                   )}
                  <span className="truncate">Conductor: {user.name}</span>
                </div>
                <Link
                  to="/dashboard"
                  onClick={closeMenu}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/dashboard') ? 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                >
                  Mi Garaje
                </Link>
                <Link
                  to="/profile"
                  onClick={closeMenu}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/profile') ? 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                >
                  Mi Usuario
                </Link>
                <button
                  onClick={() => {
                    logout();
                    closeMenu();
                  }}
                  className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800"
                >
                  Cerrar Sesión
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={closeMenu}
                  className="block px-3 py-2 rounded-md text-base font-medium text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800"
                >
                  Area Clientes
                </Link>
                <Link
                  to="/register"
                  onClick={closeMenu}
                  className="block px-3 py-2 rounded-md text-base font-medium text-red-600 hover:text-red-800 hover:bg-red-50 dark:hover:bg-red-900/20"
                >
                  Registrarse
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;