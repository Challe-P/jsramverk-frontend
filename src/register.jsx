import "./doc.css";
import { RegisterForm } from './forms/register-form.jsx';
import { useLocation } from "react-router";

export default function Register() {
    const location = useLocation();
    const message = location.state ? location.state.message : "";

    return (
        <div>
            <h1>{message}</h1>
            <RegisterForm />
        </div>
    );
}
