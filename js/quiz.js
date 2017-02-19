/*eslint-env es6*/

// Array containing the quiz questions
var allQuestions = [
    {
        question: "What are the house words of House Stark?",
        choices: ["The North Remembers", "When the snows fall and the white winds blow, the lone wolf dies but the pack survives", "Winter is Coming", "The winters are hard, but the Starks will endure"],
        correctAnswer: 2
    },
    {
        question: "What are the house words of House Lannister?",
        choices: ["Hear me roar!", "A Lannister always pays his debts", "Teach them what it means to put a lion in a cage", "When you play a game of thrones, you win or you die"],
        correctAnswer: 0
    },
    {
        question: "What are the house words of House Targaryen?",
        choices: ["Fire cannot kill a dragon", "Blood of the Dragon", "All men must die, but we are not men", "Fire and Blood"],
        correctAnswer: 3
    }
];

var answers = [],
    answerTracker = [],
    questionCount = 0, // Keeps track of current question
    quizLength = allQuestions.length - 1; // Number of questions in the quiz

// scoreQuestions checks if the answer is correct and adds correct/incorrect to the answers array
function quizScore(questionCount) {
    var checked = document.querySelector('[name=choices]:checked').value;

    if (answers[questionCount] === undefined) {
        if (checked == allQuestions[questionCount].correctAnswer) {
            answers.push("correct");
        } else {
            answers.push("incorrect");
        }
    } else {
        if (checked == allQuestions[questionCount].correctAnswer) {
            answers[questionCount] = "correct";
        } else {
            answers[questionCount] = "incorrect";
        }
    }
}

// Adds selected answer to answerTracker array
function trackAnswers(questionCount) {
    var answer = document.querySelector('[name=choices]:checked').value;

    if (answerTracker[questionCount] === undefined) {
        answerTracker.push(answer);
    } else {
        answerTracker[questionCount] = answer;
    }
}

function finalScore (answers, answerTracker) {
    var scoreText = document.getElementById("question");
    scoreText.innerHTML= "<p>You finished!</p>";
    for (var i = 0, num= 1; i < answers.length; i++, num++) {
        scoreText.innerHTML += `<p>Question ${num}: "${allQuestions[i].choices[answerTracker[i]]}" - ${answers[i].toUpperCase()}!`;
    }
    
}

// Checks if the user selected an answer
function radioChecked() {
    var radios = document.getElementsByName("choices");
    for (var i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            return true;
        }
    }

    return false;
}

// Displays a message if user does not choose an answer
function validationMsg() {
    var msgEl = document.createElement('div'),
        msg = document.createTextNode('Please choose an answer!'),
        position = document.getElementById("btn");
    msgEl.id = 'msg';
    msgEl.appendChild(msg);
    position.appendChild(msgEl);

}

// Inserts the current question, determined by questionCount, into the #question <div>
function insertQuestion(questionCount) {
    var questionText = document.getElementById("question"),
        numberOfChoices = allQuestions[questionCount].choices.length,
        qNum = questionCount + 1;
    
    questionText.innerHTML = `<p>Question ${qNum}`;
    questionText.innerHTML += `<p class="qText">${allQuestions[questionCount].question}</p>`;
    // Loops through question choices and prints each with a radio button
    for (var i = 0; i < numberOfChoices; i++) {
        questionText.innerHTML += `<p><label><input type="radio" name="choices" value="${i}"/> ${allQuestions[questionCount].choices[i]}</label></p>`;
    }
    // If the user goes back, checks the answer they previously selected
    if (answerTracker[questionCount] !== undefined) {
        var currentAnswer = answerTracker[questionCount];
        document.querySelector(`input[value="${currentAnswer}"]`).checked = true;
    }
}

function reloadQuiz() {
    window.location.reload();
}

function retryQuiz() {
    var btns = document.getElementById("btn"),
        retryBtn;
    btns.innerHTML = `<button name="retry" id="retryBtn">Retry</button>`;
    retryBtn = document.getElementById("retryBtn");
    retryBtn.addEventListener('click', reloadQuiz, false);
}

var startBtn = document.getElementById("startBtn");
startBtn.addEventListener('click', function () {
    quizNavBtns(questionCount);
    insertQuestion(questionCount);
}, false);

function quizNavBtns(questionCount) {
    var btns = document.getElementById("btn"),
        backBtn,
        nextBtn;
    if (questionCount === 0) {
        btns.innerHTML = `<button name="next" id="nextBtn">Next</button>`;
        nextBtn = document.getElementById("nextBtn");
    } else {
        btns.innerHTML = `<button name="back" id="backBtn">Back</button><button name="next" id="nextBtn">Next</button>`;
        backBtn = document.getElementById("backBtn");
        nextBtn = document.getElementById("nextBtn");
    }
    if (backBtn) {
        backBtn.addEventListener('click', prevQuestion, false);
    }
    nextBtn.addEventListener('click', nextQuestion, false);

}

function nextQuestion() {
    if (radioChecked()) {
        quizScore(questionCount);
        trackAnswers(questionCount);
        if (questionCount != quizLength) {
            questionCount++;
            quizNavBtns(questionCount);
            insertQuestion(questionCount);
        } else {
            retryQuiz();
            finalScore(answers, answerTracker);
        }
    } else {
        validationMsg();
    }
}

function prevQuestion() {
    questionCount--;
    quizNavBtns(questionCount);
    insertQuestion(questionCount);
}