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
  // Reasigna displayValues con el resultado para que si un operador es usado, se usara
  // el valor del resultado para firstNumber.
  operator = '';
  firstNumber = '';
  secondNumber = '';
};

// Solo debe ser para numberKeys porque los operatorKeys deben encadenar el resultado y usarlo
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
// Es para que, despues de haber ingresado un operador con el resultado, evitar que se borre
// todo despues de querer ingresar un numero como segundo operando
// RECORDAR agregarlo tambien para las teclas de borrar

///////////////////////////////////////////////////////////////////////////////////////////////

// operatorButtons.forEach((button) => {
//   button.addEventListener('click', (e) => {
//     // REQUIERE que se haya ingresado un valor, si no, no ingresa ningun operador al displayPanel,
//     // o no llama a getResult por no tener un valor para secondNumber
//     if (displayValues.length < 1) return;

//     // SI firstNumber tiene un valor asignado Y se han ingresado nuevos valores para
//     // secondNumber, se muestra el resultado + el operador elegido
//     if (firstNumber) getResult();
//     // Si getResult fue llamado, el valor de result sera asignado a firstNumber para
//     // mantener una cadena de operaciones sin perder los valores anteriores

//     firstNumber = displayValues.reduce((acc, current) => acc + current, '');
//     displayValues = [];
//     operator = e.target.value;
//     displayPanel.textContent += ` ${operator} `;
//   })
// });

// const getResult = () => {
//   secondNumber = displayValues.reduce((acc, current) => acc + current, '');

//   // /0+/ regExp o /0/g
//   if (operator == '/' && (/0+/).test(secondNumber)) {
//     displayValues = [];
//     operator = '';
//     firstNumber = '';
//     secondNumber = '';
//     displayPanel.textContent = 'The operation divided by 0 is not allowed';
//     numberButtons.forEach((button) => {
//       button.addEventListener('click', clearAndInsert);
//     });
//     return;
//   }

//   result = operate(operator, +firstNumber, +secondNumber);
//   displayValues = result.toString().split('');

//   // Round answers with long decimals:
//   if (result.toString().length > 12) {
//     displayPanel.textContent = result.toString().slice(0, 12) + '...';
//   } else {
//     displayPanel.textContent = result;
//   }

//   operator = '';
//   firstNumber = '';
//   secondNumber = '';
// };

// equalsKey.addEventListener('click', () => {
//   if (firstNumber && displayValues.length > 0) getResult();
// });

// allClearKey.addEventListener('click', () => {
//   displayValues = [];
//   operator = '';
//   firstNumber = '';
//   secondNumber = '';
//   displayPanel.textContent = '';
// });

// const clearAndInsert = (e) => {
//   displayValues = [];
//   displayValues.push(e.target.value);
//   displayPanel.textContent = e.target.value;
//   numberButtons.forEach((button) => {
//     button.removeEventListener('click', clearAndInsert);
//   });
// };