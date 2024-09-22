//Hooks
import { useParams } from 'react-router-dom';

import { baseURL } from "./utils";
import { useEffect, useState } from "react";

import { getOne } from './models/fetch';

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
    const { id } = useParams();

    const [title, setTitle] = useState([]);
    const [content, setContent] = useState([]);

    (async (id) => {
        const doc = await getOne(id);
        setContent(doc.content);
        setTitle(doc.title);
    })(id);

    return (
    <div>
        <h1>Title: {title}</h1>    
        <ul>
            <li>ID: {id}</li>
            <li>Content: {content}</li>
        </ul>
    </div>
    );

}
