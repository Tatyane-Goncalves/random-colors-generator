const colorsCard = document.getElementById('colorsCard');
const btnGenerate = document.querySelector('button');
const messageStatus = document.getElementById('messageStatus');

// Array para manter as cores travadas
let lockedColors = [false, false, false, false, false];

// Gera uma cor HEX aleatória
function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Mostra uma mensagem temporária
function showMessage(msg) {
  messageStatus.textContent = msg;
  messageStatus.classList.add('active');
  setTimeout(() => {
    messageStatus.classList.remove('active');
  }, 2000);
}

// Cria os cards de cores
function generateColors() {
  colorsCard.innerHTML = '';

  for (let i = 0; i < 5; i++) {
    const color = lockedColors[i] ? colorsCard.children[i]?.dataset.color : getRandomColor();
    const card = document.createElement('div');
    card.className = 'color-card';
    card.style.backgroundColor = color;
    card.dataset.color = color;

    // Texto do código HEX
    const code = document.createElement('span');
    code.className = 'color-code';
    code.textContent = color;

    // Ícone de cadeado
    const lock = document.createElement('span');
    lock.className = 'lock-icon';
    lock.textContent = lockedColors[i] ? '🔒' : '🔓';

    // Eventos
    code.addEventListener('click', () => {
      navigator.clipboard.writeText(color);
      showMessage('HEX copiado!');
    });

    lock.addEventListener('click', () => {
      lockedColors[i] = !lockedColors[i];
      generateColors();
      showMessage(lockedColors[i] ? 'Cor travada!' : 'Cor destravada!');
    });

    card.appendChild(lock);
    card.appendChild(code);
    colorsCard.appendChild(card);
  }
}

// Gera cores ao clicar no botão
btnGenerate.addEventListener('click', generateColors);

// Gera cores ao apertar barra de espaço
document.addEventListener('keydown', (e) => {
  if (e.code === 'Space') {
    e.preventDefault();
    generateColors();
  }
});

// Primeira renderização
generateColors();
