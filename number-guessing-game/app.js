const msgEl = document.getElementById('msg');

const randomNum = getRandomNum();

console.log('Number ', randomNum);

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = new window.SpeechRecognition();

recognition.start();

function onSpeak(e) {
  const msg = e.results[0][0].transcript;
  writeMsg(msg);
  checkNum(msg);
}

function writeMsg(msg) {
  msgEl.innerHTML = `
    <div>You said: </div>
    <span class="box">${msg}</span>
  `;
}

function checkNum(msg) {
  const num = +msg;

  if(Number.isNaN(num)) {
    msgEl.innerHTML += `<div>That is not a valid number!</div>`;
    return;
  }

  if(num > 100 || num < 1) {
    msgEl.innerHTML += '<div>Number must be between 1 and 100';
    return;
  }

  if(num === randomNum) {
    document.body.innerHTML = `
      <h2>Congrats! You are right! <br><br>
      It was ${num}</h2>
      <button class="play-again" id="play-again">play again</button>
    `;
  } else if(num > randomNum) {
    msgEl.innerHTML += '<div>go lower</div>';
  } else {
    msgEl.innerHTML += '<div>go higher</div>';
  }
}

function getRandomNum() {
  return Math.floor(Math.random() * 100) + 1;
}

recognition.addEventListener('result', onSpeak);
recognition.addEventListener('end', () => recognition.start());
document.body.addEventListener('click', (e) => {
  if(e.target.id === 'play-again') {
    window.location.reload();
  }
})