import { BookInfo } from './BookInfo';
import { useLocation } from 'react-router-dom';

type SearchResultsProps = {
  addBookToLibrary: (book: BookInfo) => void;
};
export default function SearchResults({
  addBookToLibrary,
}: SearchResultsProps) {
  const location = useLocation();
  const books = location.state?.books as BookInfo[];
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
                    onClick={() => addBookToLibrary(book)}>
                    Add Book
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No results found.</p>
          )}
        </div>
      </div>
    </>
  );
}
