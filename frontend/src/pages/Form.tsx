import React, { useState } from "react";

interface Erori {
  [key: string]: string;
}

interface FormData {
  nume: string;
  email: string;
  subiect: string;
  pisici: string;
  mesaj: string;
  newsletter: boolean;
  terms: boolean;
}

export default function Form() {
  const [formData, setFormData] = useState<FormData>({
    nume: "",
    email: "",
    subiect: "",
    pisici: "",
    mesaj: "",
    newsletter: false,
    terms: false,
  });

  const [erori, setErori] = useState<Erori>({});
  const [trimis, setTrimis] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      [name]: checked,
    });
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const valideazaFormular = (): boolean => {
    const eroriNoi: Erori = {};

    if (!formData.nume.trim()) {
      eroriNoi.nume = "numele este obligatoriu";
    } else if (formData.nume.length < 3) {
      eroriNoi.nume = "numele trebuie sa aiba cel putin 3 caractere";
    }

    if (!formData.email.trim()) {
      eroriNoi.email = "emailul este obligatoriu";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      eroriNoi.email = "adresa de email nu este valida";
    }

    if (!formData.mesaj.trim()) {
      eroriNoi.mesaj = "mesajul este obligatoriu";
    } else if (formData.mesaj.length < 10) {
      eroriNoi.mesaj = "mesajul trebuie sa contina cel putin 10 caractere";
    }

    if (!formData.terms) {
      eroriNoi.terms = "trebuie sa fii de acord cu termenii si conditiile";
    }

    setErori(eroriNoi);
    return Object.keys(eroriNoi).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (valideazaFormular()) {
      try {
        const raspuns = await fetch("http://127.0.0.1:8000/api/mesaje-contact/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nume: formData.nume,
            email: formData.email,
            subiect: formData.subiect,
            numar_pisici: parseInt(formData.pisici) || 0,
            mesaj: formData.mesaj,
            abonat: formData.newsletter,
          }),
        });

        if (!raspuns.ok) {
          throw new Error("Eroare la trimiterea mesajului.");
        }

        const date = await raspuns.json();
        console.log("Mesaj trimis cu succes:", date);
        setTrimis(true);
      } catch (eroare) {
        console.error("Eroare:", eroare);
      }
    }
  };

  const afiseazaEroare = (numeInput: string) => {
    return erori[numeInput] ? <span className="eroare">{erori[numeInput]}</span> : null;
  };

  return (
    <article id="formular-contact-page">
      <div className="formular-header">
        <h2 className="page-title">Trimite-ne un Miau!</h2>
        <p className="subtitle">Pisica ta are o intrebare? Vrei sa ne trimiti o minge de lana?</p>
      </div>

      <div className="formular-container">
        <div className="formular-text">
          <p>
            Salut! Ai ceva de spus pisicilor din echipa noastra? Poate vrei sa ne plangesti ca nu-ti raspundem la mesaje
            sau ca ignoram jucariile scumpe pe care ni le cumperi? Sau poate vrei sa ne feliciti pentru ca am spart iar
            ceva prin casa?
          </p>
          <p>
            Completeaza formularul de mai jos si poate, daca suntem in dispozitie buna si nu dormim, o sa-ti raspundem.
            Nu promitem nimic - suntem pisici, nu servitori. Dar daca mesajul tau e destul de interesant (sau contine
            promisiuni de conserve), s-ar putea sa-ti acordam atentia noastra.
          </p>
        </div>

        <div className="formular-continut">
          {trimis ? (
            <div className="mesaj-succes">
              <h3>Miau! Mesajul a fost trimis cu succes!</h3>
              <p>Pisicile noastre vor analiza mesajul tau si vor reveni cu un raspuns cat de curand.</p>
              <div className="success-icon">🐾</div>
            </div>
          ) : (
            <form className="cat-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="nume">Numele tau uman *</label>
                <input
                  type="text"
                  id="nume"
                  name="nume"
                  placeholder="Servitorul pisicii mele..."
                  value={formData.nume}
                  onChange={handleChange}
                />
                {afiseazaEroare("nume")}
              </div>

              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="unde-sa-trimitem@conserve.com"
                  value={formData.email}
                  onChange={handleChange}
                />
                {afiseazaEroare("email")}
              </div>

              <div className="form-group">
                <label htmlFor="subiect">Ce subiecte te intereseaza?</label>
                <select id="subiect" name="subiect" value={formData.subiect} onChange={handleChange}>
                  <option value="">-- Alege un subiect --</option>
                  <option value="mancare">Mancarea si conservele preferate</option>
                  <option value="somn">Tehnici avansate de somn (18+ ore)</option>
                  <option value="jucarii">Jucarii care merita distruse</option>
                  <option value="sefi">Cum sa-ti dresezi seful</option>
                  <option value="teritoriu">Marcarea teritoriului pentru incepatori</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="pisici">Numarul de pisici care te conduc</label>
                <div className="radio-group">
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="pisici"
                      value="0"
                      checked={formData.pisici === "0"}
                      onChange={handleRadioChange}
                    />
                    <span>0 (dar vreau sa fiu condus)</span>
                  </label>
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="pisici"
                      value="1"
                      checked={formData.pisici === "1"}
                      onChange={handleRadioChange}
                    />
                    <span>1 (am un sef)</span>
                  </label>
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="pisici"
                      value="2-3"
                      checked={formData.pisici === "2-3"}
                      onChange={handleRadioChange}
                    />
                    <span>2-3 (sunt un slujitor bun)</span>
                  </label>
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="pisici"
                      value="4+"
                      checked={formData.pisici === "4+"}
                      onChange={handleRadioChange}
                    />
                    <span>4+ (casa mea e un regat pisicesc)</span>
                  </label>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="mesaj">Mesajul tau pentru noi *</label>
                <textarea
                  id="mesaj"
                  name="mesaj"
                  rows={5}
                  placeholder="Scrie aici mesajul tau... sau lasa-ti pisica sa calce pe tastatura, vom intelege oricum."
                  value={formData.mesaj}
                  onChange={handleChange}
                ></textarea>
                {afiseazaEroare("mesaj")}
              </div>

              <div className="form-group checkbox-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="newsletter"
                    checked={formData.newsletter}
                    onChange={handleCheckboxChange}
                  />
                  <span>Vreau sa ma abonez la Meowsletter-ul vostru saptamanal</span>
                </label>
                <label className="checkbox-label">
                  <input type="checkbox" name="terms" checked={formData.terms} onChange={handleCheckboxChange} />
                  <span>Sunt de acord cu termenii si conditiile (pisica mea a citit si a aprobat) *</span>
                </label>
                {afiseazaEroare("terms")}
              </div>

              <button type="submit" className="btn-submit">
                <span className="btn-text">Trimite Miau</span>
                <span className="btn-icon">🐾</span>
              </button>

              <p className="form-note">
                * Campurile marcate sunt obligatorii (la fel cum pisicile considera obligatoriu sa te trezeasca la 4
                dimineata)
              </p>
            </form>
          )}
        </div>
      </div>
    </article>
  );
}
