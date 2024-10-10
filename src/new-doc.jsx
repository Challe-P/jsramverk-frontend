import "./doc.css";
import { NewForm } from './forms/new-form.jsx';
import auth from './models/auth.js';

export default function NewDoc() {
    if (auth.token) {
        console.log(auth.token);
    } else {
        console.log("token not found");
    }
    return (
        <NewForm />
    );
}
