import { useState } from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";

// Import React components
import Header from './header.jsx';
import Footer from './footer.jsx';
import AllDocuments from './all-documents.jsx';
import NewDoc from './new-doc.jsx';
import UpdateDoc from './update-doc.jsx';
import Register from './register.jsx';
import Login from './login.jsx';

// Import React styling
import './App.css';

export default function App() {
    const basename = process.env.NODE_ENV === 'production' ? "/~alpt22/editor" : "";
    const [token, setToken] = useState(sessionStorage.getItem("token"));

    return (    
        <Router basename={basename}>

            <div className="App">
                <Header token={token} setToken={setToken} />
                <Routes>

                    <Route path="/register" element={<Register />} />

                    <Route path="/login" element={<Login token={token} setToken={setToken} />} />

                    <Route path="/" element={<AllDocuments token={token} setToken={setToken} />} />

                    <Route path="/id/:id" element={<UpdateDoc token={token} setToken={setToken} />} />

                    <Route path="/new" element={<NewDoc token={token} setToken={setToken} />} />

                </Routes>
                <Footer />
            </div>

        </Router>
    );
}
