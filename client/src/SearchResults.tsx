import { BookInfo } from '../../shared/BookInfo';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { addBook } from './data';

export default function SearchResults() {
  const [error, setError] = useState<string | null>(null);
  const [confirmationMessage, setConfirmationMessage] = useState<string | null>(
    null
  );
  const location = useLocation();
  const books = location.state?.books as BookInfo[];

  async function handleAddBook(book: BookInfo) {
    try {
      await addBook(book);
      setConfirmationMessage('Book added to your Booknook!');
      setTimeout(() => setConfirmationMessage(null), 4000);
    } catch (error) {
      setError('Failed to add book to library');
    }
  }

  return (
    <>
      <div className="bg-customLightGreen rounded-xl min-h-screen flex flex-col p-6">
        <div className="m-10 text-customBrown text-4xl font-slab font-bold text-shadow-custom text-end">
          <h2>Search Results</h2>
        </div>
        <div
          className={`m-8 p-3 confirmation-message text-customBrown text-2xl font-slab font-bold text-shadow-custom text-center ${
            confirmationMessage ? 'animate-fadeIn' : ''
          }`}>
          {confirmationMessage && <div>{confirmationMessage}</div>}
          {error && <div className="error-message">{error}</div>}
        </div>
        <div className="search-results-list flex flex-wrap items-center justify-center gap-5vw">
          {books ? (
            books.map((book) => (
              <div
                key={book.googleBookId}
                className="book-display-info flex justify-around">
                <div className="book-image w-6vw">
                  <img
                    className="book-img-preview"
                    src={
                      book.bookImage ? book.bookImage : 'default-image-url.png'
                    }
                    alt={book.bookTitle}
                  />
                </div>
                <div className="book-information w-80 ml-4 text-customBrown text-shadow-customNav leading-8 text-lg font-sans">
                  <div className="book-title italic font-bold">
                    {book.bookTitle ? book.bookTitle : 'Title Not Available'}
                  </div>
                  <div className="book-author">
                    {book.bookAuthor ? book.bookAuthor : 'Author Not Available'}
                  </div>
                  <div className="book-num-pages">
                    Pages {book.numOfPages ? book.numOfPages : 'Not Available'}
                  </div>
                  <div className="book-ISBN">
                    ISBN_13: {book.ISBN ? book.ISBN : 'ISBN Not Available'}
                  </div>
                </div>
                <div className="add-book-btn-container flex flex-col-reverse">
                  <button
                    className="add-book-btn bg-customGreen text-customBrown text-shadow-custom text-center shadow-md drop-shadow-2xl rounded p-1"
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
