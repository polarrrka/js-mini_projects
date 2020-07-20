const main = document.querySelector('main'),
      voicesSelect = document.getElementById('voices'),
      textarea = document.getElementById('text'),
      readBtn = document.getElementById('read'),
      toggleBtn = document.getElementById('toggle'),
      closeBtn = document.getElementById('close');

const data = [
  {
    image: './img/drink.jpg',
    text: "I'm Thirsty"
  },
  {
    image: './img/food.jpg',
    text: "I'm Hungry"
  },
  {
    image: './img/tired.jpg',
    text: "I'm Tired"
  },
  {
    image: './img/happy.jpg',
    text: "I'm Happy"
  }
]

data.forEach(createBox);

function createBox(item) {
  const box = document.createElement('div');
  const { image, text } = item;
  
  box.classList.add('box');
  box.innerHTML = `
    <img src="${image}" alt="${text}" />
    <p class="info">${text}</p>
  `
  box.addEventListener('click', () => {
    setTextMsg(text);
    speakText();

    box.classList.add('active');
    setTimeout(() => box.classList.remove('active'), 800);
  })

  main.appendChild(box);
}

const msg = new SpeechSynthesisUtterance();

let voices = [];
function getVoices() {
  voices = speechSynthesis.getVoices();
  voices.forEach(voice => {
    const option = document.createElement('option');
    option.value = voice.name;
    option.innerText = `${voice.name} ${voice.lang}`;
    voicesSelect.appendChild(option);
  });
}

function setTextMsg(text) {
  msg.text = text;
}

function speakText() {
  speechSynthesis.speak(msg);
}

function setVoice(e) {
  msg.voice = voices.find(voice => voice.name === e.target.value);
}

speechSynthesis.addEventListener('voiceschanged', getVoices);

toggleBtn.addEventListener('click', () => document.getElementById('text-box').classList.toggle('show'));
closeBtn.addEventListener('click', () => document.getElementById('text-box').classList.remove('show'));

voicesSelect.addEventListener('change', setVoice);

readBtn.addEventListener('click', () => {
  setTextMsg(textarea.value);
  speakText();
})

getVoices();