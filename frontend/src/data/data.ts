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
  poza: string | null;
  etichete: string[];
}

export interface IArticol {
  title: string;
  poza: string | null;
  link: string;
  summary?: string;
}
