import { Link } from 'react-router-dom';

export default function NavBar() {
  return (
    <>
      <header>
        <div className="">
          <div className="">
            <div className="">
              <h1 className="">The Bookshelf Nook</h1>
            </div>
            <div className="">
              <nav className="">
                <Link to="/" className="navbar-link">
                  Find A Book
                </Link>
                <Link to="/saved-books" className="navbar-link">
                  Your Bookshelf
                </Link>
              </nav>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
