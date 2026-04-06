let secret = Math.floor(Math.random() * 100) + 1; 
let attempts = 0;

const input = document.getElementById('guessNb');
const btn = document.getElementById('btnGuess');
const msg = document.getElementById('message');
const counter = document.getElementById('counter');
const history = document.getElementById('history');

function checkNb() {
    const val = parseInt(input.value);
    attempts++;
    counter.innerText = attempts;

  
    const li = document.createElement('li');
    li.innerText = `Essai ${attempts}: ${val}`;
    history.append(li);

    if (val === secret) {
        msg.innerText = `Bravo! Vous avez trouvé le nombre en ${attempts} essais`;
        msg.className = 'gagne'; 
    } else if (val > secret) {
        msg.innerText = "Trop grand";
        msg.className = 'trop-grand'; 
    } else {
        msg.innerText = "Trop petit";
        msg.className = 'trop-petit';
    }
    input.value = '';
}

input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') checkNb();
});

btn.addEventListener('click', checkNb);

document.getElementById('btnNewGame').onclick = () => {
    location.reload(); 
};