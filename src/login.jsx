import "./doc.css";
import { LoginForm } from './forms/login-form';
import { useLocation, useNavigate } from "react-router";
const auth = require('./models/auth.js');

export default function Login({token, setToken}) {

    const location = useLocation();
    const message = location.state ? location.state.message : "";

    return (
        <div>
            <h1>{message}</h1>
            <h2>{token}</h2>
            <LoginForm token={token} setToken={setToken} />   
        </div>
    );
}

export function Logout() {
    let navigate = useNavigate();
    localStorage.clear("token");
    
    auth.token = "";
    navigate('/login', { state: { 'message': "User was successfully logged out."}});
}
