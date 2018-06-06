 
    // Grab reference for my DOM elements
    var newGameBtn = document.getElementById('newGameBtn');
    var placeholders = document.getElementById('placeholders');
    var guessedLetters = document.getElementById('guessed-letters');
    var guessesLeft = document.getElementById('guesses-left');
    var wins = document.getElementById('wins');
    var losses = document.getElementById('losses');
    var incorrectLetterBank = document.getElementById('incorrect-letter-bank');

    // Create variables for game (wordBank, wins, losss, picked word, guesses left, 
    // game running, picked word placeholder, guessed letter bank, incorrect letter bank)
    var wordBank = ['ICCULUS', ' TELA', 'WILSON', 'GAMEHENDGE', 'LIZARDS', 'FORBIN', 'STASH', 'TWEEZER', 'MEATSTICK', 'BATHTUB GIN', ];
    wins.innerHTML = 0;
    losses.innerHTML = 0;
    guessesLeft.innerHTML = 8;
    var gameRunning = false;
    var pickedWord = '';
    var pickedWordPlaceholderArr = [];
    var guessedLetterBank = [];
    var incorrectLetterBank = [];
    
    // newGame function to reset all stats, pick new word and create placeholders
    function newGame() {
        // Reset all game info
        gameRunning = true;
        guessesLeft = 10;
        guessedLetterBank = [];
        incorrectLetterBank = [];
        pickedWordPlaceholderArr = [];
        
        // Pick a new word
        pickedWord = wordBank[Math.floor(Math.random() * wordBank.length)];

        // Create Placeholders of new picked word
        for (var i = 0; i < pickedWord.length; i++) {
            if (pickedWord[i] === ' ') {
                pickedWordPlaceholderArr.push(' ');
            } else {
                pickedWordPlaceholderArr.push('_');
            }
        }

        // Write all new game info to DOM
        guessesLeft.textContent = guessesLeft;
        placeholders.textContent = pickedWordPlaceholderArr.join('');
        guessedLetters.textContent = incorrectLetterBank;

    }
    // letterGuess function, takes in the letter you pressed and sees if it's in the selected word
    function letterGuess(letter) {
        console.log(letter);

        if (gameRunning === true && guessedLetterBank.indexOf(letter) === -1) {
            // Run game logic
            guessedLetterBank.push(letter);

            // Check if guessed letter is in my picked word
            for (var i = 0; i < pickedWord.length; i++) {
                if (pickedWord[i].toLowerCase() === letter.toLowerCase()) {
                    // If a match, swaps out that character in the placeholder with correct letter
                    pickedWordPlaceholderArr[i] = pickedWord[i];
                }
            }

            placeholders.textContent = pickedWordPlaceholderArr.join('');
            checkIncorrect(letter);
        }
        else {
            if (!gameRunning) {
                alert("Game isn't running, click New Game to begin!");
            } else {
                alert("You've already guessed this letter, guess another!");
            }
        }
    }

    // checkIncorrectletter
    function checkIncorrect(letter) {
        console.log(letter);

        // Check to see if letter is an incorrect guess
        if (pickedWordPlaceholderArr.indexOf(letter.toLowerCase()) === -1 &&
        pickedWordPlaceholderArr.indexOf(letter.toUpperCase()) === -1) {
            // Drecrment guesses
           guessesLeft--;
           // Add incorrect letter to incorrectLetterBank
           incorrectLetterBank.push(letter.toUpperCase());
           // Write new bank of incorrect letters guessed to DOM
           guessedLetters.textContent = incorrectLetterBank.join(' ');
           // Write new amount of letter guesses to DOm
           guessesLeft.textContent = guessesLeft;
        }
        checkLoss();
    }

// checkLoss
function checkLoss() {
    if (guessesLeft === 0) {
     losses++;
     gameRunning = false;
     losses.textContent = losses;
   }
  checkWin();
}

// checkWin
function checkWin() {
 if (pickedWord.toLowerCase() === pickedWordPlaceholderArr.join('').toLowerCase())
    {
     wins++;
     gameRunning = false;
     wins.textContent = wins;
    }
} 
// Add event listener for new game button
 newGameBtn.addEventListener('click', newGame);

// Add onkeyup event to trigger letterGuess
 document.onkeyup = function(event) {
    if (event.keyCode >= 65 && event.keyCode <= 90) {
     letterGuess(event.key);
    }
}
