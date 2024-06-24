import { BookInfo } from '../../shared/BookInfo';
import { useState, useEffect } from 'react';
import getSavedBooks from './data';
import { deleteBookId } from './data';

export default function SavedBooks() {
  const [isLoading, setIsLoading] = useState<boolean>();
  const [savedBooks, setSavedBooks] = useState<BookInfo[]>([]);
  const [error, setError] = useState<unknown>();
  const [bookToDelete, setBookToDelete] = useState<BookInfo | null>(null);

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

  async function handleDelete() {
    if (!bookToDelete) return;
    try {
      setIsLoading(true);
      await deleteBookId(bookToDelete.bookId);
      setSavedBooks(
        savedBooks.filter((book) => book.bookId !== bookToDelete.bookId)
      );
      setBookToDelete(null);
    } catch (error) {
      alert(`Error deleting Book: ${error}`);
    } finally {
      setIsLoading(false);
    }
  }
  function openDeleteModal(book: BookInfo) {
    setBookToDelete(book);
  }

  function closeDeleteModal() {
    setBookToDelete(null);
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
      <div>
        <div>
          <h2>Your Booknook</h2>
        </div>
        <div className="search-results-list">
          {savedBooks.length > 0 ? (
            savedBooks.map((book) => (
              <div key={book.googleBookId} className="book-display-info">
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
                    onClick={() => openDeleteModal(book)}>
                    {' '}
                    Delete Book{' '}
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No books found. Please add a book to view your bookshelf!</p>
          )}
        </div>
      </div>
      {bookToDelete && (
        <div className="modal-container d-flex justify-center align-center">
          <div className="modal row">
            <div className="column-full d-flex justify-center">
              <p>Are you sure you want to delete this book?</p>
            </div>
            <div className="column-full d-flex justify-between">
              <button className="modal-button" onClick={closeDeleteModal}>
                Cancel
              </button>
              <button
                className="modal-button red-background white-text"
                onClick={handleDelete}>
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
