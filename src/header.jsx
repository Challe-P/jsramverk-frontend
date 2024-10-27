import { Link } from "react-router-dom";
import "./header.css";

function Header({token, setToken}) {

    const logoutHandler = () => {
        sessionStorage.clear("token");
        setToken(null);
        
        console.log("Token has been cleared.");
    }

    return (
        <header>
            {
                <div className="top">
                    
                    <Link to="/"><img className="logo" src='./logo192.png' /></Link>
                    <div className="nav">
                        <Link to="/"><h1>Home</h1></Link>
                        <Link to="/register"><h1>Register</h1></Link>
                        {token ? 
                        <Link to="/login" onClick={logoutHandler}><h1>Logout</h1></Link>
                        :
                        <Link to="/login"><h1>Login</h1></Link>
                        }
                        
                        <Link to="/new"><h1>New</h1></Link>
                    </div>
                </div>
            }
        </header>
    );
}

export default Header;
