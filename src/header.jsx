import { Link } from "react-router-dom";
import "./header.css";

function Header() {
    return (
        <header>
            {
                <div className="top">
                    <Link to="/"><img src='logo192.png' /></Link>
                    <div className="nav">
                    <Link to="/"><h1>Home</h1></Link>
                    <Link to="/new"><h1>New</h1></Link>
                </div>
                </div>
            }
        </header>
    );
}

export default Header;
