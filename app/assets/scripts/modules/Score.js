import scoreTemplate from '../templates/finalscore.hbs';
import { answers } from 'RecordAnswers';

function Score() {
  var scoreText = document.querySelector('.questions'),
    context = {
      numberCorrect: calculateScore(),
      quizLength: answers.length,
      answers: answers
    },
    displayScore = scoreTemplate(context);

  function calculateScore() {
    var scoreCount = 0;
    for (var i = 0; i < answers.length; i++) {
      if (answers[i].correct) {
        scoreCount += 1;
      }
    }
  }

  function displayScore() {
    scoreText.innerHTML = displayScore;
  }
}

export { Score, displayScore };
