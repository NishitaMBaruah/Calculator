const display = document.getElementById('calculator-display');
const buttons = document.querySelectorAll('.buttons button');
const clearBtn = document.querySelector('.bottom-row button:nth-child(1)');
const backspaceBtn = document.querySelector('.bottom-row button:nth-child(2)');

let currentNumber = '';
let previousNumber = '';
let operator = null;

function updateDisplay(value) {
  display.textContent = value;
}

function clearDisplay() { 
  currentNumber = '';
  previousNumber = ''; 
  operator = null;
  updateDisplay('0');
}

function handleNumberClick(value) {
  currentNumber += value;
  updateDisplay(currentNumber);
} 

function handleOperatorClick(op) {
  if (previousNumber === '') {
    previousNumber = currentNumber;
    currentNumber = '';
  }
  operator = op;
}

function handleEqualClick() {
  if (previousNumber !== '' && currentNumber !== '' && operator !== null) {
    let result;
    switch (operator) {
      case '+':
        result = parseFloat(previousNumber) + parseFloat(currentNumber);
        break;
      case '-':
        result = parseFloat(previousNumber) - parseFloat(currentNumber);
        break;
      case '*':
        result = parseFloat(previousNumber) * parseFloat(currentNumber);
        break;
      case '/':
        result = parseFloat(previousNumber) / parseFloat(currentNumber);
        break;
    }
    currentNumber = result.toString();
    previousNumber = '';
    operator = null;
    updateDisplay(currentNumber);
  }
}

function backspace() {
  currentNumber = currentNumber.slice(0, -1);
  updateDisplay(currentNumber);
}

buttons.forEach(button => button.addEventListener('click', () => {
  const value = button.textContent;
  if (!isNaN(parseFloat(value))) {
    handleNumberClick(value);
  } else if (value === 'C') {
    clearDisplay();
  } else if (value === '←') {
    backspace();
  } else if (value === '=') {
    handleEqualClick();
  } else {
    handleOperatorClick(value);
  }
}));

clearBtn.addEventListener('click', clearDisplay);
backspaceBtn.addEventListener('click', backspace);
