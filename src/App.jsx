import React from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from "react-router-dom";

// Import React components
import Header from './header.jsx';
import Footer from './footer.jsx';
import AllDocuments from './all-documents.jsx';
import NewDoc from './new-doc.jsx';
import UpdateDoc from './update-doc.jsx';

// Import React styling
import './App.css';

const basename = process.env === 'production' ? "/~alpt22/editor" : "";

export default function App() {
    return (
        <Router basename={basename}>

            <div className="App">
                <Header />
                <Routes>

                    <Route path="/" element={<AllDocuments />} />

                    <Route path="/id/:id" element={<UpdateDoc />} />

                    <Route path="/new" element={<NewDoc />} />

                </Routes>
                <Footer />
            </div>

        </Router>
    );
}
