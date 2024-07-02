import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  function handleSignOut() {
    sessionStorage.removeItem('token');
  }

  return (
    <header>
      <div className="max-w-full my-12 flex justify-between items-center px-4">
        <div className="text-5xl font-slab font-bold text-customGreen text-shadow-customNav">
          <Link to="/">
            <h1>The Bookshelf Nook</h1>
          </Link>
        </div>
        <div className="flex items-center">
          <div className="hidden md:flex gap-10 text-2xl font-slab font-bold text-customGreen text-shadow-customNav">
            <Link to="/" className="navbar-link">
              Find A Book
            </Link>
            <Link to="/saved-books" className="navbar-link">
              Your Booknook
            </Link>
            <Link to="/register">Register</Link>
            <Link to="/sign-in">Sign In</Link>
            <Link to="/" onClick={handleSignOut}>
              Sign Out
            </Link>
          </div>
          <button
            className="md:hidden text-customGreen focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}>
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={
                  isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'
                }></path>
            </svg>
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-customBrown shadow-lg rounded-lg px-4 py-6">
          <nav className="flex flex-col gap-4 text-xl font-slab font-bold text-customGreen text-shadow-customNav">
            <Link to="/" className="navbar-link">
              Find A Book
            </Link>
            <Link to="/saved-books" className="navbar-link">
              Your Booknook
            </Link>
            <Link to="/register">Register</Link>
            <Link to="/sign-in">Sign In</Link>
            <Link to="/" onClick={handleSignOut}>
              Sign Out
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
