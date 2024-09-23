import { getOne } from './models/fetch';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";

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
        // Detta ska ju egentligen vara ett formulär som kallar på update.
        <div>
            <input type='text' name='title' defaultValue={title}></input>
            <div>
                <textarea name="content" defaultValue={content}></textarea>
                <input name="id" defaultValue={id} hidden></input>
            </div>
        </div>
    );
}
