import { useNavigate } from "react-router";
import "./doc.css";
import { NewForm } from './forms/new-form.jsx';
import auth from './models/auth.js';
import { useEffect } from "react";

export default function NewDoc({token, setToken} ) {
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) { //Changed from auth.token
            navigate('/login', { state: { message: "Log in to create documents."}});    
        }
        
    }, []);

    return (
        <NewForm />
    );
}
