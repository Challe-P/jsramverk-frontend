import React from "react";
import { useNavigate } from "react-router-dom";
import "./doc.css";
import { NewForm } from './forms/new-form.jsx';
import { useEffect } from "react";

export default function NewDoc({token, setToken} ) {
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) { //Changed from auth.token
            navigate('/login', { state: { message: "Log in to create documents."}});    
        }
        
    }, [navigate, token]);

    return (
        <NewForm token={token} setToken={setToken} />
    );
}
