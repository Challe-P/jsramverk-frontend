import React from "react";
import { useEffect, useState } from "react";
import { getAll } from "./models/fetch";
import DocContent from "./doc-content";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function AllDocuments({token}) {
    const navigate = useNavigate();
    useEffect(() => {
        if (!token) {
            navigate('/login', { state: { message: "Log in to view your documents."}});    
        }
    }, [navigate, token]);

    const [docs, setDocs] = useState([]);
    const location = useLocation();
    const message = location.state ? location.state.message : "";

    try {
        useEffect(() => {
            const fetchData = async () => {
                    try {
                        const docs = await getAll(token);
                        console.log(docs);
                        setDocs(docs.data);
                    } catch (error) {
                        console.error(error);
                    }
                };
            fetchData();
        }, [token]);
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

