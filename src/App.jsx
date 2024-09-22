import React from 'react';
import logo from './logo.svg';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

// Import React components
import Header from './header.jsx';
import Footer from './footer.jsx';
import Doc from './doc.jsx';
import GetAllDocuments from './getAllDocuments.jsx';
import { ViewDocument } from './getAllDocuments.jsx';

// Import React styling
import './App.css';

export default function App() {

  return (
    <Router>

    <div className="App">
      <Header />
      <Routes>

        <Route path="/update" element={<Doc />} />

        <Route path="/" element={<GetAllDocuments />} />

        <Route path="/:id" element={<ViewDocument />} />
        

      </Routes>
      <Footer />
    </div>

    </Router>
  );
}
