//Hooks
import { useEffect, useState } from "react";

//Utility functions
import { getAll } from "./models/fetch";

//Components
import DocContent from "./doc-content";
import { Link, useLocation, useNavigate } from "react-router-dom";

import auth from "./models/auth.js";

export default function AllDocuments() {
    const navigate = useNavigate();

    useEffect(() => {
        if (!auth.token) {
            navigate('/login', { state: { message: "Log in to view your documents."}});    
        }
        
    }, []);

    const [docs, setDocs] = useState([]);
    const location = useLocation();
    const message = location.state ? location.state.message : "";

    try {
        useEffect(() => {
            const fetchData = async () => {
                    try {
                        const docs = await getAll();
                        setDocs(docs.data);
                    } catch (error) {
                        console.error(error);
                    }
                };
            fetchData();
        }, []);

        const docItems = docs.map(doc => 
            <li key={doc._id}>
                <Link to={'/id/' + doc._id}>{doc.title}</Link>
                <DocContent doccontent={doc.content} />
            </li>
        );
        
        const content = (docs.length) ? <ul className="docs">{docItems}</ul> : <h3>Create some new documents.</h3>;

        return(
            <div>
                <h1>{message}</h1>
                {content}
            </div>
        );

    } catch (error) {
        console.error("An error occurred.", error);
        return (
            <div className="error">
                <p>An error occured.</p>
                <p>{error}</p>
            </div>
        );
    }
}

