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
import { ViewDocument } from './single-doc.jsx';

// Import React styling
import './App.css';
import { NewForm } from './forms/forms';

export default function App() {
    return (
        <Router>

            <div className="App">
                <Header />
                <Routes>

                    <Route path="/update" element={<Doc />} />

                    <Route path="/" element={<GetAllDocuments />} />

                    <Route path="/:id" element={<ViewDocument />} />

                    <Route path="/new" element={<NewForm />} />

                </Routes>
                <Footer />
            </div>

        </Router>
    );
}
