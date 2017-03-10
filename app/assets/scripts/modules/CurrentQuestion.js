import choicesTemplate from '../templates/answerchoices.hbs';
import answers from 'RecordAnswers';

function CurrentQuestion() {
  var allQuestions = [
    {
      question: 'What are the house words of House Stark?',
      choices: ['The North Remembers',
        'When the snows fall and the white winds blow, the lone wolf dies but the pack survives',
        'Winter is Coming',
        'The winters are hard, but the Starks will endure'],
      correctAnswer: 2
    },
    {
      question: 'What are the house words of House Lannister?',
      choices: ['Hear me roar!',
        'A Lannister always pays his debts',
        'Teach them what it means to put a lion in a cage',
        'When you play a game of thrones, you win or you die'],
      correctAnswer: 0
    },
    {
      question: 'What are the house words of House Targaryen?',
      choices: ['Fire cannot kill a dragon',
        'Blood of the Dragon',
        'All men must die, but we are not men',
        'Fire and Blood'],
      correctAnswer: 3
    }
    ],
    // Question counter
    q = 0,
    // Holds the element where the question will be inserted into
    qText = document.querySelector('.questions'),
    quizLength = allQuestions.length,
    // Handlebars choicesTemplate context definitions
    context = {
      qNum: q + 1,
      quizLength: quizLength,
      question: allQuestions[q].question,
      choices: allQuestions[q].choices
    },
    displayChoices = choicesTemplate(context);
  // Inserts Handlebars template containing question and choices
  function insertQuestion() {
    qText.innerHTML = displayChoices;
    // If the user goes back a question, checks the radio they previously selected
    if (answers[q] !== undefined) {
      document.querySelector(`input[value="${answers[q].answer}"]`).checked = true;
    }
  }

  function qIncrease(q) {
    return q + 1;
  }

  function qDecrease(q) {
    return q - 1;
  }

}

export { CurrentQuestion, allQuestions, q, qCount, quizLength, insertQuestion, qIncrease, qDecrease };
