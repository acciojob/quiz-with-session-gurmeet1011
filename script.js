//your JS code here.

// Do not change code below this line
// This code will just display the questions to the screen
const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
    answer: "Everest",
  },
  {
    question: "What is the largest country by area?",
    choices: ["Russia", "China", "Canada", "United States"],
    answer: "Russia",
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Earth", "Jupiter", "Mars"],
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];

// Display the quiz questions and choices
 const questionsContainer = document.getElementById("questions");
        const submitButton = document.getElementById("submit");
        const scoreDiv = document.getElementById("score");

        // Load progress from session storage
        const savedProgress = JSON.parse(sessionStorage.getItem("progress")) || {};

        // Render questions
        function renderQuestions() {
            questionsContainer.innerHTML = "";
            questions.forEach((q, index) => {
                const questionDiv = document.createElement("div");
                questionDiv.className = "question";

                const questionText = document.createElement("p");
                questionText.textContent = `${index + 1}. ${q.question}`;
                questionDiv.appendChild(questionText);

                const choicesDiv = document.createElement("div");
                choicesDiv.className = "choices";

                q.choices.forEach((choice) => {
                    const label = document.createElement("label");

                    const input = document.createElement("input");
                    input.type = "radio";
                    input.name = `question-${index}`;
                    input.value = choice;
					
                    // Pre-select saved answer
                    if (savedProgress[index] === choice) {
                        input.checked = true;
                    }

                    label.appendChild(input);
                    label.appendChild(document.createTextNode(choice));
                    choicesDiv.appendChild(label);
                });

                questionDiv.appendChild(choicesDiv);
                questionsContainer.appendChild(questionDiv);
            });
        }

        // Save progress to session storage
        function saveProgress() {
            const progress = {};
            questions.forEach((_, index) => {
                const selected = document.querySelector(`input[name="question-${index}"]:checked`);
                if (selected) {
                    progress[index] = selected.value;
                }
            });
            sessionStorage.setItem("progress", JSON.stringify(progress));
        }
// Calculate score and store in local storage
        function calculateScore() {
            let score = 0;
            const progress = JSON.parse(sessionStorage.getItem("progress")) || {};

            questions.forEach((q, index) => {
                if (progress[index] === q.answer) {
                    score++;
                }
            });

            localStorage.setItem("score", score);
            return score;
        }

        // Event listener for Submit button
        submitButton.addEventListener("click", () => {
            saveProgress();
            const score = calculateScore();
            scoreDiv.textContent = `Your score is ${score} out of ${questions.length}.`;
        });

        // Auto-save progress on selection
        questionsContainer.addEventListener("change", saveProgress);

        // Initial render
        renderQuestions();
