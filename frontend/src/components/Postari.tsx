import React, { Fragment, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { animalEmojis, IArticol } from "../data/data";

export interface TypePostareBackend {
  id: number;
  titlu: string;
  descriere: string;
  etichete: string;
  continut_html: string;
  data_creare: string;
  poza: string | null;
}

export const BackendBaseURL = "http://127.0.0.1:8000/";

export const CardArticol = ({ title, poza, link }: IArticol) => {
  const navigate = useNavigate();
  const gotoArticle = () => navigate(link);

  return (
    <div className="card" onClick={gotoArticle}>
      {poza && <img src={poza} alt={title} />}
      <h4>{title}</h4>
      <span className="emoji">{animalEmojis[Math.floor(Math.random() * animalEmojis.length)]}</span>
    </div>
  );
};

export const Postari: React.FC = () => {
  const butonRef = useRef<HTMLButtonElement>(null);
  const [textCautare, setTextCautare] = useState("");
  const [postari, setPostari] = useState<IArticol[]>([]);

  useEffect(() => {
    fetch(`${BackendBaseURL}api/postari-blog/`)
      .then((response) => response.json())
      .then((data: TypePostareBackend[]) =>
        setPostari(
          data
            .map((postare) => ({
              title: postare.titlu,
              poza: postare.poza ? `${BackendBaseURL}media/${postare.poza}` : null,
              link: `/articol/${postare.id}`,
              continut: postare.continut_html,
              data: postare.data_creare,
              etichete: postare.etichete.split(","),
              summary: postare.descriere,
            }))
            .slice(0, 10) // primele 10 articole
        )
      );
  }, []);

  // verifica pozitia de scroll si gestioneaza vizibilitatea butonului
  useEffect(() => {
    const verificaScroll = () => {
      if (!butonRef.current) return;

      const scrollPosition = window.scrollY || document.documentElement.scrollTop;
      const bottomPosition = document.documentElement.scrollHeight - window.innerHeight - 300;

      if (scrollPosition > 300 && scrollPosition > bottomPosition) {
        butonRef.current.classList.add("vizibil");
      } else {
        butonRef.current.classList.remove("vizibil");
      }
    };

    window.addEventListener("scroll", verificaScroll);

    verificaScroll();

    return () => {
      window.removeEventListener("scroll", verificaScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // filtreaza articolele pe baza textului de cautare
  const articoleFiltrate = postari.filter(
    (articol) =>
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
          articoleFiltrate.map((articol, key) => <CardArticol key={key} {...articol} />)
        ) : (
          <p className="no-results">Nu am gasit articole care sa contina "{textCautare}"</p>
        )}
      </section>

      <button ref={butonRef} className="buton-back-to-top" onClick={scrollToTop} aria-label="Inapoi sus">
        ↑
      </button>
    </Fragment>
  );
};
