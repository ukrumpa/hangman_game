const words = [
    'hangman', 'javascript', 'programming','web', 'coding', 'developer',
    'computer', 'algorithm', 'python', 'html', 'css', 'java', 'database', 'software',
    'function', 'variable', 'array', 'object', 'loop', 'conditional', 'network', 'internet',
    'server', 'client', 'router', 'frontend', 'backend', 'framework', 'library', 'security'

];

let chosenWord = words[Math.floor(Math.random() * words.length)];
let guessedLetters = [];
let attempts = 6;

const wordContainer = document.getElementById('wordContainer');
const lettersContainer = document.getElementById('lettersContainer');
const message = document.getElementById('message');
const retryButton = document.getElementById('retryButton');
const hintButton = document.getElementById('hintButton');

function displayWord() {
    wordContainer.innerHTML = chosenWord
        .split('')
        .map(letter => guessedLetters.includes(letter) ? letter : '_')
        .join(' ');
}

function displayLetters() {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    lettersContainer.innerHTML = alphabet
        .split('')
        .map(letter => `<button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect" onclick="guess('${letter}')" ${guessedLetters.includes(letter) ? 'disabled' : ''}>${letter}</button>`)
        .join(' ');
}

function guess(letter) {
    if (!guessedLetters.includes(letter)) {
        guessedLetters.push(letter);
        if (!chosenWord.includes(letter)) {
            attempts--;
        }
        if (attempts === 0) {
            endGame('Game Over! The word was ' + chosenWord);
        } else {
            displayWord();
            displayLetters();
            checkWin();
        }
    }
}

function checkWin() {
    if (chosenWord.split('').every(letter => guessedLetters.includes(letter))) {
        endGame('Congratulations! You won!');
    }
}

function endGame(msg) {
    message.textContent = msg;
    lettersContainer.innerHTML = '';
    retryButton.style.display = 'block';
    hintButton.style.display = 'none';
}

function retry() {
    chosenWord = words[Math.floor(Math.random() * words.length)];
    guessedLetters = [];
    attempts = 6;
    message.textContent = '';
    displayWord();
    displayLetters();
    retryButton.style.display = 'none';
    hintButton.style.display = 'block';
}

function giveHint() {
    const hiddenLetterIndex = chosenWord.split('').findIndex(letter => !guessedLetters.includes(letter));
    if (hiddenLetterIndex !== -1) {
        guessedLetters.push(chosenWord[hiddenLetterIndex]);
        displayWord();
        displayLetters();
    }
}

// Initial setup
displayWord();
displayLetters();
retryButton.style.display = 'none';
hintButton.addEventListener('click', giveHint);
retryButton.addEventListener('click', retry);
