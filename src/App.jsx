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



export default function App() {
    const basename = process.env.NODE_ENV === 'production' ? "/~alpt22/editor" : "";
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
