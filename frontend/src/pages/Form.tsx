import React, { useRef, useState } from "react";

// interfata pentru erorile de validare
interface Erori {
  [key: string]: string;
}

// configurare inputuri formular
interface InputConfig {
  id: string;
  eticheta: string;
  tipValidare?: string;
}

const Form: React.FC = () => {
  // referinte pentru inputuri
  const refAdresare = useRef<HTMLSelectElement>(null);
  const refPrenume = useRef<HTMLInputElement>(null);
  const refNume = useRef<HTMLInputElement>(null);
  const refEmail = useRef<HTMLInputElement>(null);
  const refDataNasterii = useRef<HTMLInputElement>(null);
  const refAdresa = useRef<HTMLTextAreaElement>(null);
  
  // state pentru erori
  const [erori, setErori] = useState<Erori>({});
  
  // configurare validare
  const inputuriValidare: InputConfig[] = [
    { id: 'adresare', eticheta: 'adresare' },
    { id: 'prenume', eticheta: 'prenume' },
    { id: 'nume', eticheta: 'nume' },
    { id: 'email', eticheta: 'email', tipValidare: 'email' },
    { id: 'dataNasterii', eticheta: 'data nasterii', tipValidare: 'data' },
    { id: 'adresa', eticheta: 'adresa' },
  ];
  
  // functie care valideaza un input
  const valideazaInput = (nume: string, valoare: string, tipValidare?: string): string => {
    if (!valoare.trim()) {
      return `inputul ${nume} este obligatoriu`;
    }
    
    if (tipValidare === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valoare)) {
      return 'adresa de email nu este valida';
    }
    
    if (tipValidare === 'data') {
      const dataIntrodusa = new Date(valoare);
      const dataAcum = new Date();
      
      if (dataIntrodusa > dataAcum) {
        return 'data nasterii nu poate fi in viitor';
      }
    }
    
    return '';
  };
  
  // obtine valoarea unui input dupa id
  const getValoareInput = (id: string): string => {
    switch (id) {
      case 'adresare': return refAdresare.current?.value || '';
      case 'prenume': return refPrenume.current?.value || '';
      case 'nume': return refNume.current?.value || '';
      case 'email': return refEmail.current?.value || '';
      case 'dataNasterii': return refDataNasterii.current?.value || '';
      case 'adresa': return refAdresa.current?.value || '';
      default: return '';
    }
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // resetare erori
    const eroriNoi: Erori = {};
    
    // validare toate inputurile configurate
    inputuriValidare.forEach(input => {
      const valoare = getValoareInput(input.id);
      const eroare = valideazaInput(input.eticheta, valoare, input.tipValidare);
      if (eroare) eroriNoi[input.id] = eroare;
    });
    
    setErori(eroriNoi);
    
    // daca nu sunt erori, putem trimite datele
    if (Object.keys(eroriNoi).length === 0) {
      alert('Formular trimis cu succes!');
      // aici ar urma logica de trimitere a datelor
    }
  };
  
  // functie pentru afisarea mesajului de eroare
  const afiseazaEroare = (numeInput: string) => {
    return erori[numeInput] ? (
      <span className="eroare">{erori[numeInput]}</span>
    ) : null;
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
        {afiseazaEroare('adresare')}
      </p>
      <p>
        <label>
          Prenume <input ref={refPrenume} name="firstName" id="prenume" />
        </label>
        {afiseazaEroare('prenume')}
      </p>
      <p>
        <label>
          Nume: <input ref={refNume} name="lastName" id="nume" />
        </label>
        {afiseazaEroare('nume')}
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
          <input ref={refEmail} type="email" name="email" id="email" />
        </label>
        {afiseazaEroare('email')}
      </p>
      <p>
        <label>
          Data nasterii:
          <input ref={refDataNasterii} type="date" id="dataNasterii" />
        </label>
        {afiseazaEroare('dataNasterii')}
      </p>
      <p>
        <label>
          Adresa: <textarea ref={refAdresa} name="address" id="adresa" rows={2}></textarea>
        </label>
        {afiseazaEroare('adresa')}
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
