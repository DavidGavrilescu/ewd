import React, { useState, useRef, useEffect } from 'react';
import '../assets/scss/Chatbot.scss';

interface Mesaj {
  text: string;
  trimis: boolean; // true = trimis de utilizator, false = primit
  inScriere?: boolean;
  textComplet?: string;
}

interface Intrebare {
  text: string;
  sugestii: Array<{
    text: string,
    cuvinteCheie: string[],
    raspuns: string
  }>;
}

const Chatbot: React.FC = () => {
  const intrebari: Intrebare[] = [
    {
      text: "Cum te simti astazi?",
      sugestii: [
        { 
          text: "Bine", 
          cuvinteCheie: ["bine", "super", "excelent", "ok", "fericit", "fericita"],
          raspuns: "Ma bucur sa aud ca te simti bine! O stare pozitiva ajuta foarte mult in activitatile zilnice."
        },
        { 
          text: "Nu prea bine", 
          cuvinteCheie: ["rau", "prost", "nasol", "nu bine", "obosit", "obosita", "trist", "trista"],
          raspuns: "Imi pare rau sa aud asta. Sper ca ziua ta sa devina mai buna. Uneori ajuta sa iei o pauza si sa faci ceva ce iti place."
        },
        { 
          text: "Neutru", 
          cuvinteCheie: ["normal", "neutru", "asa si asa", "ok", "nu stiu"],
          raspuns: "Inteleg, o zi obisnuita. Uneori e bine sa avem si zile linistite."
        }
      ]
    },
    {
      text: "Ce activitate preferata ai?",
      sugestii: [
        { 
          text: "Sport", 
          cuvinteCheie: ["sport", "fotbal", "baschet", "tenis", "alerg", "fitness"],
          raspuns: "Sportul e o alegere excelenta! Ajuta atat corpul cat si mintea sa ramana in forma."
        },
        { 
          text: "Citit", 
          cuvinteCheie: ["citit", "carti", "carte", "citesc", "literatura"],
          raspuns: "Cititul e o activitate minunata! Te ajuta sa-ti dezvolti vocabularul si imaginatia."
        },
        { 
          text: "Film/Seriale", 
          cuvinteCheie: ["film", "serial", "cinema", "netflix", "tv", "vizionat"],
          raspuns: "Filmele si serialele sunt o modalitate grozava de relaxare si de a descoperi povesti noi!"
        },
        { 
          text: "Altele", 
          cuvinteCheie: ["alt", "jocuri", "muzica", "gatit"],
          raspuns: "Interesant! E important sa avem hobbyuri care ne fac placere si ne relaxeaza."
        }
      ]
    },
    {
      text: "Ai avut o zi productiva?",
      sugestii: [
        { 
          text: "Da", 
          cuvinteCheie: ["da", "foarte", "productiv", "productiva", "multa", "multe", "realizat"],
          raspuns: "Felicitari! E o senzatie minunata sa stii ca ai realizat multe intr-o zi."
        },
        { 
          text: "Nu", 
          cuvinteCheie: ["nu", "deloc", "neproductiv", "neproductiva", "lenes", "leneveala"],
          raspuns: "Nu-ti face griji, toti avem zile mai putin productive. Maine e o noua zi cu noi oportunitati!"
        },
        { 
          text: "Asa si asa", 
          cuvinteCheie: ["asa si asa", "partial", "putin"],
          raspuns: "Si zilele cu productivitate medie sunt bune. Important e sa mergem inainte!"
        }
      ]
    }
  ];

  const [mesaje, setMesaje] = useState<Mesaj[]>([]);
  const [input, setInput] = useState<string>('');
  const [intrebareCurenta, setIntrebareCurenta] = useState<Intrebare | null>(null);
  const [sugestieSelectata, setSugestieSelectata] = useState<number | null>(null);
  const [asteaptaRaspuns, setAsteaptaRaspuns] = useState<boolean>(false);
  const [intrebareGataAfisata, setIntrebareGataAfisata] = useState<boolean>(false);
  
  const mesajeRef = useRef<HTMLDivElement>(null);
  const ultimulMesajRef = useRef<HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    if (ultimulMesajRef.current) {
      ultimulMesajRef.current.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'end' 
      });
    } else if (mesajeRef.current) {
      mesajeRef.current.scrollTop = mesajeRef.current.scrollHeight;
    }
  };
  
  useEffect(() => {
    setTimeout(scrollToBottom, 100);
    setTimeout(scrollToBottom, 300);
  }, [mesaje]);
  
  const afiseazaTextProgresiv = (
    textComplet: string, 
    onComplete?: () => void
  ) => {
    let index = 0;
    
    const esteIntrebare = intrebari.some(intrebare => intrebare.text === textComplet);
    
    if (esteIntrebare) {
      setIntrebareGataAfisata(false);
    }
    
    const interval = setInterval(() => {
      if (index <= textComplet.length) {
        setMesaje(prev => {
          const mesajIndex = prev.findIndex(
            m => m.textComplet === textComplet && m.inScriere === true
          );
          
          if (mesajIndex === -1) return prev;
          
          return prev.map((mesaj, i) => 
            i === mesajIndex 
              ? { ...mesaj, text: textComplet.substring(0, index) } 
              : mesaj
          );
        });
        index++;
      } else {
        clearInterval(interval);
        setMesaje(prev => {
          const mesajIndex = prev.findIndex(
            m => m.textComplet === textComplet && m.inScriere === true
          );
          
          if (mesajIndex === -1) return prev;
          
          return prev.map((mesaj, i) => 
            i === mesajIndex 
              ? { ...mesaj, inScriere: false } 
              : mesaj
          );
        });
        
        if (esteIntrebare) {
          setIntrebareGataAfisata(true);
        }
        
        setAsteaptaRaspuns(false);
        
        if (onComplete) {
          onComplete();
        }
      }
    }, 10);
  };
  
  const [stadiiInitializare, setStadiiInitializare] = useState<{
    mesajBunVenit: boolean;
    primaIntrebare: boolean;
  }>({
    mesajBunVenit: false,
    primaIntrebare: false
  });

  useEffect(() => {
    if (mesaje.length === 0 && !stadiiInitializare.mesajBunVenit) {
      setStadiiInitializare(prev => ({...prev, mesajBunVenit: true}));
      
      setMesaje([
        { 
          text: '', 
          trimis: false,
          inScriere: true,
          textComplet: 'Bun venit la Chatbot!'
        }
      ]);
      
      setTimeout(() => {
        afiseazaTextProgresiv('Bun venit la Chatbot!');
      }, 500);
    }
  }, [mesaje.length, stadiiInitializare.mesajBunVenit]);

  useEffect(() => {
    if (
      stadiiInitializare.mesajBunVenit && 
      !stadiiInitializare.primaIntrebare && 
      mesaje.length === 1 && 
      !mesaje[0].inScriere
    ) {
      setStadiiInitializare(prev => ({...prev, primaIntrebare: true}));
      
      setTimeout(() => {
        const intrebareRandom = intrebari[Math.floor(Math.random() * intrebari.length)];
        
        setIntrebareCurenta(intrebareRandom);
        
        setMesaje(prev => [
          ...prev, 
          { 
            text: '', 
            trimis: false,
            inScriere: true,
            textComplet: intrebareRandom.text
          }
        ]);
        
        setTimeout(() => {
          afiseazaTextProgresiv(intrebareRandom.text);
        }, 50);
      }, 1000);
    }
  }, [
    stadiiInitializare.mesajBunVenit, 
    stadiiInitializare.primaIntrebare, 
    mesaje
  ]);
  
  const afiseazaIntrebareNoua = () => {
    if (!intrebareCurenta) return;
    
    let intrebareNoua;
    do {
      intrebareNoua = intrebari[Math.floor(Math.random() * intrebari.length)];
    } while (intrebareNoua.text === intrebareCurenta.text && intrebari.length > 1);
    
    setIntrebareCurenta(intrebareNoua);
    
    setMesaje(prev => [
      ...prev, 
      { 
        text: '', 
        trimis: false,
        inScriere: true,
        textComplet: intrebareNoua.text
      }
    ]);
    
    setTimeout(() => {
      afiseazaTextProgresiv(intrebareNoua.text);
    }, 50);
  };
  
  const verificaRaspuns = (mesaj: string) => {
    if (!intrebareCurenta) return;
    
    setAsteaptaRaspuns(true);
    
    const textLower = mesaj.toLowerCase();
    
    const sugestiiPotrivite = intrebareCurenta.sugestii.filter(sugestie => 
      sugestie.cuvinteCheie.some(cuvant => textLower.includes(cuvant))
    );
    
    if (sugestiiPotrivite.length > 0) {
      const sugestieAleasa = sugestiiPotrivite[0];
      
      setTimeout(() => {
        setMesaje(prev => [
          ...prev,
          { 
            text: '', 
            trimis: false,
            inScriere: true,
            textComplet: sugestieAleasa.raspuns
          }
        ]);
        
        setTimeout(() => {
          afiseazaTextProgresiv(
            sugestieAleasa.raspuns, 
            () => setTimeout(afiseazaIntrebareNoua, 1500)
          );
        }, 50);
      }, 1000);
    } else {
      setTimeout(() => {
        const raspunsGeneric = "Interesant! Apreciez raspunsul tau... (happy for you, or sorry that happened)"; 
        
        setMesaje(prev => [
          ...prev,
          { 
            text: '', 
            trimis: false,
            inScriere: true,
            textComplet: raspunsGeneric
          }
        ]);
        
        setTimeout(() => {
          afiseazaTextProgresiv(
            raspunsGeneric, 
            () => setTimeout(afiseazaIntrebareNoua, 1500)
          );
        }, 50);
      }, 1000);
    }
  };
  
  const trimiteMesaj = () => {
    if (input.trim() && !asteaptaRaspuns) {
      const mesajTrimis = input.trim();
      
      setMesaje([
        ...mesaje,
        {
          text: mesajTrimis,
          trimis: true,
        },
      ]);
      
      setIntrebareGataAfisata(false);
      verificaRaspuns(mesajTrimis);
      setInput('');
      setSugestieSelectata(null);
    }
  };
  
  const trimiteCuvantCheie = (cuvant: string) => {
    if (!asteaptaRaspuns) {
      setMesaje([
        ...mesaje,
        {
          text: cuvant,
          trimis: true,
        },
      ]);
      
      setIntrebareGataAfisata(false);
      verificaRaspuns(cuvant);
      setSugestieSelectata(null);
    }
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-header">
        <h1>Chatbot (fake)</h1>
        <p>Iti pune intrebari si tu raspunzi</p>
      </div>
      
      <div className="chatbot-main">
        <div className="mesaje-container" ref={mesajeRef}>
          {mesaje.map((mesaj, index) => (
            <div 
              key={index} 
              className={`mesaj ${mesaj.trimis ? 'trimis' : 'primit'} ${mesaj.inScriere ? 'in-scriere' : ''}`}
              ref={index === mesaje.length - 1 ? ultimulMesajRef : null}
            >
              <div className="mesaj-continut">
                {mesaj.text}
                {mesaj.inScriere && <span className="cursor-scriere"></span>}
              </div>
            </div>
          ))}
          <div style={{ float:"left", clear: "both", height: "80px" }}></div>
        </div>
        
        {intrebareCurenta && intrebareGataAfisata && !asteaptaRaspuns && (
          <div className="sugestii-container">
            <div className="sugestii-titlu">Poti raspunde cu:</div>
            <div className="sugestii-lista">
              {intrebareCurenta.sugestii.map((sugestie, index) => (
                <div key={index} className="sugestie-grup">
                  <div 
                    className={`sugestie ${sugestieSelectata === index ? 'activ' : ''}`}
                    onClick={() => {
                      if (asteaptaRaspuns) return;
                      
                      if (sugestieSelectata === index) {
                        setSugestieSelectata(null);
                      } else {
                        setSugestieSelectata(index);
                      }
                    }}
                  >
                    {sugestie.text}
                  </div>
                  
                  {sugestieSelectata === index && (
                    <div className="cuvinte-cheie">
                      {sugestie.cuvinteCheie.map((cuvant, idx) => (
                        <span 
                          key={idx} 
                          className="cuvant-cheie"
                          onClick={() => trimiteCuvantCheie(cuvant)}
                        >
                          {cuvant}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
        
        <div className="input-container">
          <textarea 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={asteaptaRaspuns ? "Asteapta raspunsul..." : "Scrie un mesaj..."}
            rows={1}
            className="input-chat"
            disabled={asteaptaRaspuns}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey && !asteaptaRaspuns) {
                e.preventDefault();
                trimiteMesaj();
              }
            }}
          />
          <button 
            className="buton-trimite"
            disabled={!input.trim() || asteaptaRaspuns}
            onClick={trimiteMesaj}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;