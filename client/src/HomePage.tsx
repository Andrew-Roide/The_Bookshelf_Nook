import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchBookInfo } from './data';

export default function HomePage() {
  const [query, setQuery] = useState('');
  const [error, setError] = useState<string | null>(null);
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
        Error loading books:
        {error}
      </div>
    );

  return (
    <>
      <main>
        <div className="bg-customLightGreen rounded-xl min-h-screen flex flex-col items-center p-6">
          <div className="m-10 text-customBrown text-4xl font-slab font-bold text-shadow-custom">
            <h2>Search A Book</h2>
          </div>
          <div className="text-customBrown text-2xl font-slab font-bold text-shadow-custom max-w-lg text-center my-8">
            <p>
              Discover Your Favorite Books and Authors: Your Next Read Awaits!
              Find, Explore, and Add to Your Booknook with Ease.
            </p>
          </div>
          <div className="m-8 w-full">
            <div className="form-container">
              <form
                className="flex items-center flex-col"
                onSubmit={handleSearch}>
                <div className="shadow-md drop-shadow-2xl">
                  <label className="" htmlFor="search" />
                  <input
                    type="text"
                    name="search"
                    className="rounded bg-gray-100 pl-2 w-full sm:w-80 md:w-96"
                    placeholder="search your book"
                    onChange={(e) => setQuery(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <button className="m-9 p-1.5 w-24 font-sans bg-customGreen text-customBrown text-shadow-custom text-center shadow-md drop-shadow-2xl rounded">
                    Search
                  </button>
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
