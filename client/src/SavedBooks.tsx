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

  async function handleDelete(bookId: number) {
    if (!bookToDelete) return;
    try {
      setIsLoading(true);
      await deleteBookId(bookId);
      setSavedBooks(savedBooks.filter((book) => book.bookId !== bookId));
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
      <div className="bg-customLightGreen rounded-xl min-h-screen flex flex-col p-6">
        <div className="m-10 text-customBrown text-4xl font-slab font-bold text-shadow-custom text-end">
          <h2>Your Booknook</h2>
        </div>
        <div className="saved-books-list flex flex-wrap items-center justify-center gap-5vw">
          {savedBooks.length > 0 ? (
            savedBooks.map((book) => (
              <div
                key={book.googleBookId}
                className="book-display-info flex justify-around">
                <div className="book-image">
                  <img
                    className="book-img-preview w-6vw"
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
                    Pages {book.numOfPages ? book.numOfPages : 'Not Available'}{' '}
                  </div>
                  <div className="book-ISBN">
                    ISBN_13: {book.ISBN ? book.ISBN : 'ISBN Not Available'}
                  </div>
                </div>
                <div className="delete-book-btn-container flex flex-col-reverse">
                  <button
                    className="delete-book-btn bg-customGreen text-customBrown text-shadow-custom text-center shadow-md drop-shadow-2xl rounded p-1"
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
        <div className="">
          <div className="">
            <div className="">
              <p>Are you sure you want to delete this book?</p>
            </div>
            <div className="">
              <button className="modal-button" onClick={closeDeleteModal}>
                Cancel
              </button>
              <button
                className=""
                onClick={() => handleDelete(bookToDelete.bookId)}>
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
