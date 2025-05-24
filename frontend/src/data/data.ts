export const animalEmojis = [
  "🐶",
  "🐱",
  "🐭",
  "🐹",
  "🐰",
  "🦊",
  "🐻",
  "🐼",
  "🐨",
  "🐯",
  "🦁",
  "🐮",
  "🐷",
  "🐽",
  "🐸",
  "🐵",
  "🙈",
  "🙉",
  "🙊",
  "🐒",
  "🐔",
  "🐧",
  "🐦",
  "🐤",
  "🐣",
  "🐥",
  "🦆",
  "🦅",
  "🦉",
  "🦇",
  "🐺",
  "🐗",
  "🐴",
  "🦄",
  "🐝",
  "🐛",
  "🦋",
  "🐌",
  "🐞",
  "🐜",
  "🦟",
  "🦗",
  "🐢",
  "🐍",
  "🦎",
  "🦂",
  "🦀",
  "🐡",
  "🐠",
  "🐟",
  "🐬",
  "🐳",
  "🐋",
  "🦈",
  "🐊",
  "🐅",
  "🐆",
  "🦓",
  "🦍",
  "🦧",
  "🐘",
  "🦛",
  "🦏",
  "🐪",
  "🐫",
  "🦒",
  "🦘",
  "🦙",
  "🐃",
  "🐂",
  "🐄",
  "🐎",
  "🐖",
  "🐏",
  "🐑",
  "🦌",
  "🐐",
  "🐓",
  "🦃",
  "🦚",
  "🦜",
  "🦢",
  "🦩",
  "🕊",
  "🐇",
  "🐁",
  "🐀",
  "🐿",
  "🦔",
];

export interface IPostare {
  id: number;
  titlu: string;
  continut: string;
  peScurt: string;
  data: string;
  poza: string;
  etichete: string[];
}
export const propsArticol = {
  titlu: "Primul Miau!",
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
  
      <h3>Inca un Subtitlu</h3>
  
      <p>Curabitur sodales ligula in libero. Sed dignissim lacinia nunc. Curabitur tortor. Pellentesque nibh. Aenean quam. In scelerisque sem at dolor. Maecenas mattis. Sed convallis tristique sem. Proin ut ligula vel nunc egestas porttitor.</p>
      <br>
      <p> Morbi lectus risus, iaculis vel, suscipit quis, luctus non, massa. Fusce ac turpis quis ligula lacinia aliquet. Mauris ipsum.  Nulla metus metus, ullamcorper vel, tincidunt sed, euismod in, nibh.</p>
      <br>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam molestie, ligula non efficitur aliquam, nisl erat maximus eros, a convallis risus lacus eget tellus. Praesent ut interdum ante. Aenean eget magna vel libero consequat facilisis. Donec lobortis, elit ac varius hendrerit, magna mi condimentum ligula, id pulvinar lacus mauris in leo.</p>
      <br>
      <p>Suspendisse auctor commodo odio, a rhoncus ipsum fermentum ut. Nulla facilisi. Donec purus ante, tincidunt vel ultrices non, pellentesque et tortor. Morbi auctor, metus a dignissim consequat, sapien erat ultricies justo, in volutpat lacus dolor in leo. Proin id tellus vitae nulla placerat rhoncus. Duis sed porta lectus, ut auctor massa. Vivamus tempus ex ac nisi pretium elementum. Ut consequat neque quis urna placerat, id commodo nisl feugiat.</p>
      <br>
      <h3>Un Ultim Subtitlu</h3>
      <p>Proin at finibus odio. Integer rutrum augue lectus, vel luctus arcu eleifend vel. Duis vitae orci nunc. Maecenas facilisis imperdiet aliquet. In hac habitasse platea dictumst. Aenean blandit urna nec tellus porttitor lacinia. Aenean maximus, quam eu pellentesque ultrices, nisi nisi elementum libero, at volutpat eros ante non diam. Suspendisse accumsan venenatis laoreet. Nulla in eros vitae velit dictum maximus. Mauris gravida turpis nec lectus egestas convallis. Quisque ut augue sapien. Suspendisse id magna id libero egestas pellentesque a vehicula orci.</p>`,
  peScurt: "Un ghid scris de pisici pentru pisici.",
  data: "13 martie 2025",
  poza: "/src/assets/img/cat1.jpg",
  etichete: ["pisici", "animale", "ceva", "altceva"],
};

export interface IArticol {
  title: string;
  summary: string;
  poza: string | null;
  link: string;
}

export const articole: IArticol[] = [
  {
    title: "MIAU: De ce avem nevoie sa dormim mult",
    summary: "Cum sa dormi mult si sa fii sanatos",
    poza: "/src/assets/img/cat1.jpg",
    link: "/articol",
  },
  {
    title: "Ghidul meow despre oameni: Cum sa-i dresezi corect",
    summary: "Sfaturi de la pisici pentru pisici",
    poza: "/src/assets/img/cat2.jpg",
    link: "/articol",
  },
  {
    title: "PSPS PSPS: Suntem chiar atat de usor de manipulat?",
    summary:
      "O investigatie profunda despre de ce reactionam la sunete ciudate facute de oameni",
    poza: "/src/assets/img/cat3.jpg",
    link: "/articol",
  },
  {
    title: "De ce conservele scumpe sunt dreptul meu din nastere",
    summary:
      "Argumentul suprem pentru hranirea mea cu cele mai bune si mai scumpe conserve disponibile",
    poza: "/src/assets/img/cat4.jpg",
    link: "/articol",
  },
  {
    title: "Jucarii vs Cutii: De ce preferintele mele te confuzeaza",
    summary:
      "Un studiu stiintific despre motivele pentru care cutiile sunt superioare oricarei jucarii scumpe",
    poza: "/src/assets/img/cat5.jpg",
    link: "/articol",
  },
  {
    title: "Arta de a ignora omenirea: Un ghid practic",
    summary:
      "Tehnici avansate pentru a-ti perfectiona indiferenta atunci cand esti chemat",
    poza: "/src/assets/img/cat1.jpg",
    link: "/articol",
  },
  {
    title: "Mersul la veterinar: Cum sa protestezi eficient",
    summary:
      "Metode testate de a-ti exprima nemultumirea fata de acele vizite oribile la doctor",
    poza: "/src/assets/img/cat2.jpg",
    link: "/articol",
  },
  {
    title:
      "Purr-suasiune: Cum sa obtii mai multe gustari folosind sunetele potrivite",
    summary:
      "Un ghid detaliat despre frecventa si intensitatea toarcerii pentru a obtine recompense maxime",
    poza: "/src/assets/img/cat3.jpg",
    link: "/articol",
  },
  {
    title: "Teritoriul meu, regulile mele: Ghid de marcare eficienta",
    summary:
      "Tehnici pentru incepatori si avansati despre cum sa-ti afirmi dominanta asupra locuintei",
    poza: "/src/assets/img/cat4.jpg",
    link: "/articol",
  },
  {
    title: "3AM: De ce este momentul perfect pentru alergat prin casa",
    summary:
      "Explicatii detaliate despre beneficiile zumzetului nocturn si a salturilor de pe mobila",
    poza: "/src/assets/img/cat5.jpg",
    link: "/articol",
  },
];
