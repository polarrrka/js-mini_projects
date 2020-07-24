const form = document.getElementById('form'),
      search = document.getElementById('search'),
      result = document.getElementById('result'),
      more = document.getElementById('more');

const apiURL = 'https://api.lyrics.ovh';

async function searchSongs(term) {
/*   fetch(`${apiURL}/suggest/${term}`)
    .then(res => res.json())
    .then(data => console.log(data)); */

  const res = await fetch(`${apiURL}/suggest/${term}`);
  const data = await res.json();
  showData(data);
}

function showData(data) {
/*   let output = '';
  input.data.forEach(song => {
    output += `
    <li>
      <span><strong>${song.artist.name}</strong> - ${song.title}</span>
      <button class="btn" data-artist="${song.artist.name}" data-title="${song.title}">get lyrics</button>
    </li>
    `
  });

  result.innerHTML = `
    <ul class="songs">
      ${output}
    </ul>
  `; */

  result.innerHTML = `
  <ul class="songs">
      ${data.data.map(song => `
        <li>
          <span><strong>${song.artist.name}</strong> - ${song.title}</span>
          <button class="btn" data-artist="${song.artist.name}" data-title="${song.title}">get lyrics</button>
         </li>
      `).join('')}
    </ul>
  `;

  if(data.prev || data.next) {
    more.innerHTML = `
      ${data.prev ? `<button class="btn" onclick="getMoreSongs('${data.prev}')">prev</button>` : ''}
      ${data.next ? `<button class="btn" onclick="getMoreSongs('${data.next}')">next</button>` : ''}
    `;} else {
    more.innerHTML = '';
  }
}

async function getMoreSongs(url) {
  const res = await fetch(`https://cors-anywhere.herokuapp.com/${url}`);
  const data = await res.json();
  showData(data);
}

async function getLyrics(artist, song) {
  const res = await fetch(`${apiURL}/v1/${artist}/${song}`);
  const data = await res.json();
  const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>');
  result.innerHTML = `
    <h2><strong>${artist}</strong> - ${song}</h2>
    <span>${lyrics}</span>
  `;
  more.innerHTML = '';
}

form.addEventListener('submit', e => {
  e.preventDefault();

  const searchTerm = search.value.trim();

  if(!searchTerm){
    alert('please type in a search term');
  } else {
    searchSongs(searchTerm);
  }
}); 

result.addEventListener('click', e => {
  const clickEl = e.target;
  if(clickEl.tagName === 'BUTTON') {
    const artist = clickEl.getAttribute('data-artist');
    const song = clickEl.getAttribute('data-title');
    getLyrics(artist, song);
  }
});