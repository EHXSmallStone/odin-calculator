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