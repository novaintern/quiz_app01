document.addEventListener('DOMContentLoaded', function () {
  const quizSelection = document.getElementById('quiz-selection');
  const quizContainer = document.getElementById('quiz');
  const userNameSection = document.getElementById('user-name');
  const startQuizButton = document.getElementById('start-quiz');
  const nextQuestionButton = document.getElementById('next-question');
  const resultDiv = document.getElementById('result');
  const nameInput = document.getElementById('name');
  const submitNameButton = document.getElementById('submit-name');

  let quiz = [];
  let currentQuestionIndex = 0;
  let userName = '';
  let userAnswers = [];

  startQuizButton.addEventListener('click', function () {
    const quizType = document.getElementById('quiz-type').value;
    fetch(`http://localhost:3000/api/quiz/${quizType}`)
      .then(response => response.json())
      .then(data => {
        quiz = shuffleArray(data); // Shuffle the questions array
        quizSelection.style.display = 'none';
        userNameSection.style.display = 'block';
        userAnswers = new Array(quiz.length).fill(null); // Initialize userAnswers
      })
      .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
      });
  });

  submitNameButton.addEventListener('click', function () {
    userName = nameInput.value.trim();
    if (userName) {
      userNameSection.style.display = 'none';
      quizContainer.style.display = 'block';
      nextQuestionButton.style.display = 'block';
      displayQuestion();
    }
  });

  function displayQuestion() {
    const q = quiz[currentQuestionIndex];
    quizContainer.innerHTML = '';

    if (q) {
      const questionDiv = document.createElement('div');
      questionDiv.className = 'question';

      const questionTitle = document.createElement('h3');
      questionTitle.textContent = `Question ${currentQuestionIndex + 1}: ${q.question}`;
      questionDiv.appendChild(questionTitle);

      const optionsDiv = document.createElement('div');
      optionsDiv.className = 'options';

      q.options.forEach(option => {
        const label = document.createElement('label');
        const input = document.createElement('input');
        input.type = 'radio';
        input.name = `question${currentQuestionIndex}`;
        input.value = option;
        if (userAnswers[currentQuestionIndex] === option) {
          input.checked = true; // Retain selected answer
        }
        label.appendChild(input);
        label.appendChild(document.createTextNode(option));
        optionsDiv.appendChild(label);
      });

      questionDiv.appendChild(optionsDiv);
      quizContainer.appendChild(questionDiv);

      const questionStatus = document.createElement('p');
      questionStatus.id = 'question-status';
      questionStatus.textContent = `Question ${currentQuestionIndex + 1} of ${quiz.length}`;
      quizContainer.appendChild(questionStatus);

      if (currentQuestionIndex === quiz.length - 1) {
        nextQuestionButton.style.display = 'none';
        const submitButton = document.createElement('button');
        submitButton.id = 'submit';
        submitButton.textContent = 'Submit';
        quizContainer.appendChild(submitButton);

        submitButton.addEventListener('click', function () {
          const selectedOption = document.querySelector(`input[name="question${currentQuestionIndex}"]:checked`);
          if (selectedOption) {
            userAnswers[currentQuestionIndex] = selectedOption.value;
            displayResult();
          } else {
            alert('Please select an option before submitting.');
          }
        });
      }
    }
  }

  nextQuestionButton.addEventListener('click', function () {
    const selectedOption = document.querySelector(`input[name="question${currentQuestionIndex}"]:checked`);
    if (selectedOption) {
      userAnswers[currentQuestionIndex] = selectedOption.value;
    }
    currentQuestionIndex++;
    if (currentQuestionIndex < quiz.length) {
      displayQuestion();
    }
  });

  function displayResult() {
    quizContainer.style.display = 'none';
    nextQuestionButton.style.display = 'none';

    let score = 0;
    quiz.forEach((q, index) => {
      if (userAnswers[index] === q.answer) {
        score++;
        
      }
    });

    resultDiv.textContent = `Hello ${userName}, your score is ${score} out of ${quiz.length}`;
    resultDiv.style.display = 'block';
  }

  // Utility function to shuffle an array
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    return array;
  }
});
