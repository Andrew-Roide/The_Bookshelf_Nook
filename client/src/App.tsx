import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './NavBar';
import HomePage from './HomePage';
import SearchResults from './SearchResults';
import SavedBooks from './SavedBooks';
import RegistrationForm from './RegistrationForm';
import './App.css';

export default function App() {
  return (
    <>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search-results" element={<SearchResults />} />
          <Route path="/saved-books" element={<SavedBooks />} />
          <Route path="/register" element={<RegistrationForm />} />
        </Routes>
      </Router>
    </>
  );
}
