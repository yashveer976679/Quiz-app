const questions = [
  {
    question: "Who won the ICC Cricket World Cup 2019?",
    options: ["India", "Australia", "England", "New Zealand"],
    answer: "England"
  },
  {
    question: "Who has scored the most international runs in cricket?",
    options: ["Virat Kohli", "Sachin Tendulkar", "Ricky Ponting", "MS Dhoni"],
    answer: "Sachin Tendulkar"
  },
  {
    question: "Which Indian bowler took 10 wickets in a single Test inning?",
    options: ["Anil Kumble", "Ashwin", "Bumrah", "Zaheer Khan"],
    answer: "Anil Kumble"
  },
  {
    question: "How many players are there in a cricket team?",
    options: ["9", "10", "11", "12"],
    answer: "11"
  },
  {
    question: "Which country hosts the IPL tournament?",
    options: ["England", "India", "Australia", "South Africa"],
    answer: "India"
  }
];

let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft = 15;

function loadQuestion() {
  resetTimer();

  const q = questions[currentQuestion];
  document.getElementById("question").textContent = q.question;

  const ul = document.getElementById("answer-options");
  ul.innerHTML = "";
  q.options.forEach(option => {
    const li = document.createElement("li");
    li.innerHTML = `<input type="radio" name="option" value="${option}"> ${option}`;
    ul.appendChild(li);
  });

  document.getElementById("feedback").textContent = "";
  document.getElementById("score").textContent = "";
  startTimer();
}

function submitAnswer() {
  stopTimer();
  const selected = document.querySelector('input[name="option"]:checked');
  const correct = questions[currentQuestion].answer;

  if (!selected) {
    document.getElementById("feedback").textContent = `Time's up! ❌ Correct answer is ${correct}.`;
  } else {
    const answer = selected.value;
    if (answer === correct) {
      document.getElementById("feedback").textContent = "Correct! ✅";
      score++;
    } else {
      document.getElementById("feedback").textContent = `Wrong ❌. Correct answer is ${correct}.`;
    }
  }

  currentQuestion++;
  setTimeout(() => {
    if (currentQuestion < questions.length) {
      loadQuestion();
    } else {
      document.getElementById("question").textContent = "Quiz Completed!";
      document.getElementById("answer-options").innerHTML = "";
      document.getElementById("score").textContent = `Your Score: ${score}/${questions.length}`;
      document.getElementById("timer").textContent = "";
      document.querySelector("button").style.display = "none";
    }
  }, 2000);
}

function startTimer() {
  timeLeft = 15;
  document.getElementById("timer").textContent = `Time Left: ${timeLeft}s`;

  timer = setInterval(() => {
    timeLeft--;
    document.getElementById("timer").textContent = `Time Left: ${timeLeft}s`;

    if (timeLeft === 0) {
      submitAnswer(); // auto-submit on timeout
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(timer);
}

function resetTimer() {
  stopTimer();
  timeLeft = 15;
  document.getElementById("timer").textContent = `Time Left: ${timeLeft}s`;
}

loadQuestion();
