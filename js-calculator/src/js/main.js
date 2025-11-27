// This file serves as the entry point for the JavaScript functionality. 
// It initializes the calculator, sets up event listeners for the numeric keys, and handles user interactions.

import { add, subtract, multiply, divide, clearDisplay } from './calculator.js';

const display = document.getElementById('display');
const buttons = document.querySelectorAll('.button');

let currentInput = '';
let operator = null;
let firstOperand = null;

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.textContent;

    if (!isNaN(value) || value === '.') {
      currentInput += value;
      updateDisplay(currentInput);
    } else if (value === 'C') {
      clear();
    } else {
      handleOperator(value);
    }
  });
});

function updateDisplay(value) {
  display.textContent = value;
}

function clear() {
  currentInput = '';
  operator = null;
  firstOperand = null;
  clearDisplay(display);
}

function handleOperator(value) {
  if (currentInput === '') return;

  if (firstOperand === null) {
    firstOperand = parseFloat(currentInput);
  } else if (operator) {
    firstOperand = operate(firstOperand, parseFloat(currentInput), operator);
  }

  operator = value;
  currentInput = '';
}

function operate(first, second, operator) {
  switch (operator) {
    case '+':
      return add(first, second);
    case '-':
      return subtract(first, second);
    case '*':
      return multiply(first, second);
    case '/':
      return divide(first, second);
    default:
      return second;
  }
}