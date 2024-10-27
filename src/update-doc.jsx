import "./doc.css";
import { UpdateForm } from './forms/update-form.jsx';

export default function UpdateDoc({token, setToken}) {
    return (
        <UpdateForm token={token} setToken={setToken} />
    );
}
