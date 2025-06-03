import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// mapare de la caile rutelor la titlurile paginilor
const titluriPagini: { [cheie: string]: string } = {
  "/": "Pagina Principala",
  "/despre": "Despre Noi",
  "/form": "Formular Contact",
  "/gallery": "Galerie Foto",
  "/chatbot": "Asistent Virtual",
  // titlurile pentru /articol/:id vor fi gestionate de componenta Articol
};

const SeteazaTitluPagina: React.FC = () => {
  const locatie = useLocation();

  useEffect(() => {
    const cale = locatie.pathname;
    // componenta Articol se va ocupa de setarea titlului pentru /articol/:id
    if (!cale.startsWith("/articol/")) {
      const titlu = titluriPagini[cale] || "Blogul Meu"; // un titlu implicit daca ruta nu e gasita
      document.title = titlu;
    }
  }, [locatie]); // se re-ruleaza la fiecare schimbare de locatie

  return null; // nu randeaza nimic vizibil
};

export default SeteazaTitluPagina;
