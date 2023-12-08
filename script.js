document.addEventListener("DOMContentLoaded", function () {
    const display = document.getElementById("calculator-display");
    const buttons = document.querySelectorAll(".buttons button, .bottom-row button");

    let currentInput = "";
    let currentOperator = "";
    let prevInput = "0";

    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            handleButtonClick(button.innerText);
            updateDisplay();
        });
    }); 

    function handleButtonClick(value) {
        if (isDigit(value)) {
            currentInput += value;
        } else if (isOperator(value)) {
            handleOperator(value);
        } else if (value === "=") {
            performCalculation();
        } else if (value === "C") {
            clearCalculator();
        } else if (value === "Backspace") {
            backspace();
        }
    }

    function isDigit(value) {
        return /^\d$/.test(value);
    }

    function isOperator(value) {
        return /[\+\-\*/]/.test(value);
    }

    function handleOperator(operator) {
        if (currentInput !== "") {
            performCalculation();
            currentOperator = operator;
            prevInput = currentInput;
            currentInput = "";
        } else if (currentInput === "" && prevInput !== "0") {
            currentOperator = operator;
        }
    }

    function performCalculation() {
        if (currentInput !== "") {
            try {
                const result = new Function('return ' + prevInput + currentOperator + currentInput)();
                currentInput = String(result);
                currentOperator = "";
                prevInput = "0";
            } catch (error) {
                // Handle invalid expressions or errors
                currentInput = "Error";
            }
        }
    }

    function clearCalculator() {
        currentInput = "";
        currentOperator = "";
        prevInput = "0";
    }

    function backspace() {
        currentInput = currentInput.slice(0, -1);
        if (currentInput === "") {
            currentInput = "0";
        }
    }

    function updateDisplay() {
        display.innerText = currentInput === "" ? "0" : currentInput;
    }
});
