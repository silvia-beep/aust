import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import MainPage from './MainPage.jsx';
import AuthorProfile from './AuthorProfile.jsx';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/author/:authorId" element={<AuthorProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
