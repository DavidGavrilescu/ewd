export const animalEmojis = [
    '🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', 
    '🦁', '🐮', '🐷', '🐽', '🐸', '🐵', '🙈', '🙉', '🙊', '🐒', 
    '🐔', '🐧', '🐦', '🐤', '🐣', '🐥', '🦆', '🦅', '🦉', '🦇', 
    '🐺', '🐗', '🐴', '🦄', '🐝', '🐛', '🦋', '🐌', '🐞', '🐜', 
    '🦟', '🦗', '🐢', '🐍', '🦎', '🦂', '🦀', '🐡', '🐠', '🐟', 
    '🐬', '🐳', '🐋', '🦈', '🐊', '🐅', '🐆', '🦓', '🦍', '🦧', 
    '🐘', '🦛', '🦏', '🐪', '🐫', '🦒', '🦘', '🦙', '🐃', '🐂', 
    '🐄', '🐎', '🐖', '🐏', '🐑', '🦌', '🐐', '🐓', '🦃', '🦚', 
    '🦜', '🦢', '🦩', '🕊', '🐇', '🐁', '🐀', '🐿', '🦔'
];

export const propsArticol = {
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

 export interface Articol {
      title: string;
      summary: string;
      poza: string | null;
      link?: string;
  }

  export const articole: Articol[] = [
    {
        title: 'Primul articol',
        summary: 'Prmul articol este despre ceva anume dar inca nu este clar',
        poza: null
    },
    {
        title: 'Al doilea articol',
        summary: 'Al doilea articol este despre ceva anume dar inca nu este clar',
        poza: null
    }, {
        title: 'Al treilea articol',
        summary: 'Este despre ceva anume dar inca nu este clar',
        poza: null
    }, {
        title: 'Penultimul articol',
        summary: 'Este despre ceva anume dar inca nu este clar',
        poza: null
    }, {
        title: 'Ultimul articol',
        summary: 'Este despre ceva anume dar inca nu este clar',
        poza: null,
    }, {
        title: 'Primul articol',
        summary: 'Prmul articol este despre ceva anume dar inca nu este clar',
        poza: null
    },
    {
        title: 'Al doilea articol',
        summary: 'Al doilea articol este despre ceva anume dar inca nu este clar',
        poza: null
    }, {
        title: 'Al treilea articol',
        summary: 'Este despre ceva anume dar inca nu este clar',
        poza: null
    }, {
        title: 'Penultimul articol',
        summary: 'Este despre ceva anume dar inca nu este clar',
        poza: null
    }, {
        title: 'Ultimul articol',
        summary: 'Este despre ceva anume dar inca nu este clar',
        poza: null,
    },
]