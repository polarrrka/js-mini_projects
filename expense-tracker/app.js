const balance = document.getElementById('balance'),
      moneyPlus = document.getElementById('money-plus'),
      moneyMinus = document.getElementById('money-minus'),
      list = document.getElementById('list'),
      form = document.getElementById('form'),
      text = document.getElementById('text'),
      amount = document.getElementById('amount');

/* const dummyTrans = [
  {id: 1, text: 'Book', amount: -20},
  {id: 2, text: 'Salary', amount: 400},
  {id: 3, text: 'Food', amount: -60},
  {id: 4, text: 'Movie', amount: -20}
]; */

const transactionsLS = JSON.parse(localStorage.getItem('transactions'));

let transactions = localStorage.getItem('transactions') !== null ? transactionsLS : [];

function addTransac(e) {
  if(text.value.trim() === '' || amount.value.trim() === '') {
    alert('add text and amount!');
  } else {
    const transaction = {
      id: generateID(),
      text: text.value,
      amount: +amount.value
    }

    transactions.push(transaction);
    addTransacToDOM(transaction);
    updateValues();
    updateLS();

    text.value = '';
    amount.value = '';
  }

  e.preventDefault();
}

function generateID() {
  return Math.floor(Math.random() * 100000000);
}

function addTransacToDOM(transaction) {
  const sign = transaction.amount < 0 ? '-' : '+';

  const item = document.createElement('li');
  item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');
  item.innerHTML = `
    ${transaction.text}<span>${sign}${Math.abs(transaction.amount)}</span>
    <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
  `;
  list.appendChild(item);
}

function updateValues() {
  const amounts = transactions.map(transaction => transaction.amount);
  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
  const income = amounts.filter(item => item > 0).reduce((acc, item) => (acc += item), 0).toFixed(2);
  const expense = (amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) * -1).toFixed(2);

  balance.innerText = `$${total}`;
  moneyPlus.innerText = `$${income}`;
  moneyMinus.innerText = `$${expense}`;
}

function removeTransaction(id) {
  transactions = transactions.filter(transaction => transaction.id !== id);
  init();
  updateLS();
}

function updateLS() {
  localStorage.setItem('transactions', JSON.stringify(transactions));
}

function init() {
  list.innerHTML = '';
  transactions.forEach(addTransacToDOM);
  updateValues();
}

init();

form.addEventListener('submit', addTransac);