import { questionSet as questionSet0 } from './data/got';
import { questionSet as questionSet1 } from './data/buffy';
import { questionSet as questionSet2 } from './data/parks';
import { questionSet as questionSet3 } from './data/twinpeaks';
import { quizzes } from './data/quizzes';
import { showButton, hideButton } from './modules/displayButtons';
import { radioChecked } from './modules/radioChecked';
import { validation, removeValidationMsg } from './modules/validation';
import { finalScore } from './modules/finalScore';
import { counter } from './modules/counter';

var choicesTemplate = require('./templates/answerchoices.hbs'),
  quizTemplate = require('./templates/startquiz.hbs'),
  allQuestionSets = [questionSet0, questionSet1, questionSet2, questionSet3],
  questionSet = allQuestionSets[0],
  questionCounter = counter(),
  answer = quizAnswers();

function quizSetup() {
  var quizLinks = document.getElementsByTagName('a'),
    quizText = document.querySelector('.main-section__content'),
    backgroundImage = document.getElementById('quiz-0__image');

  // Adds click and touch event listeners to each quiz link in the menu
  for (var i = 0; i < quizLinks.length; i++) {
    quizLinks[i].addEventListener('click', initiateQuiz, false);
    quizLinks[i].addEventListener('touchend', initiateQuiz, false);
  }

  function removeActiveLinks(quizLinks) {
    for (var i = 0; i < quizLinks.length; i++) {
      quizLinks[i].classList.remove('active');
    }
  }

  function addActiveLink(target) {
    target.classList.add('active');
  }

  // Initializes the variables for the selected quiz
  function initiateQuiz() {
    var target = this,
      targetId = target.id,
      quizNum = targetId.charAt(targetId.length - 1),
      context,
      displayQuizText,
      start = document.getElementById('start'),
      back = document.getElementById('back'),
      next = document.getElementById('next'),
      retry = document.getElementById('retry');

    backgroundImage.id = `quiz-${quizNum}__image`;
    questionSet = allQuestionSets[quizNum];
    answer = quizAnswers();
    questionCounter = counter();
    context = {
      name: quizzes[quizNum].name,
      quote: quizzes[quizNum].quote,
      quoteSource: quizzes[quizNum].quoteSource
    };
    displayQuizText = quizTemplate(context);
    quizText.innerHTML = displayQuizText;

    removeActiveLinks(quizLinks);
    addActiveLink(target);
    hideButton(retry);
    hideButton(back);
    hideButton(next);
    showButton(start);
  }
}
quizSetup();

function operateQuiz() {
  var start = document.getElementById('start'),
    back = document.getElementById('back'),
    next = document.getElementById('next'),
    retry = document.getElementById('retry');

  start.addEventListener('click', startQuiz, false);
  back.addEventListener('click', prevQuestion, false);
  next.addEventListener('click', nextQuestion, false);
  retry.addEventListener('click', retryQuiz, false);

  // Inserts the current question, determined by value of questionCounter
  function insertQuestion() {
    var q = questionCounter.value(),
      questionText = document.querySelector('.questions'),
      context = {
        qNum: q + 1,
        quizLength: questionSet.length,
        question: questionSet[q].question,
        choices: questionSet[q].choices
      },
      displayChoices = choicesTemplate(context);

    questionText.innerHTML = displayChoices;
  }

  function startQuiz() {
    showButton(next);
    hideButton(start);
    insertQuestion();
  }

  function prevQuestion() {
    var q = questionCounter.value();
    // Hide the Back button when going back to first question
    if (q === 1) {
      hideButton(back);
    }
    removeValidationMsg();
    questionCounter.decrement();
    insertQuestion();
    answer.retrieve();
  }

  function nextQuestion() {
    var q = questionCounter.value(),
      quizLength = questionSet.length;
    if (radioChecked()) {
      answer.store();
      if (q < (quizLength - 1)) {
        // Show the Back button after the first question
        if (q === 0) {
          showButton(back);
        }
        questionCounter.increment();
        insertQuestion();
        answer.retrieve();
      } else {
        // After the last question, hide the Back and Next buttons, show the Retry button and score
        hideButton(back);
        hideButton(next);
        showButton(retry);
        finalScore(answer, questionSet);
      }
    } else {
      // If no answer was selected when Next button was clicked, show validation message
      validation();
    }
  }

  function retryQuiz() {
    // Reset answers
    answer = quizAnswers();
    hideButton(retry);
    showButton(next);
    // Reset counter
    questionCounter = counter();
    insertQuestion();
  }
}
operateQuiz();

function quizAnswers() {
  var answers = [];

  function store() {
    var q = questionCounter.value(),
      selectedAnswer = document.querySelector('[name="choices"]:checked').value;

    answers[q] = selectedAnswer;
  }

  function retrieve() {
    var q = questionCounter.value();

    if (answers[q] !== undefined) {
      var selectedAnswer = answers[q],
        choices = document.querySelectorAll('[name="choices"]');

      choices[selectedAnswer].checked = true;
    }
  }

  function value() {
    return answers;
  }

  return { store, retrieve, value }
}
