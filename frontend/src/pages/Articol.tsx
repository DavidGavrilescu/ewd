import { CardArticol } from "../components/Postari";
import { articole } from "../data/data";

export interface IArticolProps {
  titlu: string;
  poza?: string;
  peScurt?: string;
  continut: string;
  data?: string;
  etichete?: string[];
}
export default function Articol({
  titlu,
  poza,
  peScurt,
  continut,
  data,
  etichete,
}: IArticolProps) {
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
              <span>{data}</span>
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
        <section
          className="continut-postare"
          dangerouslySetInnerHTML={{ __html: continut }}
        />
      </article>
      <aside>
        <h3>Articole similare</h3>
        <div className="card-container simplified">
          {articole.slice(0, 3).map((articol, key) => (
            <CardArticol key={key} {...articol} />
          ))}
        </div>
      </aside>
    </div>
  );

  function IconitaData() {
    return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
      <line x1="16" y1="2" x2="16" y2="6"></line>
      <line x1="8" y1="2" x2="8" y2="6"></line>
      <line x1="3" y1="10" x2="21" y2="10"></line>
    </svg>;
  }
}
