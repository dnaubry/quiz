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
    startBtn = document.getElementById("startBtn"),
    nextBtn = document.getElementById("nextBtn"),
    backBtn = document.getElementById("backBtn"),
    retryBtn = document.getElementById("retryBtn");

startBtn.addEventListener('click', startQuiz, false);
nextBtn.addEventListener('click', nextQuestion, false);
backBtn.addEventListener('click', prevQuestion, false);
retryBtn.addEventListener('click', reloadQuiz, false);

function navigationButtons(q) {
  visibleClass = "btn-container__button--is-visible";

  if (q == 0) {
    startBtn.classList.remove(visibleClass);
    nextBtn.classList.add(visibleClass);
  } else if (q == 1) {
    backBtn.classList.add(visibleClass);
  } else if (q > quizLength) {
    backBtn.classList.remove(visibleClass);
    nextBtn.classList.remove(visibleClass);
    retryBtn.classList.add(visibleClass);
  }
}

function startQuiz() {
  navigationButtons(q);
  insertCurrentQuestion(q);
}

function nextQuestion() {
    if (radioChecked()) {
        trackAnswers(q);
        if (q != quizLength) {
            q++;
            navigationButtons(q);
            insertCurrentQuestion(q);
        } else {
            completeQuiz();
        }
    } else {
        validationMsg();
    }
}

function completeQuiz() {
  q++;
  navigationButtons(q);
  finalScore(answers);
}

function prevQuestion() {
    q--;
    navigationButtons(q);
    insertCurrentQuestion(q);
}

// Inserts the current question, determined by counter q
function insertCurrentQuestion(q) {
    var qText = document.querySelector(".questions"),
        numChoices = allQuestions[q].choices.length,
        qNum = q + 1;

    qText.innerHTML = `<h2>Question ${qNum}</h2>`;
    qText.innerHTML += `<p class="questions__text">${allQuestions[q].question}</p>`;
    // Loops through question choices and prints each with a radio button
    for (var i = 0; i < numChoices; i++) {
        qText.innerHTML += `<p class="questions__choice">
          <input type="radio" name="choices" id="choice${i}" value="${i}"/>
          <label for="choice${i}" class="questions__choice--label">${allQuestions[q].choices[i]}</label>
        </p>`;
    }
    // If the user goes back a question, checks the radio they previously selected
    if (answers[q] !== undefined) {
        document.querySelector(`input[value="${answers[q]}"]`).checked = true;
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
        position = document.querySelector(".btn-container");
    msgEl.id = 'msg';
    msgEl.appendChild(msg);
    position.appendChild(msgEl);

    var radios = document.getElementsByName("choices");
    for(var i = 0; i < radios.length; i++) {
        radios[i].addEventListener('change', removeValidationMsg, false);
    }

    function removeValidationMsg() {
      var removeMsgEl = document.getElementById("msg"),
          containerEl = removeMsgEl.parentNode;
      containerEl.removeChild(removeMsgEl);
    }
}



// Adds selected answer to answerTracker array for scoring
function trackAnswers(q) {
    var answer = document.querySelector('[name=choices]:checked').value;
    answers[q] = answer;
}

// Calculates and displays final score
function finalScore (answers) {
    var scoreText = document.querySelector(".questions"),
        correct = 0;

    for (var i = 0; i < answers.length; i++) {
         if (answers[i] == allQuestions[i].correctAnswer){
            correct += 1;
    }
    }
    scoreText.innerHTML =
      `<p class="questions__score questions__score--intro">You finished the quiz!
        You got ${correct} out of ${answers.length} questions correct.</p>`;

    for (var i = 0, num= 1; i < answers.length; i++, num++) {
        if (answers[i] == allQuestions[i].correctAnswer){
            scoreText.innerHTML +=
            `<p class="questions__score">
              Question ${num} - ${allQuestions[i].choices[answers[i]]}
              <span class="questions__score--correct">✔</span>
            </p>`;
        } else {
            scoreText.innerHTML +=
            `<p>
              Question ${num} - ${allQuestions[i].choices[answers[i]]}
              <span class="questions__score--incorrect">X</span>
            </p>`;
        }
    }
}

function reloadQuiz() {
    window.location.reload();
}
