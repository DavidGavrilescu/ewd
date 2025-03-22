export default function Despre() {
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
  