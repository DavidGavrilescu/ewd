
// functie de validare care returneaza un array de array-uri cu numele campului si daca este valid sau nu
const validateForm = () => {
    const getFormValue = (id) => document.getElementById(id)?.value
    const elementeDeValidat = ['nume', 'prenume', 'email', 'adresare', 'dataNasterii', 'adresa'];
    return elementeDeValidat.map((element) => {
        if (typeof element === 'string') {
            const value = getFormValue(element)?.trim();
            return [element, value !== ''];
        } else {
            return element[Object.keys(element)[0]].some((value) => {
                return [String(Object.keys(element)[0]), getFormValue(Object.keys(element)[0]) === value];
            });
        }
    });
}

// handler pt trimiterea formularului
const submitForm = (e) => {
    e.preventDefault();
    const isValid = validateForm();
    const invalid = [];
    isValid.map((element) => {
        if (!element[1]) {
            invalid.push(element[0]);
        }
    });
    if (invalid.length > 0) {
        const maiMulte = invalid.length > 1;
        alert(`${maiMulte ? "Campurile" : "Campul"} ${maiMulte ? invalid.join(', ') : invalid[0] } ${maiMulte ? "sunt obligatorii" : "este obligatoriu"}`);
    } else {
        alert('Formularul a fost trimis cu succes'); // not really
    }
   
}

// event listener pentru trimiterea formularului
document.getElementById('form').addEventListener('submit', submitForm);

