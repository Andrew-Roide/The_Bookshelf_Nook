import { Link } from 'react-router-dom';

export default function NavBar() {
  function handleSignOut() {
    sessionStorage.removeItem('token');
  }

  return (
    <>
      <header>
        <div className="max-w-full my-12 flex justify-between items-center">
          <div className="text-5xl font-slab font-bold text-customGreen text-shadow-customNav">
            <Link to="/">
              <h1>The Bookshelf Nook</h1>
            </Link>
          </div>
          <div className="">
            <nav className="font-slab font-bold flex justify-between gap-10 text-2xl text-customGreen text-shadow-customNav">
              <Link to="/" className="navbar-link">
                Find A Book
              </Link>
              <Link to="/saved-books" className="navbar-link">
                Your Booknook
              </Link>
              <Link to="/register">Register</Link>
              <Link to="/sign-in">Sign In</Link>
              <Link to="/sign-in" onClick={handleSignOut}>
                Sign Out
              </Link>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
}
