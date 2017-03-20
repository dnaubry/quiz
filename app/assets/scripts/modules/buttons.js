var startBtn = document.querySelector('.start'),
  backBtn = document.querySelector('.back'),
  nextBtn = document.querySelector('.next'),
  retryBtn = document.querySelector('.retry'),
  visibleClass = 'btn-container__button--is-visible';

function buttonEvents(startQuiz, prevQuestion, nextQuestion, reloadQuiz) {
  startBtn.addEventListener('click', startQuiz, false);
  backBtn.addEventListener('click', prevQuestion, false);
  nextBtn.addEventListener('click', nextQuestion, false);
  retryBtn.addEventListener('click', reloadQuiz, false);
}

function displayButtons(q, quizLength) {
  
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

function resetButtonsToStart() {
   backBtn.classList.remove(visibleClass);
   retryBtn.classList.remove(visibleClass);
   nextBtn.classList.remove(visibleClass);
   startBtn.classList.add(visibleClass);
}

export { buttonEvents, displayButtons, resetButtonsToStart };