// import imagini locale
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
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore 
            et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut 
            aliquip ex ea commodo consequat.
          </p>
          <p>
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
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
            <p className="rol">Lorem Ipsum</p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. 
              Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet.
            </p>
          </div>
          <div className="membru">
            <img src={cat3} alt="Meow" />
            <h3>Florin Felis</h3>
            <p className="rol">Lorem Ipsum</p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. 
              Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet.
            </p>
          </div>
          <div className="membru">
            <img src={cat4} alt="Meow" />
            <h3>Miauhaela Psps</h3>
            <p className="rol">Lorem Ipsum</p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. 
              Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet.
            </p>
          </div>
        </div>
      </section>
      
      <section className="sectiune misiune">
        <h2>Misiunea noastra</h2>
        <div className="misiune-container">
          <div className="misiune-text">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam molestie, ligula non efficitur aliquam, 
              nisl erat maximus eros, a convallis risus lacus eget tellus. Praesent ut interdum ante. Aenean eget 
              magna vel libero consequat facilisis.
            </p>
            <p>
              Suspendisse auctor commodo odio, a rhoncus ipsum fermentum ut. Nulla facilisi. Donec purus ante, 
              tincidunt vel ultrices non, pellentesque et tortor. Morbi auctor, metus a dignissim consequat, 
              sapien erat ultricies justo, in volutpat lacus dolor in leo.
            </p>
            <p>
              Rhoncus ipsum fermentum ut. Nulla facilisi. Donec purus ante, 
              tincidunt vel ultrices non, pellentesque et tortor. Morbi auctor, metus a dignissim consequat, 
              sapien erat ultricies justo, in volutpat lacus dolor in leo.
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
            <h3>Lorem Ipsum</h3>
            <p>
              Contacteaza-ne pe:
              <a href="mailto:meow_meow@example.com"> meow_meow@example.com</a>
            </p>
            <p>
              Ne gasesti pe retelele sociale:
            </p>
            <div className="social-links">
              <a href="#">Facebook</a>
              <a href="#">Instagram</a>
              <a href="#">Twitter</a>
            </div>
          </div>
          <div className="contact-mesaj">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer rutrum augue lectus, vel luctus arcu eleifend vel. 
              Duis vitae orci nunc. Maecenas facilisis imperdiet aliquet. In hac habitasse platea dictumst.
            </p>
            <p>
              Rhoncus ipsum fermentum ut. Nulla facilisi. Donec purus ante, 
              tincidunt vel ultrices non, pellentesque et tortor. Morbi auctor, metus a dignissim consequat, 
              sapien erat ultricies justo, in volutpat lacus dolor in leo.
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
        <h2>Lorem Ipsum</h2>
        <div className="statistici-container">
          <div className="statistica">
            <span className="numar">50+</span>
            <span className="descriere">Lorem ipsum</span>
          </div>
          <div className="statistica">
            <span className="numar">10k+</span>
            <span className="descriere">Lorem ipsum</span>
          </div>
          <div className="statistica">
            <span className="numar">5000+</span>
            <span className="descriere">Meowsletter</span>
          </div>
          <div className="statistica">
            <span className="numar">3</span>
            <span className="descriere">Lorem ipsum</span>
          </div>
        </div>
        <table className="statistici-detaliate">
          <thead>
            <tr>
              <th>Ce stim despre blog</th>
              <th>Ce nu stim</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Lorem ipsum dolor sit amet</td>
              <td>Lorem ipsum dolor sit amet</td>
            </tr>
            <tr>
              <td>Lorem ipsum dolor sit amet</td>
              <td>Lorem ipsum dolor sit amet</td>
            </tr>
          </tbody>
        </table>
      </section>
    </article>
  );
}
