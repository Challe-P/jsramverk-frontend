import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

// const root = ReactDOM.createRoot(document.getElementById('root'));
const root = ReactDOM.createRoot(document.body);

it('renders without crashing', () => {
  const div = document.createElement('div');
  root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
  , div);
});
