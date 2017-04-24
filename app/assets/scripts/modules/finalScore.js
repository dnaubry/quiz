var scoreTemplate = require('../templates/finalscore.hbs');

// Calculates and displays final score with chosen answers
function finalScore (answer, questionSet) {
  var scoreText,
    allAnswers,
    answerSet,
    scoreCounter,
    correctAnswer,
    selectedAnswer,
    answerText,
    questionNumber,
    isCorrect,
    context,
    displayScore;

  scoreText = document.querySelector('.questions');
  allAnswers = answer.value();
  answerSet = [];
  scoreCounter = 0;

  function Answer(selectedAnswer, answerText, questionNumber, isCorrect) {
    this.answer = selectedAnswer;
    this.answerText = answerText;
    this.questionNumber = questionNumber;
    this.isCorrect = isCorrect;
  }

  for (let i = 0; i < allAnswers.length; i++) {
    correctAnswer = questionSet[i].correctAnswer.toString();
    selectedAnswer = allAnswers[i];
    answerText = questionSet[i].choices[allAnswers[i]];
    questionNumber = i + 1;
    if (selectedAnswer === correctAnswer) {
      scoreCounter += 1;
      isCorrect = true;
    } else {
      isCorrect = false;
    }
    answerSet[i] = new Answer(selectedAnswer, answerText, questionNumber, isCorrect);
  }

  context = {
    numberCorrect: scoreCounter,
    quizLength: questionSet.length,
    answers: answerSet
  };
  displayScore = scoreTemplate(context);
  scoreText.innerHTML = displayScore;
}

export { finalScore };
