import { questionSet as questionSet1 } from './data/got.js';
import { questionSet as questionSet2 } from './data/buffy.js';
import { radioChecked } from './modules/radioChecked';
import { validation, removeValidationMsg } from './modules/validation';
var choicesTemplate = require('./templates/answerchoices.hbs');
var scoreTemplate = require('./templates/finalscore.hbs');

var questionSet = [[questionSet1], [questionSet2]],
	answerSet = [],
	q0 = 0, q1 = 0, q2 = 0, q3 = 0,
  q = q1,
	quizNum = 0,
	quizIndex = 0,
	qSet, quizLength, q, aSet,
	tabs = document.querySelector('.tabbed-panel'),
  startBtn = document.querySelector(`div#buttons-${quizNum} button.start`),
	backBtn = document.querySelector(`div#buttons-${quizNum} button.back`),
	nextBtn = document.querySelector(`div#buttons-${quizNum} button.next`),
	retryBtn = document.querySelector(`div#buttons-${quizNum} button.retry`);

startBtn.addEventListener('click', startQuiz, false);
backBtn.addEventListener('click', prevQuestion, false);
nextBtn.addEventListener('click', nextQuestion, false);
retryBtn.addEventListener('click', reloadQuiz, false);

tabs.addEventListener('change', function(e) {
	var target = e.target;
		if (target.id === 'tabbed0') {
			quizNum = 0;
		} else if (target.id === 'tabbed1') {
			quizNum = 1;
		} else if (target.id === 'tabbed2') {
			quizNum = 2;
		} else if (target.id === 'tabbed3') {
			quizNum = 3;
		}
		initializeQuiz(quizNum);
	});

	initializeQuiz(quizNum);

	function initializeQuiz(quizNum) {
    if (quizNum === 0) {
      q = q0;
    } else if (quizNum === 1) {
      q = q1;
    } else if (quizNum === 2) {
      q = q2;
    } else if (quizNum === 3) {
      q = q3;
    }
		qSet = questionSet[quizNum][quizIndex];
		quizLength = qSet.length;
		q = qArr[quizNum];
		aSet = answerSet;
	}

// function buttonEvents(quizNum) {
//   var startBtn = 
// 	}, false);
// }

function displayNavigationButtons(q) {

		var visibleClass = 'btn-container__button--is-visible';
		
		if (q === 0) {
			startBtn.classList.remove(visibleClass);
			backBtn.classList.remove(visibleClass);
			retryBtn.classList.remove(visibleClass);
			nextBtn.classList.add(visibleClass);
		} else if (q === 1) {
			backBtn.classList.add(visibleClass);
		} else if (q > quizLength) {
			backBtn.classList.remove(visibleClass);
			nextBtn.classList.remove(visibleClass);
			retryBtn.classList.add(visibleClass);
		}
	}

function startQuiz() {
  displayNavigationButtons(q);
  insertCurrentQuestion(quizNum, q, qSet, aSet);
}

function nextQuestion() {
  if (radioChecked()) {
    trackAnswers(quizNum, q, qSet, aSet);
    if (q !== quizLength) {
      q++;
      displayNavigationButtons(q);
      insertCurrentQuestion(quizNum, q, qSet, aSet);
    } else {
      completeQuiz();
    }
  } else {
    validation(quizNum);
  }
}

function prevQuestion() {
    var validationMsg = document.getElementById(`msg-${quizNum}`);
    if(document.body.contains(validationMsg)) {
        removeValidationMsg(quizNum);
    }
    q--;
    displayNavigationButtons(q, quizNum);
    insertCurrentQuestion(quizNum, q, qSet, aSet);
}

function completeQuiz() {
  q++;
  displayNavigationButtons(q);
  finalScore(quizNum, answerSet);
}

function reloadQuiz() {
	answerSet = [];
	q = 0;
	displayNavigationButtons(q);
	insertCurrentQuestion(quizNum, q, qSet, aSet);
}

function storeQuestionCount(quizNum, q) {
	qArr[quizNum] = q;
}

// Inserts the current question, determined by counter q
function insertCurrentQuestion(quizNum, q, qSet, aSet) {
  var qText = document.getElementById(`questions-${quizNum}`),
    context = {
      qNum: q + 1,
      quizLength: qSet.length,
      question: qSet[q].question,
			quizNum: quizNum,
      choices: qSet[q].choices
    },
    displayChoices = choicesTemplate(context);

  qText.innerHTML = displayChoices;

    // If the user goes back a question, checks the radio they previously selected
  if ((aSet !== undefined) && (aSet[q] !== undefined)) {
    document.querySelector(`input[value="${aSet[q].answer}"]`).checked = true;
  }
}

// Adds selected answer to answerTracker array for scoring
function trackAnswers(quizNum, q, qSet, aSet) {
  var currentAnswer = {},
    selectedAnswer = document.querySelector('[name="choices"]:checked').value,
    currentChoice = qSet[q].choices[selectedAnswer],
    correctAnswer = (qSet[q].correctAnswer).toString(),
    qNum = q + 1;

  currentAnswer.answer = selectedAnswer;
  currentAnswer.choice = currentChoice;

  if (selectedAnswer === correctAnswer) {
    currentAnswer.correct = true;
  } else {
    currentAnswer.correct = false;
  }
  currentAnswer.questionNumber = qNum;
  aSet.push(currentAnswer);
  console.log(aSet);

}

// Calculates and displays final score with chosen answers
function finalScore (quizNum, aSet) {
  var scoreText = document.getElementById(`questions-${quizNum}`),
    scoreCounter = 0,
    context,
    displayScore;

  for (var i = 0; i < aSet.length; i++) {
    if (aSet[i].correct) {
      scoreCounter += 1;
    }
  }

  context = {
    numberCorrect: scoreCounter,
    quizLength: aSet.length,
    answers: aSet
  };
  displayScore = scoreTemplate(context);
  scoreText.innerHTML = displayScore;
}

