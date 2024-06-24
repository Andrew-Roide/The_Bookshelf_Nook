import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchBookInfo } from './data';

export default function HomePage() {
  const [query, setQuery] = useState('');
  const [error, setError] = useState<unknown>();
  const [isLoading, setIsLoading] = useState<boolean>();
  const navigate = useNavigate();

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    try {
      const booksData = await fetchBookInfo(query);
      setError(null);
      navigate('/search-results', { state: { books: booksData } });
    } catch (error) {
      setError('Failed to fetch book info');
      console.error('Error fetching books:', error);
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoading) return <div>Loading...</div>;
  if (error)
    return (
      <div>
        Error loading entries:
        {error instanceof Error ? error.message : 'Unknown Error'}
      </div>
    );

  return (
    <>
      <main>
        <div className="">
          <div className="">
            <div className="">
              <h2>Search A Book</h2>
            </div>
          </div>
          <div className="">
            <div className="">
              <p>
                Discover Your Favorite Books and Authors: Your Next Read Awaits!
                Find, Explore, and Add to Your Book Nook with Ease.
              </p>
            </div>
          </div>
          <div className="">
            <div className="">
              <form className="" onSubmit={handleSearch}>
                <div className="">
                  <label className="" htmlFor="search" />
                  <input
                    type="text"
                    name="search"
                    placeholder="search your book"
                    onChange={(e) => setQuery(e.target.value)}
                    required
                  />
                </div>
                <div className="">
                  <button className="">Search</button>
                </div>
              </form>
            </div>
          </div>
          {error && <div className="error">{error}</div>}
        </div>
      </main>
    </>
  );
}
