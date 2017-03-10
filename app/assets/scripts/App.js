import CurrentQuestion from './modules/CurrentQuestion';
import NavigationButtons from './modules/NavigationButtons';
import RecordAnswers from './modules/RecordAnswers';
import Validation from './modules/Validation';
import Score from './modules/Score';

CurrentQuestion();
NavigationButtons();
RecordAnswers();
Validation();
Score();

// // Array containing the quiz questions
//   allQuestions = [
//     {
//       question: 'What are the house words of House Stark?',
//       choices: ['The North Remembers',
//         'When the snows fall and the white winds blow, the lone wolf dies but the pack survives',
//         'Winter is Coming',
//         'The winters are hard, but the Starks will endure'],
//       correctAnswer: 2
//     },
//     {
//       question: 'What are the house words of House Lannister?',
//       choices: ['Hear me roar!',
//         'A Lannister always pays his debts',
//         'Teach them what it means to put a lion in a cage',
//         'When you play a game of thrones, you win or you die'],
//       correctAnswer: 0
//     },
//     {
//       question: 'What are the house words of House Targaryen?',
//       choices: ['Fire cannot kill a dragon',
//         'Blood of the Dragon',
//         'All men must die, but we are not men',
//         'Fire and Blood'],
//       correctAnswer: 3
//     }
//   ],
//   answers = [],           // Array to store chosen answers
//   q = 0,                  // Counter to keep track of current question
//   quizLength = allQuestions.length - 1,
//   startBtn = document.getElementById('startBtn'),
//   nextBtn = document.getElementById('nextBtn'),
//   backBtn = document.getElementById('backBtn'),
//   retryBtn = document.getElementById('retryBtn');
//
// startBtn.addEventListener('click', startQuiz, false);
// nextBtn.addEventListener('click', nextQuestion, false);
// backBtn.addEventListener('click', prevQuestion, false);
// retryBtn.addEventListener('click', reloadQuiz, false);
//
// function navigationButtons(q) {
//   var visibleClass = 'btn-container__button--is-visible';
//
//   if (q === 0) {
//     startBtn.classList.remove(visibleClass);
//     nextBtn.classList.add(visibleClass);
//   } else if (q === 1) {
//     backBtn.classList.add(visibleClass);
//   } else if (q > quizLength) {
//     backBtn.classList.remove(visibleClass);
//     nextBtn.classList.remove(visibleClass);
//     retryBtn.classList.add(visibleClass);
//   }
// }
//
// function startQuiz() {
//   navigationButtons(q);
//   insertCurrentQuestion(q);
// }
//
// function nextQuestion() {
//   if (radioChecked()) {
//     trackAnswers(q);
//     if (q !== quizLength) {
//       q++;
//       navigationButtons(q);
//       insertCurrentQuestion(q);
//     } else {
//       completeQuiz();
//     }
//   } else {
//     validationMsg();
//   }
// }
//
// function completeQuiz() {
//   q++;
//   navigationButtons(q);
//   finalScore(answers);
// }
//
// function prevQuestion() {
//   q--;
//   navigationButtons(q);
//   insertCurrentQuestion(q);
// }
//
// // Inserts the current question, determined by counter q
// function insertCurrentQuestion(q) {
//   var qText = document.querySelector('.questions'),
//     context = {
//       qNum: q + 1,
//       quizLength: allQuestions.length,
//       question: allQuestions[q].question,
//       choices: allQuestions[q].choices
//     },
//     displayChoices = choicesTemplate(context);
//
//   qText.innerHTML = displayChoices;
//
//     // If the user goes back a question, checks the radio they previously selected
//   if (answers[q] !== undefined) {
//     document.querySelector(`input[value="${answers[q].answer}"]`).checked = true;
//   }
// }
//
// // Checks if the user selected an answer
// function radioChecked() {
//   var radios = document.getElementsByName('choices');
//   for (var i = 0; i < radios.length; i++) {
//     if (radios[i].checked) {
//       return true;
//     }
//   }
//   return false;
// }
//
// // Displays a message if user does not choose an answer
// function validationMsg() {
//   var msgExists = document.getElementById('msg');
//   if (!document.body.contains(msgExists)) {
//     var msgEl = document.createElement('div'),
//       msg = document.createTextNode('Please choose an answer!'),
//       position = document.querySelector('.btn-container'),
//       radios = document.getElementsByName('choices');
//
//     msgEl.id = 'msg';
//     msgEl.classList.add('btn-container__msg');
//     msgEl.appendChild(msg);
//     position.appendChild(msgEl);
//
//     for (var i = 0; i < radios.length; i++) {
//       radios[i].addEventListener('change', removeValidationMsg, false);
//     }
//   }
//
//   function removeValidationMsg() {
//     var removeMsgEl = document.getElementById('msg'),
//       containerEl = removeMsgEl.parentNode;
//     containerEl.removeChild(removeMsgEl);
//   }
// }
//
// // Adds selected answer to answerTracker array for scoring
// function trackAnswers(q) {
//   var currentAnswer = {},
//     selectedAnswer = document.querySelector('[name="choices"]:checked').value,
//     currentChoice = allQuestions[q].choices[selectedAnswer],
//     correctAnswer = (allQuestions[q].correctAnswer).toString(),
//     qNum = q + 1;
//   currentAnswer.answer = selectedAnswer;
//   currentAnswer.choice = currentChoice;
//   if (selectedAnswer === correctAnswer) {
//     currentAnswer.correct = true;
//   } else {
//     currentAnswer.correct = false;
//   }
//   currentAnswer.questionNumber = qNum;
//   answers[q] = currentAnswer;
// }
//
// // Calculates and displays final score with chosen answers
// function finalScore (answers) {
//   var scoreText = document.querySelector('.questions'),
//     scoreCounter = 0,
//     context,
//     displayScore;
//
//   for (var i = 0; i < answers.length; i++) {
//     if (answers[i].correct) {
//       scoreCounter += 1;
//     }
//   }
//   context = {
//     numberCorrect: scoreCounter,
//     quizLength: answers.length,
//     answers: answers
//   };
//   displayScore = scoreTemplate(context);
//   scoreText.innerHTML = displayScore;
// }
//
// function reloadQuiz() {
//   window.location.reload();
// }
