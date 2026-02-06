//Sets up global variables for use
let previousNumber = '';
let currentNumber = '';
let currentOperation = '';

//Updates display
function updateDisplay(value) {
    document.getElementById('display').value = value;
}

//A yet to be finished function for keyboard interaction for the Calculator
updateDisplay.addEventListener('keydown', function(event) {
    if (event.key === 'enter') {
        CalculateBtw();
    }
});

//Gets the previous and current number
function appendNumber(number) {
    currentNumber += number;
    updateDisplay(`${previousNumber} ${currentOperation} ${currentNumber}`);
}

//Gets what operation users wants to use, handles if users does anything or not
function appendOperation(operation) {
    if (currentNumber === '') return;
    if (previousNumber !== '') {
        CalculateBtw();
    } else
    //When user puts operation, the current input turns into the previous input after user inputs an operation
    currentOperation = operation;
    previousNumber = currentNumber;
    currentNumber = '';

    //Updates the display with the operation inside
    updateDisplay(`${previousNumber} ${currentOperation}`); 
}

//Here handles if previous or current number has no value, thus does nothing in return
//otherwise, it will calculate the result from using Prev and Curr and also handles float values
function CalculateBtw() {
    if (previousNumber === '' || currentNumber === '') return;

    const Prev = parseFloat(previousNumber);
    const Curr = parseFloat(currentNumber);
    let result;

    switch (currentOperation) {
        case '+': result = Prev + Curr; break;
        case '-': result = Prev - Curr; break;
        case '*': result = Prev * Curr; break;
        case '/':
            if (Curr === 0) {
                updateDisplay("Division by zero is not allowed");
                alert("Error! Operation caused an error, please do it again!");
                return;
            } else
            result = Prev / Curr;
            break;
        default:
            return;
    }

    //The result becomes the current number and turns into a string for display
    //previousNumber's value and currentOperation's value is reset after computing
    currentNumber = result.toString();
    previousNumber = '';
    currentOperation = '';
    updateDisplay(currentNumber);
}

//Removes any residual value after computing when user clicks the "Clear" button and updates the display
function clearDisplay() {
    previousNumber = '';
    currentNumber = '';
    currentOperation = '';
    updateDisplay('');
}