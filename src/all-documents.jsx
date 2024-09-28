//Hooks
import { useEffect, useState } from "react";

//Utility functions
import { getAll } from "./models/fetch";

//Components
import DocContent from "./doc-content";

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
                <a href={'/id/' + doc._id}>{doc.title}</a>
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

