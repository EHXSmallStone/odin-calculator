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
    if (displayPreviousOperand.textContent.includes('=')) {
      displayPreviousOperand.textContent = '';
    }
    displayValues.push(e.target.value);
    displayCurrentOperand.textContent += e.target.value;
  });
});

const operatorKeys = document.querySelectorAll('.operator');
operatorKeys.forEach((key) => {
  key.addEventListener('click', (e) => {
    if (!firstNumber && displayValues.length == 0) return;
    if (firstNumber && displayValues.length == 0 ||
        firstNumber && displayValues.length == 1 && displayValues[0] == '-') {
      operator = e.target.value;
      let firstNumberToDisplayed = checkLength(firstNumber);
      displayPreviousOperand.textContent = `${firstNumberToDisplayed} ${operator} `;
      return;
    }
    if (displayValues[0] == '-' && displayValues.length == 1) return;
    if (firstNumber) getResult();
    firstNumber = displayValues.reduce((acc, current) => acc + current, '');
    displayValues = [];
    operator = e.target.value;
    let firstNumberToDisplayed = checkLength(firstNumber);
    displayPreviousOperand.textContent = `${firstNumberToDisplayed} ${operator} `;
    displayCurrentOperand.textContent = '';
  });
});

const equalsKey = document.querySelector('#equals');
equalsKey.addEventListener('click', () => {
  if (!firstNumber || displayValues.length == 0) return;
  if (displayValues[0] == '-' && displayValues.length == 1) return;
  getResult('equals');
  // numberKeys.forEach((key) => {
  //   key.addEventListener('click', clearPreviousOperand);
  // });
  // cancelEntryKey.addEventListener('click', clearPreviousOperand);
});

function getResult(type) {
  secondNumber = displayValues.reduce((acc, current) => acc + current, '');
  result = operate(operator, +firstNumber, +secondNumber);
  // Check if it divides by 0:
  if (result == Infinity || result == -Infinity || firstNumber == 0 && secondNumber == 0) {
    displayValues = [];
    operator = '';
    firstNumber = '';
    secondNumber = '';
    displayPreviousOperand.textContent = 'DON\'T DO THAT!';
    displayCurrentOperand.textContent = '(ಠ ʖ̯ ಠ)ﮌ';
    displayCurrentOperand.style.fontFamily = 'monospace';
    return;
  }
  let secondNumberToDisplayed = checkLength(secondNumber);
  let resultToDisplayed = checkLength(result);
  if (type == 'equals') {
    displayPreviousOperand.textContent += `${secondNumberToDisplayed} =`;
    displayCurrentOperand.textContent = resultToDisplayed;
  }
  displayValues = result.toString().split('');
  operator = '';
  firstNumber = '';
  secondNumber = '';
};

function checkLength(number) {
  if (!Number.isInteger(number) && getRepetend(number)) {
    return roundRepeatingDecimals(number);
  } else if (number.toString().length > 12) {
    return number.toString().slice(0, 9) + '...';
  } else {
    return number;
  }
};

function roundRepeatingDecimals(number) {
  let patternLength = getRepetend(number).pattern.toString().length;
  let patternIndex = getRepetend(number).index;
  let multiplier = patternIndex + patternLength;
  rounded = Math.round(number * (10 ** multiplier)) / 10 ** multiplier;
  return rounded;
};

// stackoverflow.com/questions/26363390/javascript-regex-to-capture-repeating-part-of-decimal
function getRepetend(num) {
  let m = num.toString().match(/\.(\d*?)(\d+?)\2+$/);
  return m && {pattern: +m[2], index: m[1].length};
}

const allClearKey = document.querySelector('#allClear');
allClearKey.addEventListener('click', () => {
  if (displayPreviousOperand.textContent == 'DON\'T DO THAT!') {
    displayCurrentOperand.style.fontFamily = 'led_calculatorregular, monospace';
  }
  displayValues = [];
  operator = '';
  firstNumber = '';
  secondNumber = '';
  displayPreviousOperand.textContent = '';
  displayCurrentOperand.textContent = '';
});

const cancelEntryKey = document.querySelector('#cancelEntry');
cancelEntryKey.addEventListener('click', () => {
  if (displayPreviousOperand.textContent == 'DON\'T DO THAT!') {
    displayCurrentOperand.textContent = '';
    displayCurrentOperand.style.fontFamily = 'led_calculatorregular, monospace';
  }
  if (displayPreviousOperand.textContent.includes('=')) {
    displayPreviousOperand.textContent = '';
  }
  if (displayValues.length == 0) return;
  displayValues.pop();
  displayCurrentOperand.textContent = displayValues.join('');
});

const decimalPointKey = document.querySelector('#decimalPoint');
decimalPointKey.addEventListener('click', () => {
  if (displayValues.length == 1 && displayValues[0] == '.') {
    displayValues = ['0', '.'];
    displayCurrentOperand.textContent = '0.';
  }
});
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

const changeSignKey = document.querySelector('#changeSign');
changeSignKey.addEventListener('click', () => {
  if (displayPreviousOperand.textContent == 'DON\'T DO THAT!') {
    displayPreviousOperand.textContent = '';
    displayCurrentOperand.style.fontFamily = 'led_calculatorregular, monospace';
  }
  if (displayValues.includes('-')) {
    displayValues.shift();
    displayCurrentOperand.textContent = displayValues.join('');
  } else {
    displayValues.unshift('-');
    displayCurrentOperand.textContent = displayValues.join('');
  }
});

// function clearPreviousOperand() {
//   displayPreviousOperand.textContent = '';
//   numberKeys.forEach((key) => {
//     key.removeEventListener('click', clearPreviousOperand);
//   });
//   cancelEntryKey.removeEventListener('click', clearPreviousOperand);
// };

// // Remove clearPreviousOperand when using an operator key
// operatorKeys.forEach((key) => {
//   key.addEventListener('click', () => {
//     numberKeys.forEach((key) => {
//       key.removeEventListener('click', clearPreviousOperand);
//     });
//     cancelEntryKey.removeEventListener('click', clearPreviousOperand);
//   });
// });
