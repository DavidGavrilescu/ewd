import { useParams } from "react-router-dom";
import { BackendBaseURL, CardArticol, TypePostareBackend } from "../components/Postari";
import { IPostare } from "../data/data";
import { useEffect, useState } from "react";

export default function Articol() {
  let { id } = useParams();
  const urlArticol = `${BackendBaseURL}/api/postari-blog/${id}/`;
  const urlArticoleRecente = `${BackendBaseURL}/api/postari-blog/`;

  const [articol, setArticol] = useState<IPostare[] | null>(null);
  const [articoleRecente, setArticoleRecente] = useState<IPostare[]>([]);

  useEffect(() => {
    document.title = "Incarcare articol...";

    fetch(urlArticol)
      .then((response) => response.json())
      .then((postare: TypePostareBackend) =>
        setArticol([
          {
            titlu: postare.titlu,
            poza: postare.poza ? `${BackendBaseURL}media/${postare.poza}` : null,
            data: postare.data_creare,
            etichete: postare.etichete.split(","),
            peScurt: postare.descriere,
            continut: postare.continut_html,
            id: postare.id,
          },
        ])
      );
    fetch(urlArticoleRecente)
      .then((response) => response.json())
      .then((postari: TypePostareBackend[]) => {
        return setArticoleRecente(
          postari.map((postare) => ({
            titlu: postare.titlu,
            poza: postare.poza ? `${BackendBaseURL}media/${postare.poza}` : null,
            data: postare.data_creare,
            etichete: postare.etichete.split(","),
            peScurt: postare.descriere,
            continut: postare.continut_html,
            id: postare.id,
          }))
        );
      });
  }, [id, urlArticol, urlArticoleRecente]);

  const articolObj = articol && articol.length > 0 ? articol[0] : null;
  const { poza, titlu, peScurt, data, etichete, continut } = articolObj || {};

  const formatareData = (dataString: string) => {
    const data = new Date(dataString);
    const acum = new Date();
    const diferenta = acum.getTime() - data.getTime();
    const zile = Math.floor(diferenta / (1000 * 60 * 60 * 24));
    
    if (zile === 0) {
      return "Azi";
    } else if (zile === 1) {
      return "Ieri";
    } else if (zile < 7) {
      return `Acum ${zile} zile`;
    } else if (zile < 30) {
      const saptamani = Math.floor(zile / 7);
      return saptamani === 1 ? "Acum o saptamana" : `Acum ${saptamani} saptamani`;
    } else {
      return data.toLocaleDateString("ro-RO", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    }
  };

  useEffect(() => {
    if (titlu) {
      document.title = titlu;
    }
    return () => {
      document.title = "Articol blog";
    };
  }, [titlu]);

  return (
    <div id="articol">
      <article>
        {poza && <img src={poza} alt={titlu} />}
        <h1 className="huge-title">{titlu}</h1>
        <i>{peScurt}</i>

        <div className="meta-info">
          {data && (
            <div className="data-publicare">
              {IconitaData()}
              <span>{formatareData(data)}</span>
            </div>
          )}

          {etichete && etichete.length > 0 && (
            <div className="etichete-container">
              <div className="etichete-lista">
                {etichete.map((eticheta, index) => (
                  <span className="eticheta" key={index}>
                    #{eticheta}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <hr />
        <section className="continut-postare" dangerouslySetInnerHTML={{ __html: continut || "" }} />
      </article>
      <aside>
        <h3>Articole recente</h3>
        <div className="card-container simplified">
          {articoleRecente.slice(0, 3).map((articol, key) => (
            <CardArticol
              key={key}
              title={articol.titlu}
              poza={articol.poza}
              link={`/articol/${articol.id}`}
              summary={articol.peScurt}
            />
          ))}
        </div>
      </aside>
    </div>
  );

  function IconitaData() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
        <line x1="16" y1="2" x2="16" y2="6"></line>
        <line x1="8" y1="2" x2="8" y2="6"></line>
        <line x1="3" y1="10" x2="21" y2="10"></line>
      </svg>
    );
  }
}
