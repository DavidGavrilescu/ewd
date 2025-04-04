import { useState, useEffect } from "react";
import '../assets/scss/Galerie.scss';

export default function Galerie() {
  // array cu imaginile din galerie
  const imagini = [
    "/src/assets/img/cat1.jpg",
    "/src/assets/img/cat2.jpg",
    "/src/assets/img/cat3.jpg",
    "/src/assets/img/cat4.jpg",
    "/src/assets/img/cat5.jpg",
  ];
  
  // state pentru a tine evidenta imaginii active
  const [indexActiv, setIndexActiv] = useState(0);
  
  // functie pentru a schimba imaginea activa
  const schimbaImagine = (index: number) => {
    setIndexActiv(index);
  };

  const imagineaUrmatoare = () => {
    setIndexActiv((prevIndex) => (prevIndex + 1) % imagini.length);
  };
  
  // schimba automat imaginea la fiecare 4 secunde
  useEffect(() => {
    const interval = setInterval(() => {
      setIndexActiv((prevIndex) => (prevIndex + 1) % imagini.length);
    }, 4000);
    
    return () => clearInterval(interval);
  }, [imagini.length]);

  return (
    <div id="galerie">
      <h1 className="titlu-animat">Galeria Pisicilor</h1>
      <div className="galerie-container">
        {imagini.map((imagine, index) => (
          <div 
            key={index} 
            className={`imagine-card ${index === indexActiv ? 'activ' : ''}`}
            onClick={() => imagineaUrmatoare()}
          >
            <img src={imagine} alt={`Imagine ${index + 1}`} />
          </div>
        ))}
      </div>
      <div className="butoane-slider">
        {imagini.map((_, index) => (
          <button
            key={index}
            className={index === indexActiv ? 'activ' : ''}
            onClick={() => schimbaImagine(index)}
          />
        ))}
      </div>
    </div>
  );
}
