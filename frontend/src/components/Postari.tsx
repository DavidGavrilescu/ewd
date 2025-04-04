import React, { Fragment, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { animalEmojis, Articol, articole } from "../data/data";

export const CardArticol = ({ title, summary, poza, link }: Articol) => {
  const navigate = useNavigate();
  const gotoArticle = () => navigate(link || "/articol");

  return (
    <div className="card" onClick={gotoArticle}>
      <img
        src={"https://picsum.photos/400/200?" + Math.random()}
        alt="O imagine despre care nu stim nimic"
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
  
  return (
    <Fragment>
      <h3 className="page-title">Ultimele articole</h3>
      <section className="card-container">
        {articole.map((articol, key) => (
          <CardArticol key={key} {...articol} />
        ))}
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
