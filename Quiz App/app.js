const questions = [
    {
        question: "What does 'JS' stand for?",
        options: ["JavaSyntax", "JavaScript", "JustScript", "JavaSource"],
        answer: 1
    },
    {
        question: "Which keyword is used to declare a variable that CANNOT be reassigned?",
        options: ["var", "let", "const", "static"],
        answer: 2   // const
    },
    {
        question: "What is the correct way to write a comment in JavaScript?",
        options: ["<!-- Comment -->", "// Comment", "# Comment", "/* Comment */"],
        answer: 1   // // Comment
    },
    {
        question: "Which method adds an element to the end of an array?",
        options: ["push()", "pop()", "shift()", "unshift()"],
        answer: 0   // push()
    },
    {
        question: "What does 'typeof 42' return?",
        options: ["'number'", "'string'", "'boolean'", "'object'"],
        answer: 0   // 'number'
    },
    {
        question: "How do you write an 'if' statement in JavaScript?",
        options: ["if x > 5 {}", "if (x > 5) {}", "if x > 5 then {}", "if [x > 5] {}"],
        answer: 1   // if (x > 5) {}
    },
    {
        question: "Which symbol is used for strict equality comparison?",
        options: ["=", "==", "===", "!="],
        answer: 2   // ===
    },
    {
        question: "What is the output of 'console.log(typeof null)'?",
        options: ["'null'", "'undefined'", "'object'", "'boolean'"],
        answer: 2   // 'object' (this is a famous JS quirk!)
    },
    {
        question: "Which function converts a string to an integer?",
        options: ["parseInt()", "parseFloat()", "toString()", "toInteger()"],
        answer: 0   // parseInt()
    },
    {
        question: "What does 'let' allow that 'const' does not?",
        options: ["Reassignment", "Hoisting", "Block scope", "Global scope"],
        answer: 0   // Reassignment
    },
    {
        question: "How do you find the length of a string 'Hello'?",
        options: ["Hello.length", "length(Hello)", "Hello.size", "len(Hello)"],
        answer: 0   // Hello.length
    },
    {
        question: "Which loop runs AT LEAST once regardless of condition?",
        options: ["for", "while", "do...while", "for...of"],
        answer: 2   // do...while
    },
    {
        question: "What is the index of the first element in an array?",
        options: ["-1", "0", "1", "undefined"],
        answer: 1   // 0
    },
    {
        question: "Which operator is used for logical AND?",
        options: ["&", "||", "&&", "!"],
        answer: 2   // &&
    },
    {
        question: "What does 'JSON' stand for?",
        options: ["Java Standard Object Notation", "JavaScript Object Notation", "Java Serialized Object Notation", "JavaScript Online Notation"],
        answer: 1   // JavaScript Object Notation
    },
    {
        question: "Which method removes the LAST element from an array?",
        options: ["push()", "pop()", "shift()", "slice()"],
        answer: 1   // pop()
    },
    {
        question: "How do you create a function in JavaScript?",
        options: ["function = myFunc() {}", "function myFunc() {}", "create myFunc() {}", "func myFunc() {}"],
        answer: 1   // function myFunc() {}
    },
    {
        question: "What does 'NaN' stand for?",
        options: ["Not a Number", "Null and Null", "Negative a Number", "No Assignment Name"],
        answer: 0   // Not a Number
    },
    {
        question: "Which symbol is used for template literals (template strings)?",
        options: ["'' (single quotes)", "\"\" (double quotes)", "`` (backticks)", "() (parentheses)"],
        answer: 2   // backticks
    },
    {
        question: "What is the correct way to check if 'x' is an array?",
        options: ["typeof x === 'array'", "x.isArray()", "Array.isArray(x)", "x instanceof Array"],
        answer: 2   // Array.isArray(x)
    }
];
const startScreen     = document.getElementById('startScreen');
const quizScreen      = document.getElementById('quizScreen');
const resultScreen    = document.getElementById('resultScreen');

const startBtn        = document.getElementById('startBtn');
const restartBtn      = document.getElementById('restartBtn');
const prevBtn         = document.getElementById('prevBtn');
const nextBtn         = document.getElementById('nextBtn');

const questionText    = document.getElementById('questionText');
const optionsContainer = document.getElementById('optionsContainer');
const questionCounter = document.getElementById('questionCounter');
const progressFill    = document.getElementById('progressFill');

const resultEmoji     = document.getElementById('resultEmoji');
const resultText      = document.getElementById('resultText');
const resultDetail    = document.getElementById('resultDetail');
const resultMessage   = document.getElementById('resultMessage');
const resultSummary   = document.getElementById('resultSummary');
let currentQuestionIndex = 0;
let userAnswers = [];
let quizCompleted = false;
function startQuiz() {

    currentQuestionIndex = 0;
    quizCompleted = false;
    userAnswers = new Array(questions.length).fill(null);
    // Switch screens: hide start, show quiz
    startScreen.classList.add('hidden');
    quizScreen.classList.remove('hidden');
    resultScreen.classList.add('hidden');
    loadQuestion();
}
function loadQuestion() {
    const q = questions[currentQuestionIndex];
    questionCounter.textContent = `Question ${currentQuestionIndex + 1} / ${questions.length}`;
    const answeredCount = userAnswers.filter(ans => ans !== null).length;
    const progressPercent = (answeredCount / questions.length) * 100;
    progressFill.style.width = `${progressPercent}%`;
    questionText.textContent = q.question;
    optionsContainer.innerHTML = '';

    // ---- Create 4 option buttons ----
    for (let i = 0; i < q.options.length; i++) {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = q.options[i];
        btn.dataset.index = i;

        // If user already selected an answer for this question, highlight it
        const savedAnswer = userAnswers[currentQuestionIndex];
        if (savedAnswer !== null && savedAnswer === i) {
            btn.classList.add('selected');
        }

        // When user clicks this option
        btn.addEventListener('click', function() {
            selectOption(i);
        });

        optionsContainer.appendChild(btn);
    }

    // ---- Handle Back button visibility ----
    if (currentQuestionIndex === 0) {
        prevBtn.classList.add('hidden-btn');
    } else {
        prevBtn.classList.remove('hidden-btn');
    }

    // ---- Change Next to Submit on last question ----
    if (currentQuestionIndex === questions.length - 1) {
        nextBtn.textContent = 'Submit ✅';
    } else {
        nextBtn.textContent = 'Next ➡';
    }
}
function selectOption(optionIndex) {

    // Save the user's answer
    userAnswers[currentQuestionIndex] = optionIndex;

    // Remove 'selected' from all options
    const allOptions = document.querySelectorAll('.option-btn');
    for (let btn of allOptions) {
        btn.classList.remove('selected');
    }

    // Add 'selected' to the clicked option
    for (let btn of allOptions) {
        if (parseInt(btn.dataset.index) === optionIndex) {
            btn.classList.add('selected');
            break;
        }
    }

    // Update progress bar
    const answeredCount = userAnswers.filter(ans => ans !== null).length;
    const progressPercent = (answeredCount / questions.length) * 100;
    progressFill.style.width = `${progressPercent}%`;
}
function goToNext() {

    // ---- Check if user answered this question ----
    if (userAnswers[currentQuestionIndex] === null) {
        const counter = document.getElementById('questionCounter');
        counter.textContent = `⚠️ Please select an answer first!`;
        counter.style.color = '#ff416c';
        setTimeout(() => {
            counter.style.color = '';
            loadQuestion();
        }, 1500);
        return; // Stop — don't proceed
    }

    // ---- If this was the LAST question, show results ----
    if (currentQuestionIndex === questions.length - 1) {
        showResults();
        return;
    }

    // ---- Otherwise, move to next question ----
    currentQuestionIndex++;
    loadQuestion();
}
function goToPrev() {
    if (currentQuestionIndex === 0) return;
    currentQuestionIndex--;
    loadQuestion();
}
function showResults() {

    quizCompleted = true;

    // ---- Calculate score ----
    let score = 0;
    for (let i = 0; i < questions.length; i++) {
        if (userAnswers[i] === questions[i].answer) {
            score++;
        }
    }

    // ---- Calculate percentage ----
    const percentage = Math.round((score / questions.length) * 100);

    // ---- Determine grade and emoji ----
    let emoji, grade, message;

    if (percentage >= 90) {
        emoji = '🏆'; grade = 'Excellent!';
        message = "You're a JavaScript pro! Almost perfect! 🌟";
    } else if (percentage >= 70) {
        emoji = '🎉'; grade = 'Great Job!';
        message = "You know your JS well! Keep practicing! 💪";
    } else if (percentage >= 50) {
        emoji = '👍'; grade = 'Good Effort!';
        message = "Not bad! Review the wrong answers below to improve! 📚";
    } else if (percentage >= 30) {
        emoji = '💪'; grade = 'Needs Improvement';
        message = "Don't give up! Study the answers below and try again! 🔄";
    } else {
        emoji = '😅'; grade = 'Oops!';
        message = "Time to practice more! The correct answers are shown below. 📖";
    }

    // ---- Update result screen ----
    resultEmoji.textContent = emoji;
    resultText.textContent = `You scored ${score} / ${questions.length}`;
    resultDetail.textContent = `${percentage}% - ${grade}`;
    resultMessage.textContent = message;
    resultSummary.innerHTML = '';  // clear old summary

    for (let i = 0; i < questions.length; i++) {
        const q = questions[i];
        const userAnswerIndex = userAnswers[i];
        const correctAnswerIndex = q.answer;
        const correctAnswerText = q.options[correctAnswerIndex];
        //  Gets the TEXT of the correct answer (e.g. "push()")

        const isCorrect = (userAnswerIndex === correctAnswerIndex);

        // ---- Create the row ----
        const item = document.createElement('div');
        item.className = 'summary-item';
        const badge = document.createElement('span');
        badge.className = 'summary-badge';
        badge.textContent = isCorrect ? '✅' : '❌';

        // Question number
        const qNum = document.createElement('span');
        qNum.className = 'summary-q';
        qNum.textContent = `Q${i + 1}`;

        // Question text 
        const qText = document.createElement('span');
        qText.className = 'summary-text';
        qText.textContent = q.question;

        // ---- Answers wrapper (user answer → correct answer if wrong) ----
        const answersWrapper = document.createElement('span');
        answersWrapper.className = 'answers-wrapper';

        // User's answer badge
        const yourAnswer = document.createElement('span');
        yourAnswer.className = `summary-your ${isCorrect ? 'correct-badge' : 'wrong-badge'}`;

        if (userAnswerIndex !== null) {
            yourAnswer.textContent = q.options[userAnswerIndex];
        } else {
            yourAnswer.textContent = 'Skipped';
        }
        answersWrapper.appendChild(yourAnswer);

        // ★ If WRONG, also show the correct answer!
        if (!isCorrect) {
            // Arrow separator
            const arrow = document.createElement('span');
            arrow.className = 'correct-arrow';
            arrow.textContent = '→';

            // Correct answer badge (always green)
            const correctBadge = document.createElement('span');
            correctBadge.className = 'summary-correct';
            correctBadge.textContent = correctAnswerText;

            answersWrapper.appendChild(arrow);
            answersWrapper.appendChild(correctBadge);
        }

        // Assemble the row
        item.appendChild(badge);
        item.appendChild(qNum);
        item.appendChild(qText);
        item.appendChild(answersWrapper);

        // Add to summary
        resultSummary.appendChild(item);
    }

    // ---- Switch to result screen ----
    quizScreen.classList.add('hidden');
    resultScreen.classList.remove('hidden');
}

function restartQuiz() {
    resultScreen.classList.add('hidden');
    startScreen.classList.remove('hidden');
}
startBtn.addEventListener('click', startQuiz);
restartBtn.addEventListener('click', restartQuiz);
nextBtn.addEventListener('click', goToNext);
prevBtn.addEventListener('click', goToPrev);
document.addEventListener('keydown', function(event) {
    if (!quizScreen.classList.contains('hidden')) {
        if (event.key === 'ArrowRight') goToNext();
        else if (event.key === 'ArrowLeft') goToPrev();
    }
});
