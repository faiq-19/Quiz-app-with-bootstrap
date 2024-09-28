// Mock data for courses and quizzes
const courses = [
    { id: 1, name: 'Math', description: 'Mathematics quizzes.' },
    { id: 2, name: 'Science', description: 'Science quizzes.' },
    { id: 3, name: 'History', description: 'History quizzes.' }
];

const quizzes = {
    1: [
        { question: "What is 2 + 2?", options: ["3", "4", "5", "6"], answer: "4" },
        { question: "What is 5 * 6?", options: ["30", "35", "25", "20"], answer: "30" }
    ],
    2: [
        { question: "What is the chemical symbol for water?", options: ["O2", "H2O", "CO2", "NaCl"], answer: "H2O" },
        { question: "What planet is known as the Red Planet?", options: ["Mars", "Earth", "Jupiter", "Saturn"], answer: "Mars" }
    ],
    3: [
        { question: "Who was the first President of the USA?", options: ["Abraham Lincoln", "George Washington", "John Adams", "Thomas Jefferson"], answer: "George Washington" },
        { question: "What year did World War I begin?", options: ["1914", "1918", "1939", "1945"], answer: "1914" }
    ]
};

// Load courses dynamically
const courseList = document.getElementById('course-list');
courses.forEach(course => {
    const courseCard = `
        <div class="col-md-4 mb-4">
            <div class="card" onclick="startQuiz(${course.id})">
                <div class="card-body">
                    <h5 class="card-title">${course.name}</h5>
                    <p class="card-text">${course.description}</p>
                    <button class="btn btn-primary">Start Quiz</button>
                </div>
            </div>
        </div>
    `;
    courseList.innerHTML += courseCard;
});

// Quiz functionality
let currentQuestionIndex = 0;
let currentQuiz = [];
let userAnswers = [];

function startQuiz(courseId) {
    currentQuiz = quizzes[courseId];
    document.getElementById('quiz-section').style.display = 'block';
    document.getElementById('result-section').style.display = 'none';
    document.getElementById('quiz-title').innerText = courses.find(c => c.id === courseId).name + " Quiz";
    loadQuestion();
}

function loadQuestion() {
    const questionDisplay = document.getElementById('question-display');
    questionDisplay.innerHTML = `
        <h4>${currentQuiz[currentQuestionIndex].question}</h4>
        ${currentQuiz[currentQuestionIndex].options.map((option, i) => `
            <div>
                <input type="radio" name="option" id="option${i}" value="${option}">
                <label for="option${i}">${option}</label>
            </div>
        `).join('')}
    `;
    updateNavigationButtons();
}

function updateNavigationButtons() {
    document.getElementById('prev-btn').style.display = currentQuestionIndex === 0 ? 'none' : 'inline-block';
    document.getElementById('next-btn').style.display = currentQuestionIndex === currentQuiz.length - 1 ? 'none' : 'inline-block';
    document.getElementById('submit-btn').style.display = currentQuestionIndex === currentQuiz.length - 1 ? 'inline-block' : 'none';
}

document.getElementById('next-btn').addEventListener('click', () => {
    saveAnswer();
    currentQuestionIndex++;
    loadQuestion();
});

document.getElementById('prev-btn').addEventListener('click', () => {
    currentQuestionIndex--;
    loadQuestion();
});

document.getElementById('submit-btn').addEventListener('click', () => {
    saveAnswer();
    displayResults();
});

function saveAnswer() {
    const selectedOption = document.querySelector('input[name="option"]:checked');
    if (selectedOption) {
        userAnswers[currentQuestionIndex] = selectedOption.value;
    }
}

function displayResults() {
    let correctCount = 0;
    let resultHTML = '';
    
    currentQuiz.forEach((question, index) => {
        const correct = question.answer === userAnswers[index] ? "Correct" : `Wrong (Correct: ${question.answer})`;
        resultHTML += `
            <div class="mb-3">
                <h5>${question.question}</h5>
                <p>Your Answer: ${userAnswers[index]} - <strong>${correct}</strong></p>
            </div>
        `;
        if (question.answer === userAnswers[index]) {
            correctCount++;
        }
    });
    
    document.getElementById('quiz-section').style.display = 'none';
    document.getElementById('result-section').style.display = 'block';
    document.getElementById('results').innerHTML = `<h3>You scored ${correctCount} out of ${currentQuiz.length}</h3>${resultHTML}`;
}