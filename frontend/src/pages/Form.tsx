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
    terms: false
  });
  
  const [erori, setErori] = useState<Erori>({});
  const [trimis, setTrimis] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      [name]: checked
    });
  };
  
  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
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
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (valideazaFormular()) {
      setTimeout(() => {
        console.log("Date formular trimise:", formData);
        setTrimis(true);
      }, 800);
    }
  };
  
  const afiseazaEroare = (numeInput: string) => {
    return erori[numeInput] ? (
      <span className="eroare">{erori[numeInput]}</span>
    ) : null;
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
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore 
            et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut 
            aliquip ex ea commodo consequat.
          </p>
          <p>
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
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
                {afiseazaEroare('nume')}
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
                {afiseazaEroare('email')}
              </div>
              
              <div className="form-group">
                <label htmlFor="subiect">Ce subiecte te intereseaza?</label>
                <select 
                  id="subiect" 
                  name="subiect"
                  value={formData.subiect}
                  onChange={handleChange}
                >
                  <option value="">-- Alege un subiect --</option>
                  <option value="mancare">Mancarea si conservele preferate</option>
                  <option value="somn">Tehnici avansate de somn (18+ ore)</option>
                  <option value="jucarii">Jucarii care merita distruse</option>
                  <option value="stapani">Cum sa-ti dresezi stapanul</option>
                  <option value="teritoriu">Marcarea teritoriului pentru incepatori</option>
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="pisici">Numarul de pisici care te stapanesc</label>
                <div className="radio-group">
                  <label className="radio-label">
                    <input 
                      type="radio" 
                      name="pisici" 
                      value="0" 
                      checked={formData.pisici === "0"}
                      onChange={handleRadioChange}
                    /> 
                    <span>0 (dar vreau sa fiu stapanit)</span>
                  </label>
                  <label className="radio-label">
                    <input 
                      type="radio" 
                      name="pisici" 
                      value="1" 
                      checked={formData.pisici === "1"}
                      onChange={handleRadioChange}
                    /> 
                    <span>1 (am un stapan)</span>
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
                    <span>4+ (casa mea e un regat felin)</span>
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
                {afiseazaEroare('mesaj')}
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
                  <input 
                    type="checkbox" 
                    name="terms"
                    checked={formData.terms}
                    onChange={handleCheckboxChange}
                  />
                  <span>Sunt de acord cu termenii si conditiile (pisica mea a citit si a aprobat) *</span>
                </label>
                {afiseazaEroare('terms')}
              </div>
              
              <button type="submit" className="btn-submit">
                <span className="btn-text">Trimite Miau</span>
                <span className="btn-icon">🐾</span>
              </button>
              
              <p className="form-note">* Campurile marcate sunt obligatorii (la fel cum pisicile considera obligatoriu sa te trezeasca la 4 dimineata)</p>
            </form>
          )}
        </div>
      </div>
    </article>
  );
}
