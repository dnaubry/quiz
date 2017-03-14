import { questionSet as questionSet1 } from './data/got.js';
import { questionSet as questionSet2 } from './data/buffy.js';
import radioChecked from './modules/radioChecked';
import { validation, removeValidationMsg } from './modules/validation';
var choicesTemplate = require('./templates/answerchoices.hbs');
var scoreTemplate = require('./templates/finalscore.hbs');

var questionSet = questionSet1,
	quizLength = questionSet.length - 1,
	answerSet1 = [], answerSet2 = [], answerSet3 = [], answerSet4 = [],
  answerSet = answerSet1,
	setNum = '1',
	q = 0,
	tabs = document.querySelector('.tabbed-panel'),
	modal = document.getElementById('modal');

tabs.addEventListener('change', function(e) {
	var target = e.target;
	openModal();
	
	var yesBtn = document.getElementById('yes'),
		noBtn = document.getElementById('no');

	yesBtn.addEventListener('click', function(e) {
		switchQuiz(target);
	}, false);
		
	noBtn.addEventListener('click', function(e) {
		returnToQuiz(target);
	}, false);

	function switchQuiz(target) {
		closeModal();
		if (target.id === 'tabbed1') {
				document.getElementById('tabbed1').checked;
				questionSet = questionSet1;
				quizLength = questionSet.length - 1;
				answerSet = answerSet1;
				q = answerSet.length;
				setNum = '1';
				buttonEvents(setNum);
			} else if (target.id === 'tabbed2') {
				document.getElementById('tabbed2').checked;
				questionSet = questionSet2;
				quizLength = questionSet.length - 1;
				answerSet = answerSet2;
				q = answerSet.length;
				setNum = '2';
				buttonEvents(setNum);
		}
	}

	function returnToQuiz(target) {
		closeModal();
		target.id.checked;
	}
});

buttonEvents(setNum); 

function openModal() {
	modal.classList.add('modal--is-visible');
}

function closeModal() {
	modal.classList.remove('modal--is-visible');
}

function buttonEvents(setNum) {

	var buttonSet = document.getElementById(`buttonSet${setNum}`);
	buttonSet.addEventListener('click', function(e) {
			var targetId = e.target.id;
			if (targetId.includes('startBtn')) {
				startQuiz();
			} else if (targetId.includes('nextBtn')) {
				nextQuestion();
			} else if (targetId.includes('backBtn')) {
				prevQuestion();
			} else if (targetId.includes('retryBtn')) {
				reloadQuiz();
			}
	});
}

function displayNavigationButtons(q, setNum) {
		var visibleClass = 'btn-container__button--is-visible',
			startBtn = document.getElementById(`startBtn${setNum}`),
			backBtn = document.getElementById(`backBtn${setNum}`),
			nextBtn = document.getElementById(`nextBtn${setNum}`),
			retryBtn = document.getElementById(`retryBtn${setNum}`);

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
  displayNavigationButtons(q, setNum);
  insertCurrentQuestion(q, setNum);
}

function nextQuestion() {
  if (radioChecked(setNum)) {
    trackAnswers(q, setNum);
    if (q !== quizLength) {
      q++;
      displayNavigationButtons(q, setNum);
      insertCurrentQuestion(q, setNum);
    } else {
      completeQuiz();
    }
  } else {
    validation(setNum);
  }
}

function prevQuestion() {
    var validationMsg = document.getElementById(`msg${setNum}`);
    if(document.body.contains(validationMsg)) {
        removeValidationMsg(setNum);
    }
    q--;
    displayNavigationButtons(q, setNum);
    insertCurrentQuestion(q, setNum);
}

function completeQuiz() {
  q++;
  displayNavigationButtons(q, setNum);
  finalScore(setNum, answerSet);
}

function reloadQuiz() {
	answerSet = [];
	q = 0;
	displayNavigationButtons(q, setNum);
	insertCurrentQuestion(q, setNum);
}

function displayWarning() {

}

// Inserts the current question, determined by counter q
function insertCurrentQuestion(q, setNum) {
  var qText = document.getElementById(`questions${setNum}`),
    context = {
      qNum: q + 1,
      quizLength: questionSet.length,
      question: questionSet[q].question,
			setNum: setNum,
      choices: questionSet[q].choices
    },
    displayChoices = choicesTemplate(context);


  qText.innerHTML = displayChoices;

    // If the user goes back a question, checks the radio they previously selected
  if (answerSet[q] !== undefined) {
    document.querySelector(`input[value="${answerSet[q].answer}"]`).checked = true;
  }
}

// Adds selected answer to answerTracker array for scoring
function trackAnswers(q, setNum) {
  var currentAnswer = {},
    selectedAnswer = document.querySelector(`[name="choices${setNum}"]:checked`).value,
    currentChoice = questionSet[q].choices[selectedAnswer],
    correctAnswer = (questionSet[q].correctAnswer).toString(),
    qNum = q + 1;

  currentAnswer.answer = selectedAnswer;
  currentAnswer.choice = currentChoice;
  if (selectedAnswer === correctAnswer) {
    currentAnswer.correct = true;
  } else {
    currentAnswer.correct = false;
  }
  currentAnswer.questionNumber = qNum;
  answerSet[q] = currentAnswer;
	console.log(answerSet);
}

// Calculates and displays final score with chosen answers
function finalScore (setNum, answerSet) {
  var scoreText = document.getElementById(`questions${setNum}`),
    scoreCounter = 0,
    context,
    displayScore;

  for (var i = 0; i < answerSet.length; i++) {
    if (answerSet[i].correct) {
      scoreCounter += 1;
    }
  }

  context = {
    numberCorrect: scoreCounter,
    quizLength: answerSet.length,
    answers: answerSet
  };
  displayScore = scoreTemplate(context);
  scoreText.innerHTML = displayScore;
}

