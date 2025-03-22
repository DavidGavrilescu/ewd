import { Routes, Route, Link, useNavigate } from "react-router-dom";
import {Postari} from "./components/postari";
import Footer from "./components/Footer";
import Form from "./pages/Form";
import { Fragment, ReactNode } from "react";
import Articol from "./pages/Articol";
import Galerie from "./pages/Galerie";

function Home() {
  return <Postari />
}

function Despre() {
  return <article id="despre">
    <h2 className="page-title">Despre</h2>
    <p>Acest blog este despre ceva anume doar ca inca nu este clar despre ce.</p>
    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Cat_August_2010-4.jpg/1200px-Cat_August_2010-4.jpg"
      alt="O imagine cu o pisica" />
    <section className="sectiune">
      <h2>introducere</h2>
      <h3>Despre autor</h3>
      <p>Autorul acestui blog este un om care are ceva de spus.</p>
      <h3>contact</h3>
      <p>Pentru a lua legatura cu autorul acestui blog, puteti trimite un email la adresa:
        <a href="mailto:meow_meow@google.com">meow_meow@google.com</a>
      </p>
    </section>
    <section className="sectiune">
      <h2>continut</h2>
      <p>Acest blog contine articole despre diverse subiecte.</p>
    </section>
    <section className="sectiune">
      <h2>concluzie</h2>
      <p>Urmatorul tabel arata concluzia</p>
      <table>
        <thead>
          <tr>
            <th>Ce stim despre blog</th>
            <th>Ce nu stim</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Stim ca autorul are adresa de email meow_meow@google.com</td>
            <td>Nu stim numele autorului</td>
          </tr>
          <tr>
            <td>Stim ca autorul este un om care are ceva de spus</td>
            <td>Nu stim ce vrea sa spuna de fapt autorul.</td>
          </tr>
        </tbody>
      </table>
    </section>
  </article>
}

function NotFound() {
  return <h1>404 - Pagina nu există</h1>;
}

function Logo() {
  const navigate = useNavigate();
  return <h2 id="logo" onClick={()=>{
    navigate('/')
  }}>Blogul meu<span id="dot">.</span></h2>
}

const Container = ({ children, id="default" }: { id?: "main" | "default"; children: ReactNode }) => {
  return <div className="container" id={id}>
    {children}
  </div>
}
const propsArticol = {
  titlu: 'Titlul postarii va aparea aici cand il vom cunoaste',
  continut: ` <h3>Titlu Principal al Articolului</h3>

    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.  Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
    <br>

    <h3>Un Subtitlu Interesant</h3>

    <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
    <br>

    <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.  Nulla facilisi.  Integer nec odio.  Praesent libero.  Sed cursus ante dapibus diam.  Sed nisi.  Nulla quis sem at nibh elementum imperdiet.
        <br><br>  Duis sagittis ipsum.  Praesent mauris.  Fusce nec tellus sed augue semper porta.  Mauris massa.  Vestibulum lacinia arcu eget nulla.  Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
    </p>
     <br>

    <h3>Încă un Subtitlu</h3>

    <p>Curabitur sodales ligula in libero. Sed dignissim lacinia nunc. Curabitur tortor. Pellentesque nibh. Aenean quam. In scelerisque sem at dolor. Maecenas mattis. Sed convallis tristique sem. Proin ut ligula vel nunc egestas porttitor.</p>
    <br>
    <p> Morbi lectus risus, iaculis vel, suscipit quis, luctus non, massa. Fusce ac turpis quis ligula lacinia aliquet. Mauris ipsum.  Nulla metus metus, ullamcorper vel, tincidunt sed, euismod in, nibh.</p>`,
  peScurt: 'articol despre ceva...',
  data: '13 martie 2025',
  poza: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Cat_August_2010-4.jpg/1200px-Cat_August_2010-4.jpg'
}
export default function App() {
  return (
    <div>
      <header className="mainHeader">
        <Container>
          <Logo />
          <nav>
            <Link to="/">Acasa</Link>
            <Link to="/despre">Despre</Link>
            <Link to="/form">Form</Link>
            <Link to="/gallery">Galerie</Link>
          </nav>
        </Container>
      </header>
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