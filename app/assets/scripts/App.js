import { questionSet as questionSet0 } from './data/got';
import { questionSet as questionSet1 } from './data/buffy';
import { questionSet as questionSet2 } from './data/parks';
import { questionSet as questionSet3 } from './data/twinpeaks'; 
import { quizzes } from './data/quizzes';
import { buttonEvents, displayButtons, resetButtonsToStart } from './modules/buttons';
import { radioChecked } from './modules/radioChecked';
import { validation, removeValidationMsg } from './modules/validation';
import { finalScore } from './modules/finalScore';
var choicesTemplate = require('./templates/answerchoices.hbs'),
  quizTemplate = require('./templates/startquiz.hbs');

var allQuestionSets = [questionSet0, questionSet1, questionSet2, questionSet3],
  questionSet = allQuestionSets[0],
  quizLength = questionSet.length - 1,
	answers = [],
  q = 0;

displayQuiz();
buttonEvents(startQuiz, prevQuestion, nextQuestion, reloadQuiz);

function startQuiz() {
  displayButtons(q, quizLength);
  insertCurrentQuestion(q);
}

function nextQuestion() {
  if (radioChecked()) {
    storeAnswer(q);
    if (q !== quizLength) {
      q++;
      displayButtons(q, quizLength);
      insertCurrentQuestion(q);
    } else {
      completeQuiz();
    }
  } else {
    validation();
  }
}

function prevQuestion() {
    var validationMsg = document.getElementById('validationMsg');
    if(document.body.contains(validationMsg)) {
        removeValidationMsg();
    }
    q--;
    displayButtons(q, quizLength);
    insertCurrentQuestion(q);
}

function completeQuiz() {
  q++;
  displayButtons(q, quizLength);
  finalScore(answers, questionSet);
}

function reloadQuiz() {
	answers = [];
	q = 0;
	displayButtons(q, quizLength);
	insertCurrentQuestion(q);
}

function displayQuiz() {
    var quizLinks = document.getElementsByTagName('a'),
      quizLinks = Array.from(quizLinks),
      quizText = document.querySelector('.main-section__content'),
      backgroundImage = document.getElementById('quiz-0__image'),
      activeLink = document.querySelector('.active');

      for (var i = 0; i < quizLinks.length; i++) {
        quizLinks[i].addEventListener('click', initiateQuiz, false);
        quizLinks[i].addEventListener('touchend', initiateQuiz, false);
      }

    function initiateQuiz(e) {
        var targetId = e.target.id,
        quizNum,
        context,
        displayQuizText;

        for (var i = 0; i < quizLinks.length; i++) {
          quizLinks[i].classList.remove('active');
        }

        if (targetId === 'quiz-0') {
          quizNum = 0;
        } else if (targetId === 'quiz-1') {
          quizNum = 1;
        } else if (targetId === 'quiz-2') {
          quizNum = 2;
        } else if (targetId === 'quiz-3') {
          quizNum = 3;
        }
        backgroundImage.id = `quiz-${quizNum}__image`;
        quizLinks[quizNum].classList.add('active');
        questionSet = allQuestionSets[quizNum];
        quizLength = questionSet.length - 1;
        answers = [];
        q = 0;
        context = {
            quizName: quizzes[quizNum]
        };
        displayQuizText = quizTemplate(context);
        quizText.innerHTML = displayQuizText;
        resetButtonsToStart();
        e.preventDefault(); 
    }
}

// Inserts the current question, determined by counter q
function insertCurrentQuestion(q) {
  var qText = document.querySelector('.questions'),
    context = {
      qNum: q + 1,
      quizLength: questionSet.length,
      question: questionSet[q].question,
      choices: questionSet[q].choices
    },
    displayChoices = choicesTemplate(context);

  qText.innerHTML = displayChoices;

    // If the user goes back a question, checks the radio they previously selected
  if (answers[q] !== undefined) {
    document.querySelector(`input[value="${answers[q].answer}"]`).checked = true;
  }
}

// Adds selected answer to answers array for scoring
function storeAnswer(q) {
  var currentAnswer = {},
    selectedAnswer = document.querySelector('[name="choices"]:checked').value,
    currentChoice = questionSet[q].choices[selectedAnswer],
    correctAnswer = (questionSet[q].correctAnswer).toString(),
    qNum = q + 1;

  currentAnswer.answer = selectedAnswer;
  currentAnswer.choice = currentChoice;
  currentAnswer.questionNumber = qNum;

  if (selectedAnswer === correctAnswer) {
    currentAnswer.correct = true;
  } else {
    currentAnswer.correct = false;
  }
  answers[q] = currentAnswer;

}
