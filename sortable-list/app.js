const draggableList = document.getElementById('draggable-list'),
      check = document.getElementById('check');

const bestPamls = [
  'krupicka',
  'seno',
  'petrzel',
  'mrkev',
  'salat',
  'jablko',
  'rajce',
  'bazalka',
  'kedlubna',
  'jahoda'
];

const listItems = [];

let dragStartIndex;

createList();

function createList() {
  [...bestPamls]
    .map(a => ({ value: a, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(a => a.value)
    .forEach((pamls, index) => {
      const listItem = document.createElement('li');
      listItem.setAttribute('data-index', index);
      listItem.innerHTML = `
        <span class="number">${index + 1}</span>
        <div class="draggable" draggable="true">
          <p class="pamls-name">${pamls}</p>
          <i class="fas fa-grip-lines"></i>
        </div>
      `;
      listItems.push(listItem);
      draggableList.appendChild(listItem);
    });
}

function dragStart() {
  dragStartIndex = +this.closest('li').getAttribute('data-index');
}

function dragEnter() {
  this.classList.add('over');
}

function dragLeave() {
  this.classList.remove('over');
}

function dragOver(e) {
  e.preventDefault();
}

function dragDrop() {
  const dragEndIndex = +this.getAttribute('data-index');
  swapItems(dragStartIndex, dragEndIndex);
  this.classList.remove('over');
}

function swapItems(fromIndex, toIndex) {
  const itemOne = listItems[fromIndex].querySelector('.draggable'),
        itemTwo = listItems[toIndex].querySelector('.draggable');

  listItems[fromIndex].appendChild(itemTwo);
  listItems[toIndex].appendChild(itemOne);
}

function checkOrder() {
  listItems.forEach((item, index) => {
    const palmsName = item.querySelector('.draggable').innerText.trim();

    if(palmsName !== bestPamls[index]) {
      item.classList.add('wrong');
    } else {
      item.classList.remove('wrong');
      item.classList.add('right');
    }
  });
}

function addEventListeners() {
  const draggables = document.querySelectorAll('.draggable'),
        dragListItems = document.querySelectorAll('.draggable-list li');
  
  draggables.forEach(draggable => {
    draggable.addEventListener('dragstart', dragStart);
  });

  dragListItems.forEach(item => {
    item.addEventListener('dragover', dragOver);
    item.addEventListener('drop', dragDrop);
    item.addEventListener('dragenter', dragEnter);
    item.addEventListener('dragleave', dragLeave);
  });
}

addEventListeners();

check.addEventListener('click', checkOrder);