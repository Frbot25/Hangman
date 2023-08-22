const scorePlayer = document.querySelector('.player-score strong');
const wordContainer = document.getElementById('word-container');
const wrongLettersContainer = document.getElementById('wrong-letters');
const buttonsContainer = document.getElementById('buttons-container');
const restartButton = document.getElementById('restart');
const buttonDelete = document.getElementById('delete');
const modal = document.querySelector('.modal');
const modalButton = document.querySelector('.modal button');
const modalInput = document.querySelector('.modal input');
const player = JSON.parse(localStorage.getItem('player'));
const totalWords = document.querySelector('.total-words strong');
const words = [
    "chat", "chien", "maison", "soleil", "arbre", "voiture", "ordinateur", "musique", "plage", "montagne",
    "fleur", "etoile", "velo", "jardin", "pomme", "orange", "livre", "film", "avion", "restaurant",
    "internet", "cafe", "football", "crayon", "feuille", "ecole", "famille", "chanson", "route", "porte"
    , "eclair", "nuage", "souris", "cle", "bateau", "chocolat", "horloge", "piano", "montre",
    "stylo", "telephone", "travail", "amour", "argent", "vacances", "voyage", "ciel", "lune",
    // Ajoutez plus de mots ici...
  ];
let selectedWord = words[Math.floor(Math.random() * words.length)];
let word = [];

let TotalWordsSuccess = player.TotalWordsSuccess || 0;
let guessedLetters = [];
let wrongLetters = [];
let errorLetters = -1;
let score = 0;
let namePlayer = 'player';
let playerName = document.querySelector('.player-name strong');
const hangmanParts = [
    '<circle stroke-width="10" stroke-miterlimit="10" cx="254.404" cy="174.26" r="29.412"/>',
'<line stroke-width="10" stroke-miterlimit="10" x1="254.404" y1="203.672" x2="254.404" y2="314.056"/>',
'<line stroke-width="10" stroke-miterlimit="10" x1="255.339" y1="311.094" x2="185.875" y2="406.468"/>',
'<line stroke-width="10" stroke-miterlimit="10" x1="323.46" y1="406.468" x2="253.996" y2="311.094"/>',
'<line stroke-width="10" stroke-miterlimit="10" x1="254.404" y1="229.409" x2="164.11" y2="256.834"/>',
'<line stroke-width="10" stroke-miterlimit="10" x1="254.404" y1="229.409" x2="344.699" y2="256.834"/>',
'<circle fill="#000000" cx="243.663" cy="169.333" r="3.667"/>',
'<circle fill="#000000" cx="265.663" cy="169.333" r="3.667"/>',
'<path stroke-width="4" stroke-miterlimit="10" d="M245.571,190.082c0-4.879,3.955-8.833,8.833-8.833 c4.879,0,8.833,3.955,8.833,8.833"/>'
];
if(player){
    modal.style.display = 'none';
    score = player.score;
    scorePlayer.textContent = score;
    playerName.textContent = player.name;
    totalWords.textContent = player.TotalWordsSuccess;
}else {
    modal.style.display = 'block';
    score = 0;
    scorePlayer.textContent = score;
    playerName.textContent = 'player';
    totalWords.textContent = 0;
}

if(modal){
modalButton.addEventListener('click', function(e) {
    e.preventDefault();
    console.log(modalInput.value);
    localStorage.setItem('player', JSON.stringify({name: modalInput.value, score: 0, TotalWordsSuccess: 0}));
    if(modalInput.value == ''){
        localStorage.setItem('player', JSON.stringify({name: 'player', score: 0}));
        playerName.textContent = modalInput.value;
    }
    scorePlayer.textContent = score;
    playerName.textContent = modalInput.value;
    modal.style.display = 'none';
});
}
//svg parser from stackoverflow so I can just append new shapes to existing svg
function parseSVG(s) {
	var div= document.createElementNS('http://www.w3.org/1999/xhtml', 'div');
	div.innerHTML= '<svg xmlns="http://www.w3.org/2000/svg">'+s+'</svg>';
	var frag= document.createDocumentFragment();
	while (div.firstChild.firstChild)
		frag.appendChild(div.firstChild.firstChild);
	return frag;
}
// Initialize the game
function initGame() {
    document.getElementById('added-parts').innerHTML='';
    const player = JSON.parse(localStorage.getItem('player'));
    guessedLetters = [];
    word = [];
    errorLetters = -1;
       score = 0;
       if(player){
    scorePlayer.textContent =player.score;
    playerName.textContent = player.name;
    }
    guessedLetters = [];
    wrongLetters = [];
    selectedWord = words[Math.floor(Math.random() * words.length)];
    for (let letter of selectedWord) {
        word.push(letter);
    }
    updateWordContainer();
    wrongLettersContainer.textContent = '';
    restartButton.style.display = 'none';
    renderButtons();
}

// Update the word container with current guesses
function updateWordContainer() {
    wordContainer.innerHTML = selectedWord
    .split('')
    .map(letter => guessedLetters.includes(letter) ? letter : '_')
    .join(' ');
    if(wrongLetters.length == 6){
        restartButton.style.display = 'block';
        restartButton.textContent = 'You Lose! Play Again';
        endGame();
        return;
    }
    if (!wordContainer.innerHTML.includes('_')) {
        console.log(wordContainer.innerHTML);
        TotalWordsSuccess = TotalWordsSuccess + 1;
        localStorage.setItem('player', JSON.stringify({name: playerName.textContent, score: score, TotalWordsSuccess: TotalWordsSuccess}));
        restartButton.style.display = 'block';
        endGame();
        buttonDelete.style.display = 'block';
        restartButton.textContent = 'You Win! Play Again';
    }
}

// Handle letter guess
function handleGuess(event) {
    const guessedLetter = event.target.textContent.toLowerCase();
    
    if (!guessedLetters.includes(guessedLetter)) {
        guessedLetters.push(guessedLetter);
        event.target.disabled = true;
        if (!selectedWord.includes(guessedLetter)) {
            wrongLetters.push(guessedLetter);
            errorLetters++  ;
            const add = document.getElementById('added-parts').appendChild(parseSVG(hangmanParts[errorLetters]));
            wrongLettersContainer.textContent = 'Wrong letters: ' + wrongLetters.join(', ');

            // You can add animations here for wrong guesses
        }
        if (selectedWord.includes(guessedLetter)) {
            score += 10;
            scorePlayer.textContent = score;
           
        }

        updateWordContainer();
    }
}

// Render letter buttons
function renderButtons() {
    buttonsContainer.innerHTML = '';
    for (let letter of 'abcdefghijklmnopqrstuvwxyz') {
        const button = document.createElement('button');
        button.textContent = letter;
        button.className = 'button';
        button.type = 'button';
        button.addEventListener('click', handleGuess);
        button.classList.add('clicked');
        buttonsContainer.appendChild(button);
    }
}
function endGame(){
    const buttons = document.querySelectorAll('.button');
    for (let button of buttons) {
        button.disabled = true;
    };
    wordContainer.innerHTML = selectedWord
}
// Event listeners
restartButton.addEventListener('click', initGame);
buttonDelete.addEventListener('click', {
    handleEvent: function(event) {
        localStorage.clear();
        location.reload();
    }
});


// Initialize the game for the first time
initGame();
