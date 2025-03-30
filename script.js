let questions = [];
let currentQuestionIndex = 0;
let score = 0;

document.addEventListener("DOMContentLoaded", () => {
  loadQuestions();
});

async function loadQuestions() {
  const response = await fetch('document.json');
  questions = await response.json();
  displayQuestion();
}

function displayQuestion() {
  if (currentQuestionIndex >= questions.length) {
    document.getElementById('quiz-container').innerHTML = `<h2>Quiz terminé ! Votre score : ${score}/${questions.length}</h2>`;
    return;
  }

  const questionData = questions[currentQuestionIndex];
  document.getElementById('question-text').innerText = questionData.question;
  const answersContainer = document.getElementById('answers');
  answersContainer.innerHTML = '';

  questionData.reponses.forEach((answer, index) => {
    const button = document.createElement('button');
    button.innerText = answer;
    button.onclick = () => selectAnswer(index + 1, questionData.solution);
    answersContainer.appendChild(button);
  });

  document.getElementById('progress').innerText = `Question ${currentQuestionIndex + 1} sur ${questions.length}`;
}

function selectAnswer(selected, correct) {
  const questionData = questions[currentQuestionIndex];
  const isCorrect = selected == correct;

  if (isCorrect) {
    score++;
  } else {
    alert("Mauvaise réponse !");
  }

  updateScoreTable(questionData.question, selected, isCorrect);
  currentQuestionIndex++;
  displayQuestion();
}

function updateScoreTable(question, selected, correct) {
  const scoreTable = document.getElementById('score-table').getElementsByTagName('tbody')[0];
  const newRow = scoreTable.insertRow();

  const questionCell = newRow.insertCell(0);
  const answerCell = newRow.insertCell(1);
  const correctCell = newRow.insertCell(2);

  questionCell.innerText = question;
  answerCell.innerText = selected;
  correctCell.innerText = correct ? "Oui" : "Non";
}