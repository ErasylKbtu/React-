function Navbar() {
    return (
        <nav className="navbar">
            <div className="nav-container">
                <a className="logo" href="#home">
                    KY<span>.</span>
                </a>

                <div className="nav-links">
                    <a href="#home">Home</a>
                    <a href="#about">About</a>
                    <a href="#skills">Skills</a>
                    <a href="#contact">Contact</a>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
