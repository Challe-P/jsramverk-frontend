import React from 'react';
import logo from './logo.svg';

// Import React components
import Header from './header.jsx';
import Footer from './footer.jsx';
import Doc from './doc.jsx';

// Import React styling
import './App.css';


export default function App() {

  return (
    <div className="App">
      <Header />
      <Doc />
      <Footer />
    </div>
  );
}
