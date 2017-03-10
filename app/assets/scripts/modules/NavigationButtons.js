import { q, quizLength, insertQuestion, qIncrease, qDecrease } from 'CurrentQuestion';
import { storeAnswer, radioChecked } from 'RecordAnswers';
import { insertValidationMsg } from 'Validation';
import { displayScore } from 'Score';

function NavigationButtons() {
  var visibleClass = 'btn-container__button--is-visible',
    startBtn = document.getElementById('startBtn'),
    nextBtn = document.getElementById('nextBtn'),
    backBtn = document.getElementById('backBtn'),
    retryBtn = document.getElementById('retryBtn');

  startBtn.addEventListener('click', startQuiz, false);
  nextBtn.addEventListener('click', nextQuestion, false);
  backBtn.addEventListener('click', prevQuestion, false);
  retryBtn.addEventListener('click', function(e) {
    window.location.reload();
  }, false);

  function visibleButtons(q) {
    if (q === 0) {
      startBtn.classList.remove(visibleClass);
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
    visibleButtons(q);
    insertQuestion(q);
  }

  function nextQuestion() {
    if (radioChecked()) {
      storeAnswer(q);
      if (q !== quizLength) {
        qIncrease(q);
        visibleButtons(q);
        insertQuestion(q);
      } else {
        completeQuiz();
      }
    } else {
      insertValidationMsg();
    }
  }

  function completeQuiz() {
    qIncrease(q);
    visibleButtons(q);
    displayScore();
  }

  function prevQuestion() {
    qDecrease(q);
    visibleButtons(q);
    insertQuestion(q);
  }
}

export  { NavigationButtons };
