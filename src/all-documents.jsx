//Hooks

import { useEffect, useState } from "react";
import { getAll } from "./models/fetch";

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
        docs.map((doc) => {
            console.log(doc);
            <li> {doc._id}, {doc.title}, {doc.content}</li>;
        });

        let contentMaxLength = 40;

        const docItems = docs.map(doc => <li key={doc._id}><a href={'/id/' + doc._id}>{doc.title}</a>
        <p>{doc.content.slice(0, contentMaxLength)}[...]</p></li>); //should be an array of JSX nodes

        return <ul>{docItems}</ul>;
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

