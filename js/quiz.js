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
    }
];

var questionCount = -1;                         // Keeps track of current question
var quizLength = allQuestions.length;           // Number of questions in the quiz
var userScore = 0;                              // Score counter

// scoreQuestions checks if the answer is correct and adds a point to userScore if it is correct
function scoreQuestion (questionCount) {
    var checked = document.querySelector('[name=choices]:checked').value;
    if (checked == allQuestions[questionCount].correctAnswer) {
        userScore += 1;
    }
}

// nextQuestion replaces the question with the next question
function nextQuestion (questionCount) {
    var questionText = document.getElementById("question");
    var numberOfChoices = allQuestions[questionCount].choices.length;

    questionText.innerHTML = '';
    questionText.innerHTML = `<p class="qText">${allQuestions[questionCount].question}</p>`;

    for (var i = 0; i < numberOfChoices; i++) {
        questionText.innerHTML += `<p><label><input type="radio" name="choices" value="${i}"/> ${allQuestions[questionCount].choices[i]}</label></p>`;
    }

}

// incrementQuestionCount is a question counter
function incrementQuestionCount () {
    questionCount += 1;
}


function quizEnd () {   
        var scoreText = document.getElementById("question");
        scoreText.innerHTML = `You've finished the quiz! Here is your score: ${userScore}`;
    }

function reloadQuiz () {
    window.location.reload();
}

function retryQuiz () {
    var retryBtn = document.getElementById("btn");
    retryBtn.innerHTML = `<button name="retry">Retry</button>`;
    retryBtn.addEventListener('click', reloadQuiz, false);
}

var nextBtn = document.getElementById("btn");
nextBtn.addEventListener('click', function () {
    if (document.querySelector('[name=choices]')) {
        scoreQuestion(questionCount);
    }
    incrementQuestionCount();
    if (questionCount == quizLength) {
            quizEnd();
            retryQuiz();
    } else {
      nextQuestion(questionCount);  
    }    
}, false);
