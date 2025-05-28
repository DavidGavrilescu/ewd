import { useState, useEffect } from "react";
import "../assets/scss/galerie.scss";
import { BackendBaseURL } from "../components/Postari";

interface IElementGalerie {
  poza: string;
  id: number;
  descriere: string;
}
export default function Galerie() {
  // array cu imaginile din galerie
  const [imagini, setImagini] = useState<IElementGalerie[]>([]);

  // preia pozele de la adresa specificata
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/elemente-galerie/")
      .then((response) => response.json())
      .then((elemente: IElementGalerie[]) => setImagini(elemente));
  }, []);

  // stare pentru a tine evidenta imaginii active
  const [indexActiv, setIndexActiv] = useState(0);

  // functie pentru schimbarea imaginii active
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
        {imagini.map(({ poza: imagine, descriere }, index) => (
          <div
            key={index}
            className={`imagine-card ${index === indexActiv ? "activ" : ""}`}
            onClick={() => imagineaUrmatoare()}
          >
            <img src={`${BackendBaseURL}media/${imagine}`} alt={descriere} />
          </div>
        ))}
      </div>
      <div className="butoane-slider">
        {imagini.map((_, index) => (
          <button key={index} className={index === indexActiv ? "activ" : ""} onClick={() => schimbaImagine(index)} />
        ))}
      </div>
    </div>
  );
}
