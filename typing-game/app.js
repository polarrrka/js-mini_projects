const word = document.getElementById('word'),
      text = document.getElementById('text'),
      scoreEl = document.getElementById('score'),
      timeEl = document.getElementById('time'),
      endGameEl = document.getElementById('end-game-container'),
      settingsBtn = document.getElementById('settings-btn'),
      settings = document.getElementById('settings'),
      settingsForm = document.getElementById('settings-form'),
      difficultySelect = document.getElementById('difficulty');

const words = [
  'aguamenti', 'alohomora', 'aberto', 'caterwauling', 'colloportus', 'confringo', 'descendo', 'diffindo', 'episkey', 'evanesco', 'expelliarmus', 'einestra', 'imperio', 'impedimenta', 'impervius', 'levicorpus', 'morsmordre', 'muffliato', 'surgito', 'obliviate', 'portus', 'protego', 'reducto', 'rennervate', 'relashio', 'sonorus', 'rictusempra', 'stupefy'
];

let randomWord, 
    score = 0,
    time = 10;

let difficulty = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium';

difficultySelect.value = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium';

text.focus();

const timeInterval = setInterval(updateTime, 1000);

function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

function addWordDOM() {
  randomWord = getRandomWord();
  word.innerHTML = randomWord;
}

function updateScore() {
  score++;
  scoreEl.innerHTML = score;
}

function updateTime() {
  time--;
  timeEl.innerHTML = time + 's';

  if(time === 0) {
    clearInterval(timeInterval);
    gameOver();
  }
}

function gameOver() {
  endGameEl.innerHTML = `
    <h1>time ran out</h1>
    <p>your final score is: ${score}</p>
    <button onclick="location.reload()">reload</button>
  `;

  endGameEl.style.display = 'flex';
}

addWordDOM();

text.addEventListener('input', e => {
  const insertedText = e.target.value;
  if(insertedText === randomWord) {
    addWordDOM();
    updateScore();
    e.target.value = '';

    if(difficulty === 'hard') {
      time += 2;
    } else if(difficulty === 'medium') {
      time += 3;
    } else {
      time += 5;
    }
    
    updateTime();
  }
});

settingsBtn.addEventListener('click', () => settings.classList.toggle('hide'));
settingsForm.addEventListener('change', e => {
  difficulty = e.target.value;
  localStorage.setItem('difficulty', difficulty);
})