import "./doc.css";
import { LoginForm } from './forms/login-form';
import { useLocation, useNavigate } from "react-router";
const auth = require('./models/auth.js');

export default function Login() {

    const location = useLocation();
    const message = location.state ? location.state.message : "";

    return (
        <div>
            <h1>{message}</h1>
            <LoginForm />   
        </div>
    );
}

export function Logout() {
    let navigate = useNavigate();
    
    auth.token = "";
    navigate('/login', { state: { 'message': "User was successfully logged out."}});
}
