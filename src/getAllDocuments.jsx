//Hooks
import { baseURL } from "./utils";
import { useEffect, useState } from "react";


export default function GetAllDocuments() {
    const [docs, setDocs] = useState([]);

    try {
        useEffect(() => {
            fetch(baseURL, {
                headers: {
                    'content-type': 'application/json'
                },
                method: 'GET',
            })
                .then((result) => {
                    return result.json();
                })
                .then((res) => {
                    setDocs(res.data);
                })
                .then(() => {
                    return docs.map((doc) => {
                        console.log(doc);
                        <li> {doc._id}, {doc.title}, {doc.content}</li>;
                    });
                })
                .then((listItems) => {
                    return <ul>{listItems}</ul>;
                });
        }, []);

        let contentMaxLength = 40;

        const docItems = docs.map(doc => <li key={doc._id}><a href={doc._id}>{doc.title}</a><p>{doc.content.slice(0, contentMaxLength)}[...]</p></li>); //should be an array of JSX nodes

        return <ul>{docItems}</ul>;
    } catch (error) {
        console.log("An error occurred.", error);
        return (
            <div className="error">
                <p>An error occured.</p>
                <p>{error}</p>
            </div>
        );
    }
}

