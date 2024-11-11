import React, { useEffect } from 'react';
import { addOne } from "../models/fetch";
import { useNavigate } from 'react-router-dom';

export function NewPath({token}) {
    const navigate = useNavigate();

    useEffect(() => {
        const createNewDoc = async () => {
            const response = await addOne(token);
            navigate("/id/" + response.insertedId, { state: { message: "Document successfully created!"}});
        }

        createNewDoc();
    }, [navigate]);

    return null;
}
