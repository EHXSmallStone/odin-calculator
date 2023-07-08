const add = (...args) => args.reduce((total, current) => total + current, 0);

const subtract = (...args) => args.reduce((total, current) => total - current);

const multiply = (...args) => args.reduce((total, current) => total * current);

const divide = (...args) => args.reduce((total, current) => total / current);

let operator = '';
let firstNumber = '';
let secondNumber = '';

const operate = (operator, firstNumber, secondNumber) => {
  switch(operator) {
    case '+':
      return add(firstNumber, secondNumber);
      break;

    case '-':
      return subtract(firstNumber, secondNumber);
      break;
    
    case '*':
      return multiply(firstNumber, secondNumber);
      break;

    case '/':
      return divide(firstNumber, secondNumber);
      break;
  };
};

const displayPreviousOperand = document.querySelector('#displayPanel #previousOperand');
const displayCurrentOperand = document.querySelector('#displayPanel #currentOperand');
const numberKeys = document.querySelectorAll('.number');
let displayValues = [];

numberKeys.forEach((key) => {
  key.addEventListener('click', (e) => {
    displayValues.push(e.target.value);
    displayCurrentOperand.textContent += e.target.value;
  });
});

const operatorKeys = document.querySelectorAll('.operator');
operatorKeys.forEach((key) => {
  key.addEventListener('click', (e) => {
    if (!firstNumber && displayValues.length == 0) return;
    if (firstNumber && displayValues.length == 0) {
      operator = e.target.value;
      displayPreviousOperand.textContent = `${firstNumber} ${operator} `;
      return;
    }
    if (firstNumber) getResult();
    firstNumber = displayValues.reduce((acc, current) => acc + current, '');
    displayValues = [];
    operator = e.target.value;
    displayPreviousOperand.textContent = `${firstNumber} ${operator} `;
    displayCurrentOperand.textContent = '';
  });
});

const equalsKey = document.querySelector('#equals');
equalsKey.addEventListener('click', () => {
  if (!firstNumber || displayValues.length == 0) return;
  getResult('equals');
  numberKeys.forEach((key) => {
    key.addEventListener('click', clearAndInsert);
  });
});

function getResult(type) {
  secondNumber = displayValues.reduce((acc, current) => acc + current, '');
  result = operate(operator, +firstNumber, +secondNumber);
  if (type == 'equals') {
    displayPreviousOperand.textContent += `${secondNumber} =`;
    displayCurrentOperand.textContent = result;
  }
  displayValues = result.toString().split('');
  operator = '';
  firstNumber = '';
  secondNumber = '';
};

// function checkResultLength(result) {
//   if (result.toString().length > 12) {
//     return result.toString().slice(0, 9) + '...';
//   } else {
//     return result;
//   }
// };

const allClearKey = document.querySelector('#allClear');
allClearKey.addEventListener('click', () => {
  displayValues = [];
  operator = '';
  firstNumber = '';
  secondNumber = '';
  displayPreviousOperand.textContent = '';
  displayCurrentOperand.textContent = '';
});

function clearAndInsert(e) {
  displayValues = [e.target.value];
  displayPreviousOperand.textContent = '';
  displayCurrentOperand.textContent = e.target.value;
  numberKeys.forEach((key) => {
    key.removeEventListener('click', clearAndInsert);
  });
};

// Remove ClearAndInsert
operatorKeys.forEach((key) => {
  key.addEventListener('click', () => {
    numberKeys.forEach((key) => {
      key.removeEventListener('click', clearAndInsert);
    });
  });
});
allClearKey.addEventListener('click', () => {
  numberKeys.forEach((key) => {
    key.removeEventListener('click', clearAndInsert);
  });
});