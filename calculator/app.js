// ==============================================
// STEP 1: Grab the display screen from the HTML
// ==============================================
const display = document.getElementById('display');

// ==============================================
// STEP 2: Grab ALL the buttons on the page
// ==============================================
const buttons = document.querySelectorAll('button');

// ==============================================
// STEP 3: Loop through each button and add a click listener
// ==============================================
for (let button of buttons) {

    button.addEventListener('click', function () {

        // Read the data-value from the HTML button (e.g. "7", "+", "C")
        const buttonValue = button.getAttribute('data-value');

        // Decide what to do based on which button was clicked
        if (buttonValue === 'C') {
            clearDisplay();           // Clear button → reset to "0"
        } else if (buttonValue === '=') {
            calculateResult();        // Equals button → do the math
        } else {
            appendToDisplay(buttonValue);  // Number/operator/decimal → add to screen
        }

    });
}

// ==============================================
// STEP 4: Function to add a value to the display
// ==============================================
function appendToDisplay(value) {

    // ---- RULE: If screen shows just "0", replace it properly ----
    // A real calculator doesn't show "05" when you press 5 — it shows "5".
    if (display.value === '0') {

        // If user pressed a NUMBER (0-9), replace the "0" with that number
        // Example: "0" + click "5" → "5"  (not "05")
        if (value >= '0' && value <= '9') {
            display.value = value;
        }
        // If user pressed a DECIMAL point, make it "0." (for typing 0.5)
        // Example: "0" + click "." → "0."
        else if (value === '.') {
            display.value = '0.';
        }
        // If user pressed an OPERATOR (+, -, *, /), keep "0" and add operator
        // Example: "0" + click "+" → "0+"
        else {
            display.value = display.value + value;
        }

    } else {
        // If screen already has a number (not just "0"), just add the new value
        // Example: "12" + click "3" → "123"
        // Example: "12" + click "+" → "12+"
        display.value = display.value + value;
    }
}

// ==============================================
// STEP 5: Function to clear the screen
// ==============================================
function clearDisplay() {
    // Reset to "0" instead of empty — cleaner look
    display.value = '0';
}

// ==============================================
// STEP 6: Function to calculate the math result
// ==============================================
function calculateResult() {
    try {
        // eval() reads a math string like "10+5*2" and solves it
        // Then puts the answer on the screen (replacing the expression)
        display.value = eval(display.value);
    } catch (error) {
        // If the math is invalid, show "Error" instead of crashing
        display.value = 'Error';
    }
}
