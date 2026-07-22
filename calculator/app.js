const display = document.getElementById('display');
const buttons = document.querySelectorAll('button');
for (let button of buttons) {
    button.addEventListener('click', function () {
        const buttonValue = button.getAttribute('data-value');
        if (buttonValue === 'C') {
            clearDisplay();          
        } else if (buttonValue === '=') {
            calculateResult();        
        } else {
            appendToDisplay(buttonValue);  
        }

    });
}
function appendToDisplay(value) {
    if (display.value === '0') {
        if (value >= '0' && value <= '9') {
            display.value = value;
        }
        else if (value === '.') {
            display.value = '0.';
        }
        else {
            display.value = display.value + value;
        }

    } else {
        display.value = display.value + value;
    }
}
function clearDisplay() {
    display.value = '0';
}
function calculateResult() {
    try {
        display.value = eval(display.value);
    } catch (error) {
        display.value = 'Error';
    }
}
