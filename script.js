

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) {
        return "Don't do that!"; 
    }
    return a / b;
}

let firstNumber = null;
let operator = null;
let secondNumber = null;

function operate(operator, a, b) {
    a = parseFloat(a);
    b = parseFloat(b);
    
    switch (operator) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case '*':
            return multiply(a, b);
        case '/':
            return divide(a, b);
        default:
            return null;
    }
}

let displayValue = '0';
let justCalculated = false;  

const display = document.querySelector('.display p');
const digitButtons = document.querySelectorAll('.digits');
const operatorButtons = document.querySelectorAll('.operator:not(.equals)');
const equalsButton = document.querySelector('.equals');
const clearButton = document.querySelector('.clear');
const decimalButton = document.querySelector('.decimal');

function updateDisplay() {
    display.textContent = displayValue;
}

function inputDigit(digit) {
    if (justCalculated) {
        displayValue = digit;
        justCalculated = false;
    } else {
        displayValue = displayValue === '0' ? digit : displayValue + digit;
    }
    updateDisplay();
}

function inputDecimal() {

    if (justCalculated) {
        displayValue = '0.';
        justCalculated = false;
    } else if (!displayValue.includes('.')) {
        displayValue += '.';
    }
    updateDisplay();
}

function inputOperator(nextOperator) {
    const inputValue = parseFloat(displayValue);

    if (firstNumber !== null && operator !== null && !justCalculated) {
        const result = operate(operator, firstNumber, displayValue);
        
        if (typeof result === 'string') {
            displayValue = result;
            updateDisplay();
            firstNumber = null;
            operator = null;
            return;
        }
        
        displayValue = roundResult(result);
        updateDisplay();
        firstNumber = displayValue;
    } else if (firstNumber === null) {
        firstNumber = displayValue;
    }
    
    justCalculated = true;
    operator = nextOperator;
}

function calculate() {

    if (firstNumber !== null && operator !== null && !justCalculated) {
        const result = operate(operator, firstNumber, displayValue);
        
    
        if (typeof result === 'string') {
            displayValue = result;
            updateDisplay();
          
            firstNumber = null;
            operator = null;
            return;
        }
        
        displayValue = roundResult(result);
        updateDisplay();
        
  
        firstNumber = null;
        operator = null;
        justCalculated = true;
    }
  
}

function clearCalculator() {
    displayValue = '0';
    firstNumber = null;
    operator = null;
    secondNumber = null;
    justCalculated = false;
    updateDisplay();
}

function roundResult(result) {
   
    const rounded = Math.round(result * 100000000) / 100000000;
    
    let stringResult = rounded.toString();
    
    if (stringResult.length > 10) {
        if (Math.abs(rounded) >= 1000000000) {
            stringResult = rounded.toExponential(5);
        } else {
            stringResult = stringResult.slice(0, 10);
        }
    }
    
    return stringResult;
}

digitButtons.forEach(button => {
    button.addEventListener('click', () => {
        inputDigit(button.textContent);
    });
});

operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        inputOperator(button.textContent);
    });
});


equalsButton.addEventListener('click', calculate);

clearButton.addEventListener('click', clearCalculator);

decimalButton.addEventListener('click', inputDecimal);

updateDisplay();


function testFunctions() {
    console.log('Testing basic functions:');
    console.log('add(2, 3) =', add(2, 3));
    console.log('subtract(5, 2) =', subtract(5, 2));
    console.log('multiply(3, 4) =', multiply(3, 4));
    console.log('divide(10, 2) =', divide(10, 2));
    console.log('divide(5, 0) =', divide(5, 0));
    console.log('operate("+", 2, 3) =', operate('+', 2, 3));
}