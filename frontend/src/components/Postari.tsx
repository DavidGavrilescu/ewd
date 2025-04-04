import React, { Fragment, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { animalEmojis, Articol, articole } from "../data/data";

// importam imaginile locale
import cat1 from "../assets/img/cat1.jpg";
import cat2 from "../assets/img/cat2.jpg";
import cat3 from "../assets/img/cat3.jpg";
import cat4 from "../assets/img/cat4.jpg";
import cat5 from "../assets/img/cat5.jpg";

// array cu toate imaginile disponibile
const catImages = [cat1, cat2, cat3, cat4, cat5];

export const CardArticol = ({ title, summary, poza, link, index }: Articol & { index: number }) => {
  const navigate = useNavigate();
  const gotoArticle = () => navigate(link || "/articol");

  // folosim numarul indexului pentru a selecta imaginea in ordine
  const imageIndex = index % catImages.length;
  const catImage = catImages[imageIndex];

  return (
    <div className="card" onClick={gotoArticle}>
      <img
        src={catImage}
        alt={`Pisica ${imageIndex + 1}`}
      />
      <h4>{title}</h4>
      <span className="emoji">
        {animalEmojis[Math.floor(Math.random() * animalEmojis.length)]}
      </span>
    </div>
  );
};

export const Postari: React.FC = () => {
  const butonRef = useRef<HTMLButtonElement>(null);
  const [textCautare, setTextCautare] = useState("");
  
  // verifica pozitia de scroll si arata/ascunde butonul
  useEffect(() => {
    const verificaScroll = () => {
      if (!butonRef.current) return;
      
      const scrollPosition = window.scrollY || document.documentElement.scrollTop;
      const bottomPosition = document.documentElement.scrollHeight - window.innerHeight - 300;
      
      if (scrollPosition > 300 && scrollPosition > bottomPosition) {
        butonRef.current.classList.add('vizibil');
      } else {
        butonRef.current.classList.remove('vizibil');
      }
    };
    
    window.addEventListener('scroll', verificaScroll);
    
    // verificam starea initiala
    verificaScroll();
    
    return () => {
      window.removeEventListener('scroll', verificaScroll);
    };
  }, []);
  
  // functie pentru a derula inapoi in sus
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  // filtram articolele in functie de textul de cautare
  const articoleFiltrate = articole.filter(articol => 
    textCautare === "" || 
    articol.title.toLowerCase().includes(textCautare.toLowerCase()) ||
    (articol.summary && articol.summary.toLowerCase().includes(textCautare.toLowerCase()))
  );
  
  return (
    <Fragment>
      <div className="header-container">
        <h3 className="page-title">Ultimele articole</h3>
        <div className="search-container">
          <input
            type="text"
            placeholder="Cauta articole..."
            value={textCautare}
            onChange={(e) => setTextCautare(e.target.value)}
            className="search-input"
          />
        </div>
      </div>
      
      <section className="card-container">
        {articoleFiltrate.length > 0 ? (
          articoleFiltrate.map((articol, key) => (
            <CardArticol key={key} index={key} {...articol} />
          ))
        ) : (
          <p className="no-results">Nu am gasit articole care sa contina "{textCautare}"</p>
        )}
      </section>
      
      <button 
        ref={butonRef}
        className="buton-back-to-top"
        onClick={scrollToTop}
        aria-label="Inapoi sus"
      >
        ↑
      </button>
    </Fragment>
  );
};
