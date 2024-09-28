import "./header.css";

function Header() {
    return (
        <header>
            {
                <div className="top">
                    <a href="/"><img src='/images/logo192.png' /></a>
                    <div className="nav">
                    <a href="/"><h1>Home</h1></a>
                    <a href="/new"><h1>New</h1></a>
                </div>
                </div>
            }
        </header>
    );
}

export default Header;
