import { allQuestions. q } from 'CurrentQuestion';

function RecordAnswers() {
  var currentAnswer = {},
    selectedAnswer = document.querySelector('[name="choices"]:checked').value,
    currentChoice = allQuestions[q].choices[selectedAnswer],
    correctAnswer = (allQuestions[q].correctAnswer).toString(),
    qNum = q + 1;
  currentAnswer.answer = selectedAnswer;
  currentAnswer.choice = currentChoice;
  if (selectedAnswer === correctAnswer) {
    currentAnswer.correct = true;
  } else {
    currentAnswer.correct = false;
  }
  currentAnswer.questionNumber = qNum;

  function storeAnswer() {
    answers[q] = currentAnswer;
  }

  function radioChecked() {
    var radios = document.getElementsByName('choices');
    for (var i = 0; i < radios.length; i++) {
      if (radios[i].checked) {
        return true;
      }
    }
    return false;
  }

}

export { RecordAnswers, storeAnswer, radioChecked };
