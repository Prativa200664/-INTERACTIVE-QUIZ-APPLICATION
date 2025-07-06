const quizData = [
  {
    question: "What does HTML stand for?",
    answers: [
      { text: "Hyper Text Markup Language", correct: true },
      { text: "Home Tool Markup Language", correct: false },
      { text: "Hyperlinks and Text Markup Language", correct: false },
      { text: "Hyperlinking Text Management Language", correct: false }
    ]
  },
  {
    question: "Which language is used for styling web pages?",
    answers: [
      { text: "HTML", correct: false },
      { text: "JQuery", correct: false },
      { text: "CSS", correct: true },
      { text: "XML", correct: false }
    ]
  },
  {
    question: "What does JS stand for?",
    answers: [
      { text: "Java Style", correct: false },
      { text: "JavaScript", correct: true },
      { text: "Just Script", correct: false },
      { text: "JQuery Script", correct: false }
    ]
  }
];

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("next");
const scoreEl = document.getElementById("score");

let currentIndex = 0;
let score = 0;

function startQuiz() {
  currentIndex = 0;
  score = 0;
  nextBtn.innerText = "Next";
  showQuestion();
}

function showQuestion() {
  resetOptions();
  let current = quizData[currentIndex];
  questionEl.innerText = current.question;

  current.answers.forEach(answer => {
    const btn = document.createElement("button");
    btn.innerText = answer.text;
    btn.classList.add("btn");
    btn.addEventListener("click", () => selectAnswer(btn, answer.correct));
    optionsEl.appendChild(btn);
  });
}

function resetOptions() {
  nextBtn.style.display = "none";
  while (optionsEl.firstChild) {
    optionsEl.removeChild(optionsEl.firstChild);
  }
}

function selectAnswer(button, correct) {
  const allButtons = optionsEl.querySelectorAll("button");
  allButtons.forEach(btn => btn.disabled = true);

  if (correct) {
    button.classList.add("correct");
    score++;
    scoreEl.innerText = `Score: ${score}`;
  } else {
    button.classList.add("wrong");
    const correctBtn = [...allButtons].find((btn, i) => quizData[currentIndex].answers[i].correct);
    correctBtn.classList.add("correct");
  }

  nextBtn.style.display = "inline-block";
}

nextBtn.addEventListener("click", () => {
  currentIndex++;
  if (currentIndex < quizData.length) {
    showQuestion();
  } else {
    showFinal();
  }
});

function showFinal() {
  resetOptions();
  questionEl.innerText = `Quiz completed! Your score is ${score}/${quizData.length}.`;
  nextBtn.innerText = "Restart";
  nextBtn.style.display = "inline-block";
  nextBtn.onclick = startQuiz;
}

startQuiz();
