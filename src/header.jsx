import { Link } from "react-router-dom";
import "./header.css";
import auth from "./models/auth.js";

function Header() {

    // if (auth.token) {
    //     console.log("This is the token: ", auth.token);
    // } else {
    //     console.log("No token is set");
    // }

    return (
        <header>
            {
                <div className="top">
                    <Link to="/"><img className="logo" src='./logo192.png' /></Link>
                    <div className="nav">
                    <Link to="/"><h1>Home</h1></Link>
                    <Link to="/register"><h1>Register</h1></Link>
                    <Link to="/login"><h1>Login</h1></Link>
                    <Link to="/new"><h1>New</h1></Link>
                </div>
                </div>
            }
        </header>
    );
}

export default Header;
