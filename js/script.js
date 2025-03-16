// clickurile pe postari (container) ar trebui sa functioneze ca si cum dam click pe linkul din postare
document.querySelectorAll('.postare').forEach((post) => {
    post.addEventListener('click', () => {
        const a = post.querySelector('a')
        a.click();
    });
});

const animalEmojis = [
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

// fiecare postare din home va avea un animal emoji random in dreapta jos care apare la hover (din css)
document.querySelectorAll('.postare').forEach((post) => {
    const emoji = animalEmojis[Math.floor(Math.random() * animalEmojis.length)];
    const animal = document.createElement('span');
    animal.textContent = emoji;
    post.appendChild(animal);
});
