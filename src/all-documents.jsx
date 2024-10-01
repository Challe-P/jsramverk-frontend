//Hooks
import { useEffect, useState } from "react";

//Utility functions
import { getAll } from "./models/fetch";

//Components
import DocContent from "./doc-content";
import { Link } from "react-router-dom";

export default function AllDocuments() {
    const [docs, setDocs] = useState([]);

    try {
        useEffect(() => {
            const fetchData = async () => {
                    try {
                        const docs = await getAll();
                        console.log(docs.data);
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

        return <ul className="docs">{docItems}</ul>;
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

