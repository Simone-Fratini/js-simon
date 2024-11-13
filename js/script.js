"use strict";


const timerElement = document.getElementById("countdown");
const numbersListElement = document.getElementById("numbers-list");
const formElement = document.getElementById("answers-form");
const inputs = formElement.querySelectorAll("input");
const confirmButton = document.querySelector(".btn.confirm");
const resetButton = document.querySelector(".btn.reset");
const messageElement = document.getElementById("message");


const numberCount = 5;
const generatedNumbers = [];
let initialCountdown = 5;
let displayNumbers = "";

// Creazione e visualizzazione dei numeri casuali
for (let i = 0; i < numberCount; i++) {
    let randomNumber = generateRandomNumber(1, 50);
    generatedNumbers.push(randomNumber);
    displayNumbers += `<li>${randomNumber}</li>`;
}

numbersListElement.innerHTML = displayNumbers;

// Countdown timer
timerElement.innerHTML = initialCountdown;
const countdownInterval = setInterval(() => {
    initialCountdown--;
    timerElement.innerHTML = initialCountdown;

    if (initialCountdown <= 0) {
        clearInterval(countdownInterval);
        timerElement.innerHTML = "Tempo Scaduto!";
        numbersListElement.classList.add("d-none");
        formElement.classList.remove("d-none");
    }
}, 1000);


formElement.addEventListener("submit", handleFormSubmit);
formElement.addEventListener("reset", resetGame);

// Funzione per generare numeri casuali
function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Gestione del submit del form
function handleFormSubmit(event) {
    event.preventDefault();
    let correctNumbers = [];
    
    inputs.forEach(input => {
        const inputValue = parseInt(input.value);
        if (generatedNumbers.includes(inputValue)) {
            correctNumbers.push(inputValue);
        }
    });

   
    displayResults(correctNumbers);
}


function displayResults(correctNumbers) {
    let guessedNumbers = correctNumbers.join(", ");

    messageElement.innerHTML = `Numeri indovinati: ${guessedNumbers}`;

    confirmButton.classList.add("d-none");
    resetButton.classList.remove("d-none");
}
