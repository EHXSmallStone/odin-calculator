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

const displayPreviousOperand = document.querySelector('#previousOperand');
const displayCurrentOperand = document.querySelector('#currentOperand');
const numberKeys = document.querySelectorAll('.number');
let displayValues = [];

numberKeys.forEach((key) => {
  key.addEventListener('click', (e) => {
    // Clear the result of dividing by 0:
    if (displayPreviousOperand.textContent == 'DON\'T DO THAT!') {
      displayValues.push(e.target.value);
      displayPreviousOperand.textContent = '';
      displayCurrentOperand.textContent = e.target.value;
      displayCurrentOperand.style.fontFamily = 'led_calculatorregular, monospace';
      return;
    }
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
    key.addEventListener('click', clearPreviousOperand);
  });
  cancelEntryKey.addEventListener('click', clearPreviousOperand);
});

function getResult(type) {
  secondNumber = displayValues.reduce((acc, current) => acc + current, '');
  result = operate(operator, +firstNumber, +secondNumber);
  // Check if it divides by 0:
  if (result === Infinity) {
    displayValues = [];
    operator = '';
    firstNumber = '';
    secondNumber = '';
    displayPreviousOperand.textContent = 'DON\'T DO THAT!';
    displayCurrentOperand.textContent = '(ಠ ʖ̯ ಠ)ﮌ';
    displayCurrentOperand.style.fontFamily = 'monospace';
    return;
  }
  if (type == 'equals') {
    displayPreviousOperand.textContent += `${secondNumber} =`;
    displayCurrentOperand.textContent = result;
  }
  displayValues = result.toString().split('');
  operator = '';
  firstNumber = '';
  secondNumber = '';
};

const allClearKey = document.querySelector('#allClear');
allClearKey.addEventListener('click', () => {
  displayValues = [];
  operator = '';
  firstNumber = '';
  secondNumber = '';
  displayPreviousOperand.textContent = '';
  displayCurrentOperand.textContent = '';
});

const cancelEntryKey = document.querySelector('#cancelEntry');
cancelEntryKey.addEventListener('click', () => {
  if (displayValues.length == 0) return;
  displayValues.pop();
  displayCurrentOperand.textContent = displayValues.join('');
});

const decimalPointKey = document.querySelector('#decimalPoint');
const allKeys = document.querySelectorAll('#keypad button');
allKeys.forEach((key) => {
  key.addEventListener('click', checkDecimalPoint);
});

function checkDecimalPoint() {
  if (displayValues.includes('.')) {
    decimalPointKey.disabled = true;
  } else {
    decimalPointKey.disabled = false;
  }
};

function clearPreviousOperand() {
  displayPreviousOperand.textContent = '';
  numberKeys.forEach((key) => {
    key.removeEventListener('click', clearPreviousOperand);
  });
  cancelEntryKey.removeEventListener('click', clearPreviousOperand);
};

// Remove clearPreviousOperand when using an operator key
operatorKeys.forEach((key) => {
  key.addEventListener('click', () => {
    numberKeys.forEach((key) => {
      key.removeEventListener('click', clearPreviousOperand);
    });
    cancelEntryKey.removeEventListener('click', clearPreviousOperand);
  });
});

// function checkResultLength(result) {
//   if (result.toString().length > 12) {
//     return result.toString().slice(0, 9) + '...';
//   } else {
//     return result;
//   }
// };
