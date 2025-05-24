import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Form from "./pages/Form";
import Articol from "./pages/Articol";
import Galerie from "./pages/Galerie";
import Despre from "./pages/Despre";
import Home from "./pages/Home";
import Chatbot from "./pages/Chatbot";
import Header from "./components/Header";
import Container from "./components/Container";
import { propsArticol } from "./data/data";
import { Fragment } from "react/jsx-runtime";

function NotFound() {
  return <h1>404 - Pagina nu exista</h1>;
}

export default function App() {
  return (
    <Fragment>
      <Header />
      <Container id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/despre" element={<Despre />} />
          <Route path="/form" element={<Form />} />
          <Route path="/gallery" element={<Galerie />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/articol/:id" element={<Articol />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
      <Footer />
    </Fragment>
  );
}
