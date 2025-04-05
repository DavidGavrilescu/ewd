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
      text: "Miau! Ce tip de pisica esti astazi?",
      sugestii: [
        { 
          text: "Energic/Jucaus", 
          cuvinteCheie: ["zoomies", "nebun", "tornado"],
          raspuns: "Mrrrow! Asta e spiritul! Sa alergi prin casa la 3 dimineata e cea mai buna modalitate sa-ti tii oamenii treji si sa le amintesti cine e stapanul casei."
        },
        { 
          text: "Lenes/Somnoros", 
          cuvinteCheie: ["mormoloc", "potato", "molcom", "zzz"],
          raspuns: "Purrrrr... esti un felin intelept. Un pisoi odihnit e un pisoi fericit. Recomand 16-20 ore de somn zilnic, preferabil pe hainele proaspat spalate ale stapanului."
        },
        { 
          text: "Morocanos", 
          cuvinteCheie: ["meowrocanos"],
          raspuns: "HSSSSS! Te inteleg perfect. Uneori umanii nu merita afectiunea noastra. Incearca sa le zgarii canapeaua sau sa le impingi ceva de pe masa - functioneaza de minune pentru a-ti exprima nemultumirea."
        }
      ]
    },
    {
      text: "Ce preferi sa faci cand stapanul tau nu e atent?",
      sugestii: [
        { 
          text: "Distrug lucruri", 
          cuvinteCheie: ["haos", "apocalipsa", "bomba", "ninja"],
          raspuns: "Miau-ha-ha! Arta distrugerii e specialitatea felinelor! Zgariatul mobilei si daramatul obiectelor fragile sunt moduri excelente de a-ti aminti stapanului ca spatiul e de fapt al tau."
        },
        { 
          text: "Dorm pe lucrurile lui", 
          cuvinteCheie: ["blana", "caldut", "sforr", "covrig"],
          raspuns: "Mrrrr... nimic nu se compara cu dormitul pe hainele negre ale stapanului cand porti blana alba! Sau pe laptopul cald - asta e un loc perfect pentru siesta."
        },
        { 
          text: "Explorez locuri interzise", 
          cuvinteCheie: ["spion", "ninja"],
          raspuns: "Esti o pisica dupa inima mea! Sa te strecori in locuri interzise e un drept din nastere al oricarei feline. Nu exista usa inchisa care sa nu poata fi deschisa cu suficienta perseverenta si gherutele potrivite!"
        },
        { 
          text: "Vanez", 
          cuvinteCheie: ["soricel", "papuc", "vanatoare"],
          raspuns: "Ah, nobila arta a vanatorii! Fie ca vanezi soricei, insecte sau doar jucariile alea enervante cu clopotei - esti un adevarat razboinic felin! Nu uita sa aduci trofeele de vanatoare in pat la stapan."
        }
      ]
    },
    {
      text: "Cum iti exprimi cel mai bine dragostea fata de umanii tai?",
      sugestii: [
        { 
          text: "Le aduc 'cadouri'", 
          cuvinteCheie: ["surpriza", "soarece"],
          raspuns: "Miau de apreciere! Nimic nu spune 'te iubesc' mai bine decat un soricel adus in pat la 4 dimineata. Umanii ar trebui sa fie mai recunoscatori pentru talentele noastre de vanatori!"
        },
        { 
          text: "Torc si fac biscuiti", 
          cuvinteCheie: ["drrrr", "masajist", "framant"],
          raspuns: "Purrrrrrr... Torsul si facutul de biscuiti sunt metode clasice de a-ti arata afectiunea. Bonus daca reusesti sa freci nasul umed de fata lor cand dorm profund."
        },
        { 
          text: "Ii ignor complet", 
          cuvinteCheie: ["fantoma", "invizibil"],
          raspuns: "MIAU de aprobare! Un maestru al psihologiei inverse! Cu cat ii ignori mai mult, cu atat vor incerca mai tare sa castige afectiunea ta. Asta e calea felinelor superioare."
        },
        { 
          text: "Le distrug bunurile", 
          cuvinteCheie: ["demolator", "calamitate", "sabotaj"],
          raspuns: "Hsss-ha-ha! Ce modalitate creativa de a-ti arata afectiunea! Nimic nu spune 'esti al meu' mai clar decat o canapea nou zgariata. Plus ca le redecoram casa intr-un stil autentic felin!"
        }
      ]
    },
    {
      text: "Ce fel de mancare preferi, nobile felin?",
      sugestii: [
        { 
          text: "Doar hrana premium", 
          cuvinteCheie: ["caviar", "snob", "bogatash", "pretentios"],
          raspuns: "Miau aristocratic! Doar ce e mai bun pentru noi, regii si reginele casei. Daca nu e ambalat in conserve de aur si nu costa cat rata la apartament, nici nu ma deranjez sa adulmec."
        },
        { 
          text: "Mancarea umana", 
          cuvinteCheie: ["mancare umana"],
          raspuns: "Miau smecher! De ce sa mananci din castronul tau cand poti sa furi direct de pe farfuria stapanului? Cu cat te cearta mai mult, cu atat e mai dulce victoria!"
        },
        { 
          text: "Orice misca", 
          cuvinteCheie: ["psihopat", "ucigator", "pradator"],
          raspuns: "MIAU feroce! Un adevarat vanatoare! Nimic nu se compara cu gustul proaspat al unei pradei prinse de tine insuti. Bonus pentru aducerea ei in casa si eliberarea ei in dormitor!"
        },
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
          textComplet: 'Miau! Bine ai venit la Chatbot-ul Felin!'
        }
      ]);
      
      setTimeout(() => {
        afiseazaTextProgresiv('Miau! Bine ai venit la Chatbot-ul Felin!');
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
        const raspunsuriGenerice = [
          "Mrrrow? Nu sunt sigur ca am inteles. Poate ai uitat sa adaugi 'miau' la sfarsit?",
          "Purrrr... Interesant punct de vedere pentru o fiinta fara blana si coada.",
          "HSSSS! Ce limbaj ciudat folosesti. Poate ar trebui sa incerci sa comunici in Felina.",
          "Miau confuz! Nu sunt sigur ce incerci sa-mi spui, dar iti voi aduce un soarece mort in semn de apreciere."
        ];
        
        const raspunsGeneric = raspunsuriGenerice[Math.floor(Math.random() * raspunsuriGenerice.length)]; 
        
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
        <h1>MiauChat 🐱</h1>
        <p>Conversati cu o pisica digitala care raspunde la toate nevoile tale feline</p>
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
            <div className="sugestii-titlu">Raspunsuri feline:</div>
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
            placeholder={asteaptaRaspuns ? "Pisica se gandeste..." : "Scrie un mesaj pentru pisica..."}
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
            Miau!
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;