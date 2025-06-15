const startButton = document.getElementById("start-btn");
const nexttButton = document.getElementById("next-btn");

const questionContainerElement = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");

let shuffledQuestions, currentQuestionIndex;
let quizScore = 0;

startButton.addEventListener('click', startGame);

nexttButton.addEventListener('click', () => {
  currentQuestionIndex++;
  setnextQuestion();
});

function startGame() {
  startButton.classList.add('hide');
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  quizScore = 0;
  document.getElementById('right-answers').innerText = quizScore;
  questionContainerElement.classList.remove('hide');
  setnextQuestion();
}

function setnextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach((answer) => {
    const button = document.createElement('button');
    button.innerText = answer.text;
    button.classList.add('btn');
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener('click', selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}

function resetState() {
  clearStatusClass(document.body);
  nexttButton.classList.add('hide');
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;

  setStatusClass(document.body, correct);
  Array.from(answerButtonsElement.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct);
  });

  if (correct === "true") {
    quizScore++;
    document.getElementById('right-answers').innerText = quizScore;
  }

  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nexttButton.classList.remove("hide");
  } else {
    startButton.innerText = "Restart";
    startButton.classList.remove("hide");
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct === "true") {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
}

function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
}

// Your questions array
let questions = [
  {
    question: 'Which one of these is a JavaScript framework?',
    answers: [
      { text: 'Java', correct: false },
      { text: 'Python', correct: false },
      { text: 'React', correct: true },
      { text: 'Django', correct: false },
    ]
  },
  {
    question: "What does HTML stand for?",
    answers: [
      { text: "HyperText Markup Language", correct: true },
      { text: "Home Tool Markup Language", correct: false },
      { text: "Hyperlinks and Text Markup Language", correct: false },
      { text: "Hyper Tag Markup Language", correct: false }
    ]
  },
  {
    question: "Which CSS property is used to change text color?",
    answers: [
      { text: "font-color", correct: false },
      { text: "color", correct: true },
      { text: "text-color", correct: false },
      { text: "background-color", correct: false }
    ]
  },
  {
    question: "What is GitHub used for?",
    answers: [
      { text: "Designing web pages", correct: false },
      { text: "Hosting videos", correct: false },
      { text: "Version control and collaboration", correct: true },
      { text: "Making presentations", correct: false }
    ]
  },
  {
    question: "Which of the following is used to declare a constant in JavaScript?",
    answers: [
      { text: "var", correct: false },
      { text: "let", correct: false },
      { text: "const", correct: true },
      { text: "define", correct: false }
    ]
  },
  {
    question: "What does the 🐞 emoji usually represent in programming?",
    answers: [
      { text: "New feature", correct: false },
      { text: "Bug in the code", correct: true },
      { text: "Successful deployment", correct: false },
      { text: "Code review", correct: false }
    ]
  }
];
