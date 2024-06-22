import { BookInfo } from '../../shared/BookInfo';
import { useState, useEffect } from 'react';
import getSavedBooks from './data';

export default function SavedBooks() {
  const [isLoading, setIsLoading] = useState<boolean>();
  const [savedBooks, setSavedBooks] = useState<BookInfo[]>([]);
  const [error, setError] = useState<unknown>();

  useEffect(() => {
    async function load() {
      setIsLoading(true);
      try {
        const Books = await getSavedBooks();
        setSavedBooks(Books);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }
    if (isLoading === undefined) load();
  }, [isLoading]);

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
      <div>
        <div>
          <h2>Your Booknook</h2>
        </div>
        <div className="search-results-list">
          {savedBooks.length > 0 ? (
            savedBooks.map((book) => (
              <div key={book.ISBN} className="book-display-info">
                <div className="book-image">
                  <img
                    className="book-img-preview"
                    src={book.bookImage}
                    alt={book.bookTitle}
                  />
                </div>
                <div className="book-information">
                  <div className="book-title">{book.bookTitle}</div>
                  <div className="book-author">{book.bookAuthor}</div>
                  <div className="book-num-pages">{book.numOfPages} pages</div>
                  <div className="book-ISBN">ISBN_13: {book.ISBN}</div>
                </div>
                <div className="add-book-btn-container">
                  <button className="add-book-btn">Delete Book</button>
                </div>
              </div>
            ))
          ) : (
            <p>No books found. Please add a book to view your bookshelf!</p>
          )}
        </div>
      </div>
    </>
  );
}
