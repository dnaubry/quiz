var scoreTemplate = require('../templates/finalscore.hbs');

// Calculates and displays final score with chosen answers
function finalScore (answers, questionSet) {
  var scoreText = document.querySelector('.questions'),
    scoreCounter = 0,
    context,
    displayScore;

  for (var i = 0; i < answers.length; i++) {
    if (answers[i].correct) {
      scoreCounter += 1;
    }
  }

  context = {
    numberCorrect: scoreCounter,
    quizLength: questionSet.length,
    answers: answers
  };
  displayScore = scoreTemplate(context);
  scoreText.innerHTML = displayScore;
}

export { finalScore };