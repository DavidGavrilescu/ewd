import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Form from "./pages/Form";
import Articol from "./pages/Articol";
import Galerie from "./pages/Galerie";
import Despre from "./pages/Despre";
import Home from "./pages/Home";
import Header from "./components/Header";
import Container from "./components/Container";
import { propsArticol } from "./data/emoji";

function NotFound() {
  return <h1>404 - Pagina nu există</h1>;
}

export default function App() {
  return (
    <div>
      <Header />
      <Container id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/despre" element={<Despre />} />
          <Route path="/form" element={<Form />} />
          <Route path="/gallery" element={<Galerie />} />
          <Route path="/articol" element={<Articol {...propsArticol} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
      <Footer />
    </div>
  );
}