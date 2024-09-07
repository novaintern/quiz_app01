const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors()); // Add this line

// ...rest of your code

// Quiz data
const quizzes = {
  cs: [
    {
      question: "What does CPU stand for?",
      options: ["Central Processing Unit", "Control Processing Unit", "Computer Personal Unit", "Central Process Unit"],
      answer: "Central Processing Unit"
    },
    {
      question: "Which language is used for web apps?",
      options: ["PHP", "Python", "JavaScript", "All"],
      answer: "All"
    },
    {
      question: "Which gates are known as universal gates?",
      options: ["AND", "OR", "NAND", "All"],
      answer: "NAND"
    }
  ],
  webdev: [
    {
      question: "Which tag is used for creating a hyperlink?",
      options: ["<a>", "<link>", "<href>", "<url>"],
      answer: "<a>"
    },
    {
      question: "Which CSS property is used to change the background color?",
      options: ["color", "background-color", "bgcolor", "background"],
      answer: "background-color"
    }
  ],
  dsa: [
    {
      question: "What is the time complexity of binary search?",
      options: ["O(n)", "O(log n)", "O(n^2)", "O(1)"],
      answer: "O(log n)"
    },
    {
      question: "Which data structure uses FIFO?",
      options: ["Stack", "Queue", "Tree", "Graph"],
      answer: "Queue"
    }
  ]
};

// Serve static files (if needed)
app.use(express.static('public'));

// Endpoint to get a quiz by type
app.get('/api/quiz/:type', (req, res) => {
  const quizType = req.params.type;
  const quiz = quizzes[quizType];
  if (quiz) {
    res.json(quiz);
  } else {
    res.status(404).send('Quiz type not found');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
