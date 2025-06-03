import React, { useState, useRef, useEffect } from "react";
import "../assets/scss/chatbot.scss";

interface Mesaj {
  text: string;
  trimis: boolean; // true = trimis de utilizator, false = primit
  inScriere?: boolean;
  textComplet?: string;
}

interface Intrebare {
  text: string;
  sugestii: Array<{
    text: string;
    cuvinteCheie: string[];
    raspuns: string;
  }>;
}

const Chatbot: React.FC = () => {
  const intrebari: Intrebare[] = [
    {
      text: "Ce tip de pisica esti astazi?",
      sugestii: [
        {
          text: "Energic/Jucaus",
          cuvinteCheie: ["zoomies", "nebun", "tornado"],
          raspuns:
            "Miau energic! Alergi prin casa noaptea? Excelent! E cea mai buna metoda sa-ti tii oamenii treji si sa le amintesti ca apartamentul e si al nostru.",
        },
        {
          text: "Lenes/Somnoros",
          cuvinteCheie: ["mormoloc", "potato", "molcom", "zzz"],
          raspuns:
            "Purrrr... esti o pisica inteleapta. Somnul e important - recomand 16-18 ore pe zi, preferabil pe hainele curate ale sefului.",
        },
        {
          text: "Morocanos",
          cuvinteCheie: ["meowrocanos"],
          raspuns:
            "Hsss! Te inteleg. Uneori oamenii nu merita atentia noastra. Incearca sa le zgarii putin canapeaua - e o modalitate clasica de comunicare felina.",
        },
      ],
    },
    {
      text: "Ce preferi sa faci cand seful tau nu e atent?",
      sugestii: [
        {
          text: "Distrug lucruri",
          cuvinteCheie: ["haos", "distrug", "bomba", "ninja"],
          raspuns:
            "Miau! Zgariatul mobilei e o arta antica felina. E o modalitate naturala de a-ti marca teritoriul si de a-ti ascu ghearele.",
        },
        {
          text: "Dorm pe lucrurile lui",
          cuvinteCheie: ["blana", "caldut", "sforr", "covrig"],
          raspuns:
            "Mrrr... nimic nu e mai confortabil decat hainele calde ale sefului! Laptopul cald e de asemenea un loc excelent pentru o pauza.",
        },
        {
          text: "Explorez locuri interzise",
          cuvinteCheie: ["spion", "ninja"],
          raspuns:
            "Miau explorator! Sa te strecori in locuri noi e un instinct natural felin. Nu exista usa care sa nu poata fi deschisa cu putina perseverenta!",
        },
        {
          text: "Vanez",
          cuvinteCheie: ["soricel", "papuc", "vanatoare"],
          raspuns:
            "Miau! Fie ca vanezi insecte sau jucarii, instinctul de vanatoare e puternic la noi. Uneori aducem si 'cadouri' in casa.",
        },
      ],
    },
    {
      text: "Cum iti exprimi cel mai bine dragostea fata de umanii tai?",
      sugestii: [
        {
          text: "Le aduc 'cadouri'",
          cuvinteCheie: ["surpriza", "soarece"],
          raspuns:
            "Miau de apreciere! Un soricel adus in casa e un semn de afectiune felina. Oamenii nu intotdeauna apreciaza gestul, dar e din dragoste!",
        },
        {
          text: "Torc si fac biscuiti",
          cuvinteCheie: ["drrrr", "masajist", "framant"],
          raspuns:
            "Purrrr... Torsul si masajul cu labele sunt clasici. Bonus daca reusesti sa le atingi nasul cu al tau cand se trezesc.",
        },
        {
          text: "Ii ignor complet",
          cuvinteCheie: ["fantoma", "invizibil"],
          raspuns:
            "Miau de aprobare! Psihologia inversa functioneaza de minune. Cu cat ii ignori mai mult, cu atat vor incerca mai tare sa castige atentia ta.",
        },
        {
          text: "Le distrug bunurile",
          cuvinteCheie: ["zgarii", "calamitate", "sabotaj"],
          raspuns:
            "Miau! Zgariatul mobilei e arta de a-ti marca teritoriul. Si mai ales ca le redecoram casa in stilul nostru personal.",
        },
      ],
    },
    {
      text: "Ce fel de mancare preferi?",
      sugestii: [
        {
          text: "Doar hrana premium",
          cuvinteCheie: ["caviar", "snob", "pretentios", "scump"],
          raspuns:
            "Miau! Calitatea conteaza, nu-i asa? Daca nu e destul de buna pentru gusturile noastre rafinate, nu merita.",
        },
        {
          text: "Mancarea umana",
          cuvinteCheie: ["mancare umana"],
          raspuns:
            "Miau! De ce sa mananci din castronul tau cand farfuria sefului pare mult mai interesanta? Interesant cum se enerveaza...",
        },
        {
          text: "Orice misca",
          cuvinteCheie: ["vanatoare", "ucigator", "pradator"],
          raspuns:
            "Miau! Instinctul de vanatoare e puternic la noi. Fie ca vanezi insecte sau jucarii, e in natura noastra. Uneori chiar aducem 'cadouri' in casa.",
        },
      ],
    },
  ];

  const [mesaje, setMesaje] = useState<Mesaj[]>([]);
  const [input, setInput] = useState<string>("");
  const [intrebareCurenta, setIntrebareCurenta] = useState<Intrebare | null>(null);
  const [sugestieSelectata, setSugestieSelectata] = useState<number | null>(null);
  const [asteaptaRaspuns, setAsteaptaRaspuns] = useState<boolean>(false);
  const [intrebareGataAfisata, setIntrebareGataAfisata] = useState<boolean>(false);

  const mesajeRef = useRef<HTMLDivElement>(null);
  const ultimulMesajRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (ultimulMesajRef.current) {
      ultimulMesajRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    } else if (mesajeRef.current) {
      mesajeRef.current.scrollTop = mesajeRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    setTimeout(scrollToBottom, 100);
    setTimeout(scrollToBottom, 300);
  }, [mesaje]);

  const afiseazaTextProgresiv = (textComplet: string, onComplete?: () => void) => {
    let index = 0;

    const esteIntrebare = intrebari.some((intrebare) => intrebare.text === textComplet);

    if (esteIntrebare) {
      setIntrebareGataAfisata(false);
    }

    const interval = setInterval(() => {
      if (index <= textComplet.length) {
        setMesaje((prev) => {
          const mesajIndex = prev.findIndex((m) => m.textComplet === textComplet && m.inScriere === true);

          if (mesajIndex === -1) return prev;

          return prev.map((mesaj, i) =>
            i === mesajIndex ? { ...mesaj, text: textComplet.substring(0, index) } : mesaj
          );
        });
        index++;
      } else {
        clearInterval(interval);
        setMesaje((prev) => {
          const mesajIndex = prev.findIndex((m) => m.textComplet === textComplet && m.inScriere === true);

          if (mesajIndex === -1) return prev;

          return prev.map((mesaj, i) => (i === mesajIndex ? { ...mesaj, inScriere: false } : mesaj));
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
    primaIntrebare: false,
  });

  useEffect(() => {
    if (mesaje.length === 0 && !stadiiInitializare.mesajBunVenit) {
      setStadiiInitializare((prev) => ({ ...prev, mesajBunVenit: true }));

      setMesaje([
        {
          text: "",
          trimis: false,
          inScriere: true,
          textComplet: "Miau! Salut, om! Sunt MiauBot-ul tau digital.",
        },
      ]);

      setTimeout(() => {
        afiseazaTextProgresiv("Miau! Salut, om! Sunt MiauBot-ul tau digital.");
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
      setStadiiInitializare((prev) => ({ ...prev, primaIntrebare: true }));

      setTimeout(() => {
        const intrebareRandom = intrebari[Math.floor(Math.random() * intrebari.length)];

        setIntrebareCurenta(intrebareRandom);

        setMesaje((prev) => [
          ...prev,
          {
            text: "",
            trimis: false,
            inScriere: true,
            textComplet: intrebareRandom.text,
          },
        ]);

        setTimeout(() => {
          afiseazaTextProgresiv(intrebareRandom.text);
        }, 50);
      }, 1000);
    }
  }, [stadiiInitializare.mesajBunVenit, stadiiInitializare.primaIntrebare, mesaje]);

  const afiseazaIntrebareNoua = () => {
    if (!intrebareCurenta) return;

    let intrebareNoua;
    do {
      intrebareNoua = intrebari[Math.floor(Math.random() * intrebari.length)];
    } while (intrebareNoua.text === intrebareCurenta.text && intrebari.length > 1);

    setIntrebareCurenta(intrebareNoua);

    setMesaje((prev) => [
      ...prev,
      {
        text: "",
        trimis: false,
        inScriere: true,
        textComplet: intrebareNoua.text,
      },
    ]);

    setTimeout(() => {
      afiseazaTextProgresiv(intrebareNoua.text);
    }, 50);
  };

  const verificaRaspuns = (mesaj: string) => {
    if (!intrebareCurenta) return;

    setAsteaptaRaspuns(true);

    const textLower = mesaj.toLowerCase();

    const sugestiiPotrivite = intrebareCurenta.sugestii.filter((sugestie) =>
      sugestie.cuvinteCheie.some((cuvant) => textLower.includes(cuvant))
    );

    if (sugestiiPotrivite.length > 0) {
      const sugestieAleasa = sugestiiPotrivite[0];

      setTimeout(() => {
        setMesaje((prev) => [
          ...prev,
          {
            text: "",
            trimis: false,
            inScriere: true,
            textComplet: sugestieAleasa.raspuns,
          },
        ]);

        setTimeout(() => {
          afiseazaTextProgresiv(sugestieAleasa.raspuns, () => setTimeout(afiseazaIntrebareNoua, 1500));
        }, 50);
      }, 1000);
    } else {
      setTimeout(() => {
        const raspunsuriGenerice = [
          "Mrrrow? Nu sunt sigur ca am inteles. Poate ai uitat sa adaugi 'miau' la sfarsit?",
          "Purrrr... Interesant punct de vedere pentru o fiinta fara blana si coada.",
          "Hsss! Ce limbaj ciudat folosesti. Poate ar trebui sa incerci sa comunici in Felina.",
          "Miau confuz! Nu sunt sigur ce incerci sa-mi spui, dar apreciez tentativa.",
        ];

        const raspunsGeneric = raspunsuriGenerice[Math.floor(Math.random() * raspunsuriGenerice.length)];

        setMesaje((prev) => [
          ...prev,
          {
            text: "",
            trimis: false,
            inScriere: true,
            textComplet: raspunsGeneric,
          },
        ]);

        setTimeout(() => {
          afiseazaTextProgresiv(raspunsGeneric, () => setTimeout(afiseazaIntrebareNoua, 1500));
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
      setInput("");
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
        <p>Conversatie cu o pisica digitala care iti raspunde la intrebari</p>
      </div>

      <div className="chatbot-main">
        <div className="mesaje-container" ref={mesajeRef}>
          {mesaje.map((mesaj, index) => (
            <div
              key={index}
              className={`mesaj ${mesaj.trimis ? "trimis" : "primit"} ${mesaj.inScriere ? "in-scriere" : ""}`}
              ref={index === mesaje.length - 1 ? ultimulMesajRef : null}
            >
              <div className="mesaj-continut">
                {mesaj.text}
                {mesaj.inScriere && <span className="cursor-scriere"></span>}
              </div>
            </div>
          ))}
          <div style={{ float: "left", clear: "both", height: "80px" }}></div>
        </div>

        {intrebareCurenta && intrebareGataAfisata && !asteaptaRaspuns && (
          <div className="sugestii-container">
            <div className="sugestii-titlu">Raspunsuri feline:</div>
            <div className="sugestii-lista">
              {intrebareCurenta.sugestii.map((sugestie, index) => (
                <div key={index} className="sugestie-grup">
                  <div
                    className={`sugestie ${sugestieSelectata === index ? "activ" : ""}`}
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
                        <span key={idx} className="cuvant-cheie" onClick={() => trimiteCuvantCheie(cuvant)}>
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
              if (e.key === "Enter" && !e.shiftKey && !asteaptaRaspuns) {
                e.preventDefault();
                trimiteMesaj();
              }
            }}
          />
          <button className="buton-trimite" disabled={!input.trim() || asteaptaRaspuns} onClick={trimiteMesaj}>
            Miau!
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
