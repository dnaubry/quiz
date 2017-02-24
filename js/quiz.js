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
],

    answers = [],           // Array to store chosen answers
    q = 0,                  // Counter to keep track of current question
    quizLength = allQuestions.length - 1,   
    startBtn = document.getElementById("startBtn");

// Adds selected answer to answerTracker array for scoring
function trackAnswers(q) {
    var answer = document.querySelector('[name=choices]:checked').value;
    answers[q] = answer;
}

// Calculates and displays final score
function finalScore (answers) {
    var scoreText = document.getElementById("question"),
        correct = 0;
    
    for (var i = 0; i < answers.length; i++) {
         if (answers[i] == allQuestions[i].correctAnswer){
            correct += 1;
    }
    }
    scoreText.innerHTML = `<p>You finished the quiz! You got ${correct} out of ${answers.length} questions correct.</p>`;
    
    for (var i = 0, num= 1; i < answers.length; i++, num++) {
        if (answers[i] == allQuestions[i].correctAnswer){
            scoreText.innerHTML += `<p>Question ${num} - ${allQuestions[i].choices[answers[i]]}<i class="fa fa-check" aria-hidden="true"></i></p>`;
        } else {
            scoreText.innerHTML += `<p>Question ${num} - ${allQuestions[i].choices[answers[i]]}<i class="fa fa-times" aria-hidden="true"></i></p>`;
        }   
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

// Inserts the current question, determined by counter q
function insertQuestion(q) {
    var qText = document.getElementById("question"),
        numChoices = allQuestions[q].choices.length,
        qNum = q + 1;
    
    qText.innerHTML = `<h2>Question ${qNum}</h2>`;
    qText.innerHTML += `<p class="qText">${allQuestions[q].question}</p>`;
    // Loops through question choices and prints each with a radio button
    for (var i = 0; i < numChoices; i++) {
        qText.innerHTML += `<p class="question-choice"><input type="radio" name="choices" id="choice${i}" value="${i}"/><label for="choice${i}">${allQuestions[q].choices[i]}</label></p>`;
    }
    // If the user goes back a question, checks the radio they previously selected
    if (answers[q] !== undefined) {
        document.querySelector(`input[value="${answers[q]}"]`).checked = true;
    }
}

function reloadQuiz() {
    window.location.reload();
}

function retryQuiz() {
    var btnEl = document.getElementById("btn"),
        retryBtn;
    btnEl.innerHTML = `<button name="retry" id="retryBtn">Retry</button>`;
    retryBtn = document.getElementById("retryBtn");
    retryBtn.addEventListener('click', reloadQuiz, false);
}

startBtn.addEventListener('click', function () {
    quizNavBtns(q);
    insertQuestion(q);
}, false);

function quizNavBtns(q) {
    var btnEl = document.getElementById("btn"),
        backBtn,
        nextBtn;
    if (q === 0) {
        btnEl.innerHTML = `<button name="next" id="nextBtn">Next</button>`;
        nextBtn = document.getElementById("nextBtn");
    } else {
        btnEl.innerHTML = `<button name="back" id="backBtn">Back</button><button name="next" id="nextBtn">Next</button>`;
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
        trackAnswers(q);
        if (q != quizLength) {
            q++;
            quizNavBtns(q);
            insertQuestion(q);
        } else {
            retryQuiz();
            finalScore(answers);
        }
    } else {
        validationMsg();
    }
}

function prevQuestion() {
    q--;
    quizNavBtns(q);
    insertQuestion(q);
}