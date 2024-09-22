//Hooks
import { useParams } from 'react-router-dom';

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
                console.log(docs);
            })
            .then(() => {
                return docs.map((doc) => {
                    console.log(doc);
                    <li>{doc._id}, {doc.title}, {doc.content}</li>
                })
            })
            .then((listItems) => {
                return <ul>{listItems}</ul>;
            })
        }, []);

        const docItems = docs.map(doc => <li><a href={doc._id}>{doc.title}</a></li>); //should be an array of JSX nodes

        return <ul>{docItems}</ul>;
        
    } catch (error) {
        console.log("An error occurred.", error);
        return (
            <div className="error">
                <p>An error occured.</p>
                <p>{error}</p>
            </div>
        )
    }
}

export function ViewDocument() {
    //Use Hook useParams to get parameters.
    //Fetch should use the API /:id route and not perform a new fetch request
    let { id } = useParams();

    return (
    <div>
        <h1>Title</h1>    
        <ul>
            <li>{id}</li>
        </ul>
    </div>
    );

}
