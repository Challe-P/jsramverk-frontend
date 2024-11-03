import "./doc.css";
import { LoginForm } from './forms/login-form';
import { useLocation } from "react-router-dom";

export default function Login({token, setToken}) {

    const location = useLocation();
    const message = location.state ? location.state.message : "";

    return (
        <div className="container">
            <h1>{message}</h1>
            <LoginForm token={token} setToken={setToken} />   
        </div>
    );
}
