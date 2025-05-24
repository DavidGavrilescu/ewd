import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Container from "./Container";
import Logo from "./Logo";

export default function Header() {
  const [hamburgerMenu, setHamburgerMenu] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  const toggleHamburgerMenu = () => {
    setHamburgerMenu(!hamburgerMenu);
  };

  const closeMenu = () => {
    setHamburgerMenu(false);
  };

  useEffect(() => {
    const navElement = navRef.current;
    if (navElement) {
        if (hamburgerMenu) {
            navElement.setAttribute("data-was-open", "true");
        } else {
            const timeoutId = setTimeout(() => {
                if (!hamburgerMenu) {
                    navElement.removeAttribute("data-was-open");
                }
            }, 550);
            return () => clearTimeout(timeoutId);
        }
    }
  }, [hamburgerMenu]);

  const openClass = hamburgerMenu ? "open" : "";
  return (
    <header className="mainHeader">
      <Container>
        <Logo />
        <nav id="mainNav" className={openClass} ref={navRef}>
          <Link to="/" onClick={closeMenu}>Acasa</Link>
          <Link to="/despre" onClick={closeMenu}>Despre</Link>
          <Link to="/form" onClick={closeMenu}>Form</Link>
          <Link to="/gallery" onClick={closeMenu}>Galerie</Link>
          <Link to="/chatbot" onClick={closeMenu}>Chatbot</Link>
        </nav>
        <div id="hamburger" className={openClass} onClick={toggleHamburgerMenu}>
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
        </div>
      </Container>
    </header>
  );
}
