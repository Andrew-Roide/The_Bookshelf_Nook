import { BookInfo } from '../../shared/BookInfo';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { addBook } from './data';

export default function SearchResults() {
  const [error, setError] = useState<string | null>(null);
  const location = useLocation();
  const books = location.state?.books as BookInfo[];

  async function handleAddBook(book: BookInfo) {
    try {
      await addBook(book);
    } catch (error) {
      setError('Failed to add book to library');
    }
  }
  return (
    <>
      <div>
        <div>
          <h2>Search Results</h2>
        </div>
        <div className="search-results-list">
          {books ? (
            books.map((book) => (
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
                  <button
                    className="add-book-btn"
                    onClick={() => handleAddBook(book)}>
                    Add Book
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No results found.</p>
          )}
        </div>
        {error && <p>{error}</p>}
      </div>
    </>
  );
}
