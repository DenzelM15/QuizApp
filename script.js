
// Array of questions, each with text and possible answers
const questions = [
    {
        question: "Which HTML element is used to define the title of a document?",
        answers: [
            { text: "&lt;head&gt;", correct: false },
            { text: "&lt;title&gt;", correct: true },
            { text: "&lt;meta&gt;", correct: false },
            { text: "&lt;header&gt;", correct: false }
        ]
    },
    {
        question: "Which CSS property controls the text color of an element?",
        answers: [
            { text: "font-color", correct: false },
            { text: "color", correct: true },
            { text: "text-color", correct: false },
            { text: "background-color", correct: false }
        ]
    },
    {
        question: "How do you create a comment in CSS?",
        answers: [
            { text: "// this is a comment", correct: false },
            { text: "/* this is a comment */", correct: true },
            { text: "&lt;!-- this is a comment --&gt;", correct: false },
            { text: "# this is a comment", correct: false }
        ]
    },
    {
        question: "Which JavaScript keyword is used to declare a variable?",
        answers: [
            { text: "var", correct: true },
            { text: "int", correct: false },
            { text: "string", correct: false },
            { text: "float", correct: false }
        ]
    }
];

// DOM elements we will manipulate
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0; 
let score = 0;                

// Starts the quiz from the beginning
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQusetion();
}

// Display the current question and answer buttons
function showQusetion() {
	
    resetstate(); 
	
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
	
	// Set question text with numbering
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;
	
	// Create a button for each possible answer
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
		
		// Mark the correct answer with a data attribute
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
		
		// Listen for answer selection
        button.addEventListener("click", selectAnswer);
    });
}


// Clears previous answers and hides the next button
function resetstate() {
    nextButton.style.display = "none";
	
	// Remove all children buttons from answerButtons container
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

// Handles answer selection logic
function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
	
	// Highlight selected answer and update score if correct
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
	
	// Show correct answers and disable all buttons after selection
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
	
	// Show the next button after an answer is chosen
    nextButton.style.display = "block";
}

// Show final score and option to retry
function showScore() {
    resetstate();
    questionElement.innerHTML = `You scrord ${score} out of ${questions.length} !`;
    nextButton.innerHTML = "Another Try";
    nextButton.style.display = "block";
}


// Event listener for next button
nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handelNextButton();
    } else {
        startQuiz();
    }
});


// Moves to next question or shows score at the end
function handelNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQusetion();
    } else {
        showScore();
    }
}

// Start the quiz when the page loads

startQuiz();


