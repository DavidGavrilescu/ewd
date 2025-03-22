import { useState } from "react";
import { Link } from "react-router-dom";
import Container from "./Container";
import Logo from "./Logo";

export default function Header() {
    const [hamburgerMenu, setHamburgerMenu] = useState(false);
    const openHamburgerMenu = () => {
      setHamburgerMenu(!hamburgerMenu);
    }
  
    const openClass = hamburgerMenu ? "open" : "";
    return <header className="mainHeader">
        <Container>
            {hamburgerMenu ? null : <Logo />}
            <nav id="mainNav" className={openClass}>
                <Link to="/">Acasa</Link>
                <Link to="/despre">Despre</Link>
                <Link to="/form">Form</Link>
                <Link to="/gallery">Galerie</Link>
            </nav>
            <div id="hamburger" className={openClass} onClick={openHamburgerMenu}>
                <div className="line"></div>
                <div className="line"></div>
                <div className="line"></div>
            </div>
        </Container>
    </header>
}