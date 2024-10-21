document.addEventListener("DOMContentLoaded", function () {
  const categoryElement = document.getElementById("category");
  const difficultyElements = document.getElementsByName("difficulty");
  const numberOfQuestionsElement = document.getElementById("numberOfQuestions");
  const startBtn = document.getElementById("startBtn");
  const quizSection = document.getElementById("quiz");
  const settingSection = document.getElementById("setting");
  const finishSection = document.getElementById("finish");
  const alert1 = document.getElementById("alert1");
  const questionElement = document.getElementById("question");
  const rowAnswer = document.getElementById("rowAnswer");
  const alertAnswer = document.getElementById("alert");
  const nextBtn = document.getElementById("next");
  const scoreElement = document.getElementById("score");
  const tryBtn = document.getElementById("tryBtn");
  const currentQuestionElement = document.getElementById("currentQuestion");
  const totalNumberOfQuestionsElement = document.getElementById(
    "totalNumberOfQuestions"
  );

  let currentQuestionIndex = 0;
  let score = 0;
  let questions = [];

  startBtn.addEventListener("click", async function () {
    const user = localStorage.getItem("userData");

    if (!user) {
      window.location.href = "/siginup.html";
      return;
    }

    const category = categoryElement.value;
    const difficulty = Array.from(difficultyElements).find(
      (el) => el.checked
    ).value;
    const numOfQuestions = numberOfQuestionsElement.value;

    if (!numOfQuestions) {
      alert1.style.display = "block";
      return;
    } else {
      alert1.style.display = "none";
    }

    const API = `https://opentdb.com/api.php?amount=${numOfQuestions}&category=${category}&difficulty=${difficulty}`;
    questions = await fetchAPI(API);

    if (questions.length > 0) {
      settingSection.style.display = "none";
      quizSection.style.display = "block";
      totalNumberOfQuestionsElement.textContent = questions.length;
      loadQuestion();
    }
  });


  async function fetchAPI(API) {
    try {
      const response = await fetch(API);
      const data = await response.json();
      return data.results;
    } catch (error) {
      console.error("Error fetching the API: ", error);
      return [];
    }
  }

  function loadQuestion() {
    clearAnswers();
    const question = questions[currentQuestionIndex];
    questionElement.innerHTML = question.question;
    currentQuestionElement.textContent = currentQuestionIndex + 1;

    const answers = [
      ...question.incorrect_answers,
      question.correct_answer,
    ].sort(() => Math.random() - 0.5);
    answers.forEach((answer) => {
      const answerDiv = document.createElement("div");
      answerDiv.classList.add("form-check");
      answerDiv.innerHTML = `
                <input class="form-check-input" type="radio" name="answer" value="${answer}">
                <label class="form-check-label">${answer}</label>
            `;
      rowAnswer.appendChild(answerDiv);
    });
  }

  nextBtn.addEventListener("click", function () {
    const selectedAnswer = document.querySelector(
      'input[name="answer"]:checked'
    );
    if (!selectedAnswer) {
      alertAnswer.style.display = "block";
      return;
    } else {
      alertAnswer.style.display = "none";
    }

    checkAnswer(selectedAnswer.value);
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
      loadQuestion();
    } else {
      endQuiz();
    }
  });

  function checkAnswer(selectedAnswer) {
    const correctAnswer = questions[currentQuestionIndex].correct_answer;
    if (selectedAnswer === correctAnswer) {
      score++;
    }
  }

  function endQuiz() {
    quizSection.style.display = "none";
    finishSection.style.display = "block";
    scoreElement.textContent = `${score} / ${questions.length}`;
  }

  function clearAnswers() {
    rowAnswer.innerHTML = "";
  }

  tryBtn.addEventListener("click", function () {
    score = 0;
    currentQuestionIndex = 0;
    finishSection.style.display = "none";
    settingSection.style.display = "block";
  });
});
