import React, { useEffect } from 'react';
import { addOne } from "../models/fetch";
import { useNavigate } from 'react-router-dom';

export function NewForm({token}) {
    const navigate = useNavigate();

    useEffect(() => {
        const createNewDoc = async () => {
            const response = await addOne(token);
            let res = await response.json();
            navigate("/id/" + res.insertedId, { state: { message: "Document successfully created!"}});
        }

        createNewDoc();
    }, [navigate]);

    return null;
}
