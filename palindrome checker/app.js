const userInput = document.getElementById('userInput');
const checkBtn = document.getElementById('checkBtn');
const clearBtn = document.getElementById('clearBtn');
const resultDiv = document.getElementById('result');
checkBtn.addEventListener('click', function() {
    checkPalindrome();
});
clearBtn.addEventListener('click', function() {
    clearAll();
});
userInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        checkPalindrome();  
    }
});
function checkPalindrome() {
    const rawText = userInput.value;
    if (rawText === '') {
        resultDiv.innerHTML = `<span class="placeholder">Please type a word or phrase first!</span>`;
        return;  
    }
    const cleanedText = rawText.toLowerCase().replace(/[^a-z0-9]/g, '');
    if (cleanedText === '') {
        resultDiv.innerHTML = `<span class="placeholder">That's just punctuation/spaces! Try a real word.</span>`;
        return;
    }
    const reversedText = cleanedText.split('').reverse().join('');
    if (cleanedText === reversedText) {
        showResult(true, rawText, cleanedText);
    } else {
        showResult(false, rawText, cleanedText);
    }
}
function showResult(isPalindrome, originalText, cleanedText) {

    if (isPalindrome === true) {
        resultDiv.innerHTML = `
            <span class="success">
                ✅ Yes! "<strong>${originalText}</strong>" IS a palindrome!
            </span>
            <span class="info-text">
                Cleaned: "${cleanedText}" → reversed: "${cleanedText.split('').reverse().join('')}"
            </span>
        `;
    } else {
        resultDiv.innerHTML = `
            <span class="failure">
                ❌ No! "<strong>${originalText}</strong>" is NOT a palindrome.
            </span>
            <span class="info-text">
                "${cleanedText}" reversed is "${cleanedText.split('').reverse().join('')}" — they don't match.
            </span>
        `;
    }
}
function clearAll() {
    userInput.value = '';
    resultDiv.innerHTML = `<span class="placeholder">Waiting for input...</span>`;
    userInput.focus();
}
userInput.focus();
