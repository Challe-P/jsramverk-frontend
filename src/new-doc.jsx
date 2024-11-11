import React from "react";
import { useNavigate } from "react-router-dom";
import "./doc.css";
import { NewPath } from './minor-components/new-path.jsx';
import { useEffect } from "react";

export default function NewDoc({token, setToken} ) {
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) { //Changed from auth.token
            navigate('/login', { state: { message: "Log in to create documents."}});    
        }
    }, [navigate, token]);

    if (!token) return null;

    return (
        <NewPath token={token} setToken={setToken} />
    );
}
