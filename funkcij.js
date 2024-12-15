const main = document.getElementById("mainpytania");
const startButton = document.getElementById("btn-start");
const nextButton = document.getElementById("btn-next");
const confirmButton = document.getElementById("btn-confirm");
const pytaniaDiv = document.getElementById("pytania");
const wyniki = document.getElementById("wyniki");
const czasomierz = document.getElementById("czasomierz");

let nrPytania = 0; // Start from the first question
let punkty = 0;
let punktyaktual = 0; // Reset points for each question
let timer; // Timer variable
let timeLeft = 180; // Time in seconds (3 minutes)
let answerSelected = false; // Flag to check if an answer was selected

// Define the questions
const pytania = [
    {
        pytania: "Co to jest HTML?",
        odpowiedzi: [
            "Hypertext markup language",
            "Hypertext markup languages",
            "Hypertext markuptt languages"
        ],
        poprawna: 0,
    },
    {
        pytania: "Co to jest CSS?",
        odpowiedzi: [
            "Cascading Style Sheets",
            "Common Style Sheets",
            "Creative Style Sheets"
        ],
        poprawna: 0,
    },
    {
        pytania: "Co to jest JS?",
        odpowiedzi: [
            "JavaScript",
            "JavaSheets",
            "JavaStyle"
        ],
        poprawna: 0,
    },
];

// Start the quiz
const start = () => {
    startButton.classList.add("hidden"); // Hide the start button
    main.classList.remove("hidden"); // Show the main question section
    nextButton.classList.add("hidden"); // Hide the "Next" button initially
    confirmButton.classList.add("hidden"); // Hide the "Confirm" button initially
    resetTimer(); // Reset the timer and start it
    nastempnePytanie(); // Start the first question
};

// Start the countdown timer
const startTimer = () => {
    timer = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(timer); // Stop the timer when time is up
            podsumpunkty(); // Show results when time is up
        } else {
            timeLeft--;
            updateTimerDisplay();
        }
    }, 1000); // Update every second
};

// Reset the timer
const resetTimer = () => {
    timeLeft = 180; // Reset to 3 minutes (180 seconds)
    updateTimerDisplay();
    startTimer(); // Start the countdown
};

// Update the timer display
const updateTimerDisplay = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    czasomierz.textContent = `Czas: ${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
};

// Show the next question
const nastempnePytanie = () => {
    if (nrPytania >= pytania.length) {
        podsumpunkty(); // Show the final score if all questions are answered
        return; // Exit if all questions are answered
    }

    pytaniaDiv.innerHTML = ''; // Clear previous buttons

    const aktyalnePytanie = pytania[nrPytania];
    const questionText = document.createElement("h2");
    questionText.textContent = aktyalnePytanie.pytania;
    pytaniaDiv.appendChild(questionText);

    aktyalnePytanie.odpowiedzi.forEach((odp, index) => {
        const button = document.createElement("button");
        button.textContent = odp;
        button.className = "odp";
        button.addEventListener("click", () => {
            sprOdpowiedz(index); // Check if the answer is correct
        });
        pytaniaDiv.appendChild(button);
    });

    // Show the "Confirm" button after the question
    confirmButton.classList.remove("hidden");
    nextButton.classList.add("hidden"); // Hide Next button until Confirm is clicked
    answerSelected = false; // Reset answer selection
};

// Check the answer
const sprOdpowiedz = (index) => {
    const odpowiedzi = pytania[nrPytania].poprawna;
    if (odpowiedzi === index) {
        punktyaktual = 1;
    } else {
        punktyaktual = 0;
    }
    answerSelected = true; // Answer has been selected
    nextButton.classList.remove("hidden"); // Show Next button after an answer is selected
};

// Confirm the answer and move to the next question
const zatwierdzonyWybur = () => {
    if (punktyaktual === 1) {
        punkty++;
    }
    punktyaktual = 0; // Reset points for the next question

    nrPytania++; // Move to the next question
    nastempnePytanie(); // Load the next question
};

// Show the final score
const podsumpunkty = () => {
    clearInterval(timer); // Stop the timer when the quiz ends
    main.classList.add("hidden"); // Hide the questions section

    wyniki.classList.remove("hidden"); // Show the results section
    wyniki.innerHTML = `Your score is: ${punkty} out of ${pytania.length}`;
};

// Add event listeners to buttons
startButton.addEventListener("click", start);
nextButton.addEventListener("click", () => {
    if (answerSelected) {
        zatwierdzonyWybur(); // Confirm and move to the next question
    }
});
confirmButton.addEventListener("click", zatwierdzonyWybur);

