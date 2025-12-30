import '../css/header.css';

function Header() {
    return(
        <header className="header">
            <img src="/img/logo-large.svg" alt="Logo" />
            <div className="container-best">
                <img src="/img/icon-personal-best.svg" alt="Personal best" />
                <p>Personal best: <span>92 WPM</span></p>
            </div>
        </header>
    );
}

export default Header;