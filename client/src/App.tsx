import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { BookInfo } from '../../shared/BookInfo';
import NavBar from './NavBar';
import HomePage from './HomePage';
import SearchResults from './SearchResults';
import SavedBooks from './SavedBooks';
import './App.css';

export default function App() {
  const [savedBooks, setSavedBooks] = useState<BookInfo[]>([]);

  const addBookToLibrary = (book: BookInfo) => {
    setSavedBooks((prevBooks) => [...prevBooks, book]);
  };

  return (
    <>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/search-results"
            element={<SearchResults addBookToLibrary={addBookToLibrary} />}
          />
          <Route
            path="/saved-books"
            element={<SavedBooks savedBooks={savedBooks} />}
          />
        </Routes>
      </Router>
    </>
  );
}
