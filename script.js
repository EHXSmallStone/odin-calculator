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

const displayPanel = document.querySelector('#displayPanel');
const numberButtons = document.querySelectorAll('#keypad .number');
const operatorButtons = document.querySelectorAll('#keypad .operator');
const equalsKey = document.querySelector('#keypad #equals');
const allClearKey = document.querySelector('#keypad #allClear');
let displayValues = [];

numberButtons.forEach((button) => {
  button.addEventListener('click', (e) => {
    displayValues.push(e.target.value);
    displayPanel.textContent += e.target.value;
  });
});

operatorButtons.forEach((button) => {
  button.addEventListener('click', (e) => {
    // REQUIERE que se haya ingresado un valor, si no, no ingresa ningun operador al displayPanel,
    // o no llama a getResult por no tener un valor para secondNumber
    if (displayValues.length < 1) return;

    // SI firstNumber tiene un valor asignado Y se han ingresado nuevos valores para
    // secondNumber, se muestra el resultado + el operador elegido
    if (firstNumber) getResult();
    // Si getResult fue llamado, el valor de result sera asignado a firstNumber para
    // mantener una cadena de operaciones sin perder los valores anteriores
    
    firstNumber = displayValues.reduce((acc, current) => acc + current, '');
    displayValues = [];
    operator = e.target.value;
    displayPanel.textContent += ` ${operator} `;
  })
});

const getResult = () => {
  secondNumber = displayValues.reduce((acc, current) => acc + current, '');
  result = operate(operator, +firstNumber, +secondNumber);
  displayValues = result.toString().split('');

  // Round answers with long decimals:
  if (result.toString().length > 12) {
    displayPanel.textContent = result.toString().slice(0, 12) + '...';
  } else {
    displayPanel.textContent = result;
  }
};

equalsKey.addEventListener('click', () => {
  if (firstNumber && displayValues.length > 0) getResult();
});

allClearKey.addEventListener('click', () => {
  displayValues = [];
  operator = '';
  firstNumber = '';
  secondNumber = '';
  displayPanel.textContent = '';
});
