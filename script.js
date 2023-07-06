const add = (...args) => args.reduce((total, current) => total + current, 0);

const subtract = (...args) => args.reduce((total, current) => total - current);

const multiply = (...args) => args.reduce((total, current) => total * current);

const divide = (...args) => args.reduce((total, current) => total / current);

let operator;
let firstNumber;
let secondNumber;

const operate = (operator, firstNumber, secondNumber) => {
  // if (operator == '+') {
  //   return add(firstNumber, secondNumber);
  // } else if (operator == '-') {
  //   return subtract(firstNumber, secondNumber);
  // } else if (operator == '*') {
  //   return multiply(firstNumber, secondNumber);
  // } else if (operator == '/') {
  //   return divide(firstNumber, secondNumber);
  // }
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

const displayPanel = document.querySelector('#displayPanel');
const numberButtons = document.querySelectorAll('#keypad .number');
const operatorButtons = document.querySelectorAll('#keypad .operator');
let displayValues = [];

numberButtons.forEach((button) => {
  button.addEventListener('click', (e) => {
    displayValues.push(e.target.value);
    displayPanel.textContent += e.target.value;
  });
});

const insertOperator = (e) => {
  operator = e.target.value;
  firstNumber = displayValues.reduce((acc, current) => acc + current, '');
  displayValues = [];
  operatorButtons.forEach((button) => {
    button.removeEventListener('click', insertOperator);
  });
  displayPanel.textContent += ` ${e.target.value} `;
};

operatorButtons.forEach((button) => {
  button.addEventListener('click', insertOperator)
});