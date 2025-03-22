import React, { useRef } from "react";

const Form: React.FC = () => {
  const refAdresare = useRef(null);
  const refPrenume = useRef(null);
  const refNume = useRef(null);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <form id="form" onSubmit={handleFormSubmit}>
      <h2 className="page-title">Pagina formularului</h2>
      <p>
        Nu este clar ce facem in acest formular dar vom afla in tema urmatoare.
      </p>
      <p>
        <label>
          Adresare
          <select ref={refAdresare} id="adresare" name="adresare">
            <option value="">--Niciuna--</option>
            <option value="domn">Domn</option>
            <option value="doamna">Doamna</option>
            <option value="dr">Dr.</option>
            <option value="prof">Prof.</option>
          </select>
        </label>
      </p>
      <p>
        <label>
          Prenume <input ref={refPrenume} name="firstName" id="prenume" />
        </label>
      </p>
      <p>
        <label>
          Nume: <input ref={refNume} name="lastName" id="nume" />
        </label>
      </p>
      <p>
        Gen (optional):
        <label>
          <input type="radio" name="gender" value="male" id="male" />
          Masculin
        </label>
        <label>
          <input type="radio" name="gender" value="female" id="female" />
          Feminin
        </label>
      </p>
      <p>
        <label>
          Email:
          <input type="email" name="email" id="email" />
        </label>
      </p>
      <p>
        <label>
          Data nasterii:
          <input type="date" id="dataNasterii" />
        </label>
      </p>
      <p>
        <label>
          Adresa: <textarea name="address" id="adresa" rows={2}></textarea>
        </label>
      </p>
      <p>
        Va place blogul? (optional) &nbsp;
        <input id="place" type="checkbox" name="da" /> Da
        <input id="displace" type="checkbox" /> Nu
      </p>
      <p>
        <button type="submit">Trimite</button>
      </p>
    </form>
  );
};

export default Form;
