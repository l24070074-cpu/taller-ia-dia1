// This file contains the logic for the calculator operations.
// It exports functions for addition, subtraction, multiplication, and division,
// as well as a function to clear the display.

let currentInput = '';
let operator = null;
let previousInput = '';

function appendNumber(number) {
    currentInput += number;
}

function chooseOperator(op) {
    if (currentInput === '') return;
    if (previousInput !== '') {
        calculate();
    }
    operator = op;
    previousInput = currentInput;
    currentInput = '';
}

function calculate() {
    let computation;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    if (isNaN(prev) || isNaN(current)) return;
    switch (operator) {
        case '+':
            computation = prev + current;
            break;
        case '-':
            computation = prev - current;
            break;
        case '*':
            computation = prev * current;
            break;
        case '/':
            computation = prev / current;
            break;
        default:
            return;
    }
    currentInput = computation.toString();
    operator = null;
    previousInput = '';
}

function clear() {
    currentInput = '';
    operator = null;
    previousInput = '';
}

function getDisplayValue() {
    return currentInput || '0';
}

export { appendNumber, chooseOperator, calculate, clear, getDisplayValue };