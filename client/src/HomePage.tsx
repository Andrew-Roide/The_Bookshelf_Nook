import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookInfo } from './BookInfo';

export default function HomePage() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  async function fetchBooks(query: string) {
    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${query}`
      );
      const data = await response.json();
      const booksData: BookInfo[] = data.items.map((item: any) => ({
        bookImage:
          item.volumeInfo.imageLinks?.thumbnail || 'Title not available',
        bookTitle: item.volumeInfo.title,
        bookAuthor:
          item.volumeInfo.authors?.join(', ') || 'Author not available',
        numOfPages:
          item.volumeInfo.pageCount || 'Number of pages not available',
        ISBN:
          item.volumeInfo.industryIdentifiers?.find(
            (identifier: any) => identifier.type === 'ISBN_13'
          )?.identifier || 'Identifier not available',
      }));
      navigate('/search-results', { state: { books: booksData } });
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  }

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    fetchBooks(query);
  }

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
        </div>
      </main>
    </>
  );
}
