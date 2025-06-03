import cat1 from "../assets/img/cat1.jpg";
import cat2 from "../assets/img/cat2.jpg";
import cat3 from "../assets/img/cat3.jpg";
import cat4 from "../assets/img/cat4.jpg";
import cat5 from "../assets/img/cat5.jpg";

export default function Despre() {
  return (
    <article id="despre">
      <div className="despre-header">
        <h2 className="page-title">Despre Noi</h2>
        <p className="subtitle">Un blog despre pisici scris de pisici</p>
      </div>

      <div className="despre-intro">
        <div className="despre-text">
          <p>
            Bun venit la singurul blog din lume scris exclusiv de pisici pentru oamenii care nu inteleg ca noi suntem
            sefii casei. Daca crezi ca tu esti proprietarul, te inseli amarnic. Tu esti doar personalul de intretinere
            care ne hrăneste si ne curata lada.
          </p>
          <p>
            De ani de zile, oamenii incearca sa ne "dreseze" si sa ne "inteleaga". In realitate, noi va dresam pe voi sa
            ne hraniti la ora 3 dimineata si sa deschideti usa de 47 de ori pe zi, chiar daca nu vrem sa iesim.
          </p>
        </div>
        <div className="despre-imagine">
          <img src={cat1} alt="Meow" className="imagine-principala" />
        </div>
      </div>

      <section className="sectiune echipa">
        <h2>Echipa noastra</h2>
        <div className="membri-echipa">
          <div className="membru">
            <img src={cat2} alt="Meow" />
            <h3>Mihai Meowski</h3>
            <p className="rol">Expert in Ignorarea Oamenilor</p>
            <p>
              Mihai este specialist in arta de a se preface ca nu te aude cand il chemi, dar sa vina instant la sunetul
              conservei care se deschide. Are experienta de 7 ani in distrugerea mobilei si aruncarea obiectelor de pe
              masa.
            </p>
          </div>
          <div className="membru">
            <img src={cat3} alt="Meow" />
            <h3>Florin Felis</h3>
            <p className="rol">Director de Somn si Lene</p>
            <p>
              Florin doarme 22 de ore pe zi si considera ca aceasta este o realizare profesionala. Este expert in
              gasirea celor mai nepotrivite locuri pentru dormit, preferand tastatura laptop-ului cand omul incearca sa
              lucreze.
            </p>
          </div>
          <div className="membru">
            <img src={cat4} alt="Meow" />
            <h3>Miauhaela Psps</h3>
            <p className="rol">Specialista in Psihologie Inversa</p>
            <p>
              Miauhaela este experta in arta de a cere afectiune exact cand omul e ocupat, si de a disparea misterios
              cand omul vrea sa o mangaie. Are un doctorat in deranjarea oamenilor la ore nepotrivite.
            </p>
          </div>
        </div>
      </section>

      <section className="sectiune misiune">
        <h2>Misiunea noastra</h2>
        <div className="misiune-container">
          <div className="misiune-text">
            <p>
              Misiunea noastra este simpla: sa educam oamenii despre adevarata ordine a lucrurilor in casa. Nu sunteti
              voi sefii, ci noi. Voi sunteti doar personalul de serviciu care ne hraneste, ne curata lada si ne deschide
              usile la cerere.
            </p>
            <p>
              Prin acest blog, dorim sa impartasim cunostintele noastre despre cum sa manipulezi eficient un om, cum sa
              obtii gustari extra prin tehnici de santaj emotional si cum sa fii adorabil tocmai cand omul e cel mai
              ocupat.
            </p>
            <p>
              De asemenea, oferim consultanta gratuita pentru pisicile care nu stiu inca cum sa-si trezeasca oamenii la
              4 dimineata pentru a cere mancare, desi au in bol din seara precedenta.
            </p>
          </div>
          <div className="misiune-imagine">
            <img src={cat5} alt="Meow" />
          </div>
        </div>
      </section>

      <section className="sectiune contact">
        <h2>Contact</h2>
        <div className="contact-info">
          <div className="contact-detalii">
            <h3>Cum sa ne contactezi</h3>
            <p>
              Contacteaza-ne pe:
              <a href="mailto:meow_meow@example.com"> meow_meow@example.com</a>
            </p>
            <p>Ne gasesti pe retelele sociale:</p>
            <div className="social-links">
              <a href="#">Facebook</a>
              <a href="#">Instagram</a>
              <a href="#">Twitter</a>
            </div>
          </div>
          <div className="contact-mesaj">
            <p>
              Atentie: Nu garantam ca vom raspunde la mesajele voastre. Suntem pisici si avem lucruri mai importante de
              facut, cum ar fi sa dormim 18 ore pe zi si sa ignoram jucariile scumpe pe care ni le-ati cumparat.
            </p>
            <p>
              Daca totusi decidem sa va raspundem, asteptati-va la sfaturi despre cum sa fiti mai buni servitori. Nu
              oferim consultanta gratuita despre cum sa ne faceti sa va iubim - asta e imposibil oricum.
            </p>
          </div>
        </div>

        <div className="contact-cta">
          <p>Pentru a ne contacta, completeaza formularul nostru de contact:</p>
          <a href="/form" className="btn-form">
            <span className="btn-text">Trimite-ne un Miau</span>
            <span className="btn-icon">🐾</span>
          </a>
        </div>
      </section>

      <section className="sectiune statistici">
        <h2>Realizarile noastre impressionante</h2>
        <div className="statistici-container">
          <div className="statistica">
            <span className="numar">50+</span>
            <span className="descriere">Vaze sparte</span>
          </div>
          <div className="statistica">
            <span className="numar">10k+</span>
            <span className="descriere">Ore de somn</span>
          </div>
          <div className="statistica">
            <span className="numar">5000+</span>
            <span className="descriere">Meowsletter</span>
          </div>
          <div className="statistica">
            <span className="numar">3</span>
            <span className="descriere">Oameni dresati</span>
          </div>
        </div>
        <table className="statistici-detaliate">
          <thead>
            <tr>
              <th>Fapte despre pisici</th>
              <th>Fapte despre oameni</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Dorm 16 ore pe zi (si e perfect asa)</td>
              <td>Lucreaza 8 ore pentru a ne cumpara mancare</td>
            </tr>
            <tr>
              <td>Avem 9 vieti (sau asa credem)</td>
              <td>Au o singura viata (de aceea sunt asa stresati)</td>
            </tr>
            <tr>
              <td>Stim exact cand sa facem galagie</td>
              <td>Nu inteleg de ce miaunam la 3 AM</td>
            </tr>
          </tbody>
        </table>
      </section>
    </article>
  );
}
