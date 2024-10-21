import React, { useState } from 'react';
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
import Register from './register.jsx';
import Login from './login.jsx';
import { Logout } from './login.jsx';

export default function App() {
    const basename = process.env.NODE_ENV === 'production' ? "/~alpt22/editor" : "";
    // console.log("Node env: ", process.env.NODE_ENV, " basename: ", basename)
    const [token, setToken] = useState(localStorage.getItem("token"));

    return (    
        <Router basename={basename}>

            <div className="App">
                <Header token={token} setToken={setToken} />
                <Routes>

                    <Route path="/register" element={<Register />} />

                    <Route path="/login" element={<Login token={token} setToken={setToken} />} />

                    <Route path="/logout" element={<Logout />} />

                    <Route path="/" element={<AllDocuments token={token} setToken={setToken} />} />

                    <Route path="/id/:id" element={<UpdateDoc />} />

                    <Route path="/new" element={<NewDoc token={token} setToken={setToken} />} />

                </Routes>
                <Footer />
            </div>

        </Router>
    );
}
