// HTML elements ko select karna
const choices = document.querySelectorAll('.choice');
const userScoreDisplay = document.getElementById('user-score');
const compScoreDisplay = document.getElementById('comp-score');
const userChoiceDisplay = document.getElementById('user-choice-display');
const compChoiceDisplay = document.getElementById('comp-choice-display');
const winnerText = document.getElementById('winner-text');

let userScore = 0;
let compScore = 0;
const getComputerChoice = () => {
    const options = ['rock', 'paper', 'scissor'];
    const randomIndex = Math.floor(Math.random() * 3); // 0, 1, ya 2 generate karega
    return options[randomIndex];
};
const playGame = (userChoice) => {
    const compChoice = getComputerChoice();
    userChoiceDisplay.textContent = `Your Choice: ${userChoice}`;
    compChoiceDisplay.textContent = `Computer's Choice: ${compChoice}`;
    if (userChoice === compChoice) {
        winnerText.textContent = "It's a Draw!";
        winnerText.style.color = "orange";
    } 
    else if (
        (userChoice === 'rock' && compChoice === 'scissor') ||
        (userChoice === 'paper' && compChoice === 'rock') ||
        (userChoice === 'scissor' && compChoice === 'paper')
    ) {
        userScore++;
        userScoreDisplay.textContent = userScore;
        winnerText.textContent = "You Win! 🎉";
        winnerText.style.color = "green";
    } 
    else {
        compScore++;
        compScoreDisplay.textContent = compScore;
        winnerText.textContent = "Computer Wins! 🤖";
        winnerText.style.color = "red";
    }
};
choices.forEach(choice => {
    choice.addEventListener('click', () => {
        const userChoice = choice.getAttribute('id');
        playGame(userChoice);
    });
});