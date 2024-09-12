import React from 'react';
import logo from './logo.svg';
import Header from './header';
import Doc from './doc';
import Footer from './footer';

import './App.css';

function App() {
  function handleSubmit() {
    console.log(FormData);
  }

  return (
    <div className="App">
      <Header />
      <Doc onSubmit={handleSubmit}/>
      <Footer />
    </div>
  );
}

export default App;
