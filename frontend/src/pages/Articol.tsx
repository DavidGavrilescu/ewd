import { articole, CardArticol } from "../components/postari";

export interface IArticolProps {
  titlu: string;
  poza?: string;
  peScurt?: string;
  continut: string;
  data?: string;
  etichete?: string[];
}
export default function Articol({ titlu,
  poza, peScurt, continut, data, etichete
}: IArticolProps) {
  return (
    <div id="articol">
      <article>
        {poza && <img src={poza} alt={titlu} />}
        <h1 className="huge-title">{titlu}</h1>
        <i>{peScurt}</i><br />
        <b>Postat in data de: </b><data>{data}</data><br />
        <p><b>Postarea contine informatii despre</b>: {etichete?.map(eticheta => <b>{eticheta}</b>)}</p>
        <hr />
        <section className="continut-postare" dangerouslySetInnerHTML={{ __html: continut }} />
      </article>
      <aside>
        <h3>Articole similare</h3>
        <div className="card-container simplified">{articole.slice(0,3).map(articol => <CardArticol {...articol} />)}
        </div>
      </aside>
    </div>
  )
}
