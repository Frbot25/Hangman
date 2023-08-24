const scorePlayer = document.querySelector('.player-score strong');
const wordContainer = document.getElementById('word-container');
const wrongLettersContainer = document.getElementById('wrong-letters');
const buttonsContainer = document.getElementById('buttons-container');
const restartButton = document.getElementById('restart');
const buttonDelete = document.getElementById('delete');
const modal = document.querySelector('.modal');
const modalButton = document.querySelector('.modal button');
const modalInput = document.querySelector('.modal input');
const totalWords = document.querySelector('.total-words strong');
let words = [
    {
    cinema : [
        "Inception",
        "The Shawshank Redemption",
        "Pulp Fiction",
        "The Godfather",
        "Forrest Gump",
        "The Matrix",
        "The Dark Knight",
        "Fight Club",
        "Star Wars",
        "The Lord of the Rings",
        "Jurassic Park",
        "Avatar",
        "Titanic",
        "Gladiator",
        "Inglourious Basterds",
        "The Lion King",
        "Braveheart",
        "Eternal Sunshine of the Spotless Mind",
        "The Avengers",
        "Toy Story",
        "The Silence of the Lambs",
        "The Social Network",
        "The Departed",
        "Interstellar",
        "The Revenant",
        "Casablanca",
        "Blade Runner",
        "The Grand Budapest Hotel",
        "In Bruges",
        "The Big Lebowski",
        "Goodfellas",
        "The Sixth Sense",
        "No Country for Old Men",
        "Mad Max: Fury Road",
        "Schindler's List",
        "The Green Mile",
        "The Shape of Water",
        "La La Land",
        "The Truman Show",
        "The Shining",
        "Gone with the Wind",
        "The Pianist",
        "Drive",
        "Inception",
        "The Godfather",
        "The Departed",
        "A Clockwork Orange",
        "Reservoir Dogs",
        "The Great Gatsby"
    ],
    games : [
      "Super Mario Odyssey",
      "The Legend of Zelda",
      "Grand Theft Auto",
      "Red Dead Redemption",
      "The Witcher",
      "Dark Souls",
      "Minecraft",
      "Overwatch",
      "Fortnite",
      "Call of Duty",
      "Cyberpunk",
      "Assassin's Creed Valhalla",
      "Halo",
      "God of War",
      "Skyrim",
      "Final Fantasy",
      "Destiny",
      "The Last of Us",
      "Rainbow Six Siege",
      "Animal Crossing",
      "Fallout",
      "Super Smash Bros",
      "Resident Evil",
      "Bloodborne",
      "League of Legends",
      "Counter-Strike",
      "World of Warcraft",
      "Mass Effect",
      "Borderlands",
      "Diablo",
      "Metal Gear Solid",
      "Horizon Zero Dawn",
      "Doom",
      "StarCraft",
      "The Sims",
      "Far Cry",
      "Rainbow Six Siege",
      "Gears of War",
      "NieR: Automata",
      "Kingdom Hearts",
      "Dragon Age",
      "The Division",
      "Monster Hunter",
      "No Man's Sky",
      "FIFA",
      "NBA",
      "Rocket League"
    ],
    animals : [
        "Aardvark",
        "Albatross",
        "Alligator",
        "Alpaca",
        "Ant",
        "Anteater",
        "Antelope",
        "Ape",
        "Armadillo",
        "Donkey",
        "Baboon",
        "Badger",
        "Barracuda",
        "Bat",
        "Bear",
        "Beaver",
        "Bee",
        "Bison",
        "Boar",
        "Buffalo",
        "Butterfly",
        "Camel",
        "Capybara",
        "Caribou",
        "Cassowary",
        "Cat",
        "Caterpillar",
        "Cattle",
        "Chamois",
        "Cheetah",
        "Chicken",
        "Chimpanzee",
        "Chinchilla",
        "Chough",
        "Clam",
        "Cobra",
        "Cockroach",
        "Cod",
        "Cormorant",
        "Coyote",
        "Crab",
        "Crane",
        "Crocodile",
        "Crow",
        "Curlew",
        "Deer",
        "Dinosaur",
        "Dog",
        "Dogfish",
        "Dolphin",
        "Dotterel",
        "Dove",
        "Dragonfly",
        "Duck",
        "Dugong",
        "Dunlin",
        "Eagle",
        "Echidna",
    ]
},
];


let selectedWord;
let TotalWordsSuccess = 0;
let word = [];
const confetis = document.getElementById('confetti');
let guessedLetters = [];
let wrongLetters = [];
let errorLetters = -1;
let score = 0;
let namePlayer = 'player';
let playerName = document.querySelector('.player-name strong');
let difficulty = 6;
const trials = document.querySelector('.trials strong');
const menuOpen = document.querySelector('.menu-clic');
function openMenu(){
    document.querySelector('.menu').classList.toggle('clic');
}

// SVG parts for hangman
let hangmanParts = [
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
let difficult = "normal";
const difficultChoice = document.getElementsByName("difficult");
const theme = document.getElementsByName("theme");
const wordsTheme = localStorage.getItem('theme');
const level = localStorage.getItem('difficult');
function checkedTheme(){
    for (var i = 0; i < theme.length; i++){
        if(theme[i].id == wordsTheme){
            theme[i].checked = true;
        }
    }
}
function checkedDifficult(){
    if(level){
        if(level == "easy"){
            difficulty = 10;
        }else if(level == "hard"){
            difficulty = 3;
        }else{
            difficulty = 6;
        }
        for (var i = 0; i < difficultChoice.length; i++){
            if(difficultChoice[i].id == level){
                difficultChoice[i].checked = true;
            }
        }
    }else{
        localStorage.setItem("difficult", "normal");
    }
    for (var i = 0; i < difficultChoice.length; i++){
        if(difficultChoice[i].id == wordsTheme){
            difficultChoice[i].checked = true;
        }
    }
    trials.textContent = difficulty;
}
function choiceTheme(){
    const choiceWords = [];
    if(wordsTheme){
        checkedTheme(wordsTheme)
        if(wordsTheme == "all"){
            const items = words.map(item => {
                for (let i = 0; i < item.animals.length; i++) {
                    choiceWords.push(item.animals[i]);
    
                }
                for (let i = 0; i < item.games.length; i++) {
                    choiceWords.push(item.games[i]);
                }
                for (let i = 0; i < item.cinema.length; i++) {
                    choiceWords.push(item.cinema[i]);
                }
                selectedWord = choiceWords[Math.floor(Math.random() * choiceWords.length)].toLocaleLowerCase();
            });
        }else if(wordsTheme == "games"){
            selectedWord = words[0].games[Math.floor(Math.random() * words[0].games.length)].toLocaleLowerCase();
        }else if(wordsTheme == "cinema"){
            selectedWord = words[0].cinema[Math.floor(Math.random() * words[0].cinema.length)].toLocaleLowerCase();
        }else if(wordsTheme == "animals"){
            selectedWord = words[0].animals[Math.floor(Math.random() * words[0].animals.length)].toLocaleLowerCase();
        }
    }else{
        localStorage.setItem("theme", "all");
    }
};

function selectOnlyThisDufficult(id){
    Array.prototype.forEach.call(difficultChoice,function(el){
      el.checked = false;
    });
    id.checked = true;
    localStorage.setItem("difficult", id.id);
    window?.location?.reload();
}
function selectOnlyThisTheme(id){
    Array.prototype.forEach.call(theme,function(el){
        el.checked = false;
    });
    id.checked = true;
    localStorage.setItem("theme", id.id);
    window?.location?.reload();
  }
  


if(modal){
modalButton.addEventListener('click', function(e) {
    e.preventDefault();
    if(modalInput.value == ''){
        modalInput.value = 'player';
    }
    localStorage.setItem('player', JSON.stringify({name: modalInput.value, score: 0, TotalWordsSuccess: 0}));
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
function checkPlayer(){
    const player = JSON.parse(localStorage.getItem('player'));
    if(player){
        modal.style.display = 'none';
        scorePlayer.textContent =player.score;
        playerName.textContent = player.name;
        totalWords.textContent = player.TotalWordsSuccess;
        score = player.score;
        TotalWordsSuccess = player.TotalWordsSuccess;
    }else{
        modal.style.display = 'block';
    }
}
function deletePlayer(){
    localStorage.clear();
    location.reload();
}
// Initialize the game
function initGame() {
    checkedDifficult();
    choiceTheme();
    checkPlayer();
    document.getElementById('added-parts').innerHTML='';
    const player = JSON.parse(localStorage.getItem('player'));
    guessedLetters = [];
    word = [];
    errorLetters = -1;
    score = 0;
    if(player){
        scorePlayer.textContent =player.score;
        playerName.textContent = player.name;
        totalWords.textContent = player.TotalWordsSuccess;
        score = player.score;
        TotalWordsSuccess = player.TotalWordsSuccess;
    }else{
        modal.style.display = 'block';
    }
    confetis.classList.remove('show');
    guessedLetters = [];
    wrongLetters = [];
    for (let letter of selectedWord) {
        word.push(letter);
    }
    updateWordContainer();
    wrongLettersContainer.textContent = '';
    restartButton.style.display = 'none';
    renderButtons();
}
function updateScore(){
    scorePlayer.textContent = score;
}
function updateTotalWords(){
    totalWords.textContent = TotalWordsSuccess;
}
 
// Update the word container with current guesses
function updateWordContainer() {
    wordContainer.innerHTML =
    selectedWord
    .split('')
    .map(letter => guessedLetters.includes(letter) ? letter : '_' && letter == ' ' ? '&nbsp;' : '_' && letter == '-' ? '-' : '_' && letter == "'" ? "'" : '_')
    .join(' ');
    if (!wordContainer.innerHTML.includes('_')) {
        localStorage.setItem('player', JSON.stringify({name: playerName.textContent, score: score, TotalWordsSuccess: TotalWordsSuccess + 1}));
        restartButton.style.display = 'block';
        endGame();
        buttonDelete.style.display = 'block';
        restartButton.textContent = 'You Win! Play Again';
        if(confetis){
        confetis.classList.add('show');
    }
}
    if(wrongLetters.length == difficulty){
        localStorage.setItem('player', JSON.stringify({name: playerName.textContent, score: score, TotalWordsSuccess: TotalWordsSuccess}));
        restartButton.style.display = 'block';
        restartButton.textContent = 'You Lose! Play Again';
        endGame();
        return;
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
            score = score + 10;
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
