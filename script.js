// Game state variables
let secretNumber;
let lowerBound = 0;
let upperBound = 100; // Default value, will be updated based on range selection
let currentPlayerIndex = 0;
let players = [];
let round = 1;
let gameActive = false;
let currentQuestion = null;
let currentCorrectAnswer = null;
let loserFound = false;
let activeQuestionBank = 'built-in';
let customQuestionBank = [];
let canGuess = false; // New flag to track if guessing is allowed

const builtInQuestions = [
    {
        question: "Look at the picture. There is _____ under the door.",
        options: ["an envelope", "a plant", "a sign", "an umbrella"],
        correctAnswer: "an envelope"
    },
    {
        question: "My _____ hurts so much that I cannot even turn my head.",
        options: ["arm", "knee", "neck", "stomach"],
        correctAnswer: "neck"
    },
    {
        question: "Our school basketball team won the national game last night. We are so _____ them.",
        options: ["popular with", "proud of", "sorry for", "worried about"],
        correctAnswer: "proud of"
    },
    {
        question: "Tomorrow is Sam’s last day in the office. Nobody knows why he decided to _____.",
        options: ["hide", "leave", "pack"],
        correctAnswer: "leave"
    },
    {
        question: "It’s not a good idea to go mountain climbing in this bad _____ until the typhoon goes away.",
        options: ["chance", "dream", "habit", "weather"],
        correctAnswer: "weather"
    },
    {
        question: "Chris loves walking with Anna on snowy days, but Anna hates _____ very much.",
        options: ["them", "so", "one", "it"],
        correctAnswer: "it"
    },
    {
        question: "Lora likes to eat bananas that are already a little brown on the outside, and so _____ I.",
        options: ["am", "do", "have", "will"],
        correctAnswer: "do"
    },
    {
        question: "Your refrigerator shouldn’t be making loud noises now, but if it _____ does, just give me a call and I’ll come check it again.",
        options: ["already", "even", "finally", "still"],
        correctAnswer: "still"
    },
    {
        question: "After winning money in the card game, Jay decided to try again. He felt that he might also be _____ a second time.",
        options: ["famous", "interested", "lucky", "ready"],
        correctAnswer: "lucky"
    },
    {
        question: "The knife doesn’t cut very well. It’s not as _____ as before.",
        options: ["bright", "heavy", "quick", "sharp"],
        correctAnswer: "sharp"
    },
    {
        question: "John will stay with his sister until he _____.",
        options: ["will find", "would find", "finds", "found"],
        correctAnswer: "finds"
    },
    {
        question: "Students _____ to go on the school trip should ask their parents first.",
        options: ["who want", "want", "who they want", "what they want"],
        correctAnswer: "who want"
    },
    {
        question: "The temple sits alone in the mountains at a height of 3,000m _____ sea level.",
        options: ["above", "at", "below", "in"],
        correctAnswer: "above"
    },
    {
        question: "Patty spent several days planning to invite Charlie to dinner, _____ she couldn’t say a word when they met.",
        options: ["but", "if", "or", "so"],
        correctAnswer: "but"
    },
    {
        question: "I can’t tell you what I think of the movie because I _____ it. I’ll probably watch it this Saturday.",
        options: ["am not seeing", "don’t see", "haven’t seen", "won’t see"],
        correctAnswer: "haven’t seen"
    },
    {
        question: "The new guy at the help desk answers calls like a _____. There are no ups and downs in his voice and you can’t tell if he is happy or sad.",
        options: ["father", "foreigner", "radio", "robot"],
        correctAnswer: "robot"
    },
    {
        question: "Jasmine planned to spend her summer in the country, but right after she got there, she started to _____ the noise in the city.",
        options: ["enjoy", "mind", "miss", "notice"],
        correctAnswer: "miss"
    },
    {
        question: "“Bad traffic” is perhaps the _____ excuse for being late when your boss knows it only takes you five minutes to walk to work.",
        options: ["easiest", "oldest", "smartest", "worst"],
        correctAnswer: "worst"
    },
    {
        question: "The housework in Mr. and Mrs. Wang’s family _____ between them and their kids. Everyone’s got their own job to do.",
        options: ["is shared", "are shared", "shares", "share"],
        correctAnswer: "is shared"
    },
    {
        question: "I want to find another dentist because _____ pulled out a good tooth last time I went to him.",
        options: ["I", "me", "mine", "myself"],
        correctAnswer: "he"
    },
    {
        question: "Dennis enjoys _____ in public. He is proud of his beautiful voice.",
        options: ["dancing", "drawing", "shopping", "singing"],
        correctAnswer: "singing"
    },
    {
        question: "Mrs. Johnson can’t hear very well. If you need to talk to her, you must _____.",
        options: ["explain", "hurry", "listen", "shout"],
        correctAnswer: "shout"
    },
    {
        question: "People got very excited when they watched Ms. Smith _____ at the party.",
        options: ["danced", "dancing", "has danced", "to dance"],
        correctAnswer: "dancing"
    },
    {
        question: "I tried on these shoes in several different _____, and I thought the white pair looked best on me.",
        options: ["colors", "prices", "shapes", "sizes"],
        correctAnswer: "sizes"
    },
    {
        question: "Rex did not feel the earthquake this morning. He _____ in the park at the time.",
        options: ["jogged", "was jogging", "has jogged", "would jog"],
        correctAnswer: "was jogging"
    },
    {
        question: "Mr. Lee has worked in the same store for ten years; he’s never thought about _____ his job.",
        options: ["changing", "finding", "remembering", "starting"],
        correctAnswer: "changing"
    },
    {
        question: "I didn’t take the bus today because it was _____. All the seats were taken and a lot of students were standing.",
        options: ["dirty", "fast", "full", "wrong"],
        correctAnswer: "full"
    },
    {
        question: "Don’t go away when you’re cooking, _____ the food might burn.",
        options: ["but", "if", "or", "so"],
        correctAnswer: "or"
    },
    {
        question: "Jerry wanted to know _____ he was kicked off the soccer team, but no one gave him a good reason.",
        options: ["where", "when", "whether", "why"],
        correctAnswer: "why"
    },
    {
        question: "Jenny is already forty, doesn’t have a job and often makes trouble for her parents. To them, she is really a(n) _____.",
        options: ["daughter", "example", "gift", "headache"],
        correctAnswer: "headache"
    },
    {
        question: "Ed and Jill _____ camping this weekend, so they have to finish their homework by Friday.",
        options: ["went", "were going", "are going", "have gone"],
        correctAnswer: "are going"
    },
    {
        question: "Doraemon, a blue Japanese robot cat, has hated mice since his ears _____ by a mouse.",
        options: ["bit", "bite", "were bitten", "have bitten"],
        correctAnswer: "were bitten"
    },
    {
        question: "If we play some interesting games in class, there _____ more fun in learning English.",
        options: ["are", "has", "will be", "will have"],
        correctAnswer: "will be"
    },
    {
        question: "The _____ of this shop was so bad; I never got any answer after I emailed them my questions.",
        options: ["item", "business", "price", "service"],
        correctAnswer: "service"
    },
    {
        question: "It’s not easy to see those islands clearly from here on sunny days, and it’s even less _____ to see them on cloudy days.",
        options: ["difficult", "lucky", "possible", "special"],
        correctAnswer: "possible"
    },
    {
        question: "Do you remember the CD I was looking for for months? I _____ found it in a small shop. Look, here it is!",
        options: ["almost", "even", "finally", "still"],
        correctAnswer: "finally"
    },
    {
        question: "Business at Jane’s shop has not been good these days. And the new supermarket across the street only makes things _____.",
        options: ["easier", "worse", "more boring", "more convenient"],
        correctAnswer: "worse"
    },
    {
        question: "Scott wasn’t sure if the young woman before him was _____ pulled him out of a car on fire.",
        options: ["who", "the one", "the one she", "the one who"],
        correctAnswer: "the one who"
    },
    {
        question: "I _____ swimming for several years before I went to this high school. I gave it up because of heavy schoolwork.",
        options: ["have practiced", "am practicing", "practiced", "would practice"],
        correctAnswer: "practiced"
    },
    {
        question: "Frank Kane is so good in the movie that many people _____ he will win the best actor prize.",
        options: ["expect", "forget", "notice", "plan"],
        correctAnswer: "expect"
    },
    {
        question: "The new medicine that just came out on the market _____ thousands of lives.",
        options: ["and saved", "has saved", "saving", "to save"],
        correctAnswer: "has saved"
    },
    {
        question: "What is the plural of 'dog'?",
        options: ["dogs", "doges", "dog's", "dogz"],
        correctAnswer: "dogs"
    },
    {
        question: "What is the opposite of 'cold'?",
        options: ["hot", "warm", "cool", "freezing"],
        correctAnswer: "hot"
    },
    {
        question: "Which of these is a fruit?",
        options: ["apple", "carrot", "potato", "onion"],
        correctAnswer: "apple"
    },
    {
        question: "What color is the sky on a clear day?",
        options: ["blue", "green", "red", "yellow"],
        correctAnswer: "blue"
    },
    {
        question: "How many legs does a spider have?",
        options: ["6", "8", "4", "10"],
        correctAnswer: "8"
    },
    {
        question: "What is the past tense of 'run'?",
        options: ["ran", "running", "runned", "runs"],
        correctAnswer: "ran"
    },
    {
        question: "Which word is a verb?",
        options: ["eat", "table", "blue", "slow"],
        correctAnswer: "eat"
    },
    {
        question: "What is the synonym of 'happy'?",
        options: ["glad", "sad", "angry", "tired"],
        correctAnswer: "glad"
    },
    {
        question: "Which number is 'twenty'?",
        options: ["20", "22", "12", "2"],
        correctAnswer: "20"
    },
    {
        question: "Which of these is a month?",
        options: ["Monday", "January", "Winter", "Morning"],
        correctAnswer: "January"
    },
    {
        question: "What is the opposite of 'up'?",
        options: ["down", "above", "left", "over"],
        correctAnswer: "down"
    },
    {
        question: "Which of these is an animal?",
        options: ["dog", "car", "pen", "chair"],
        correctAnswer: "dog"
    },
    {
        question: "What is 3 + 2?",
        options: ["4", "5", "6", "7"],
        correctAnswer: "5"
    },
    {
        question: "What color are bananas when ripe?",
        options: ["yellow", "green", "brown", "purple"],
        correctAnswer: "yellow"
    },
    {
        question: "Which of these is a day of the week?",
        options: ["Saturday", "June", "Summer", "Night"],
        correctAnswer: "Saturday"
    },
    {
        question: "Which of these is a body part?",
        options: ["hand", "table", "shirt", "window"],
        correctAnswer: "hand"
    },
    {
        question: "What sound does a cat make?",
        options: ["meow", "bark", "chirp", "roar"],
        correctAnswer: "meow"
    },
    {
        question: "How many hours are there in a day?",
        options: ["12", "24", "36", "48"],
        correctAnswer: "24"
    },
    {
        question: "Which word is an adjective?",
        options: ["beautiful", "run", "chair", "quickly"],
        correctAnswer: "beautiful"
    },
    {
        question: "What is the opposite of 'fast'?",
        options: ["slow", "quick", "stop", "soft"],
        correctAnswer: "slow"
    },
    {
        question: "Which of these is a place?",
        options: ["park", "walk", "sleep", "beautiful"],
        correctAnswer: "park"
    },
    {
        question: "Which of these is a job?",
        options: ["teacher", "happy", "blue", "small"],
        correctAnswer: "teacher"
    },
    {
        question: "What is the past tense of 'see'?",
        options: ["saw", "see", "seen", "sees"],
        correctAnswer: "saw"
    },
    {
        question: "Which of these is used for writing?",
        options: ["pen", "shoe", "plate", "lamp"],
        correctAnswer: "pen"
    },
    {
        question: "What is the opposite of 'big'?",
        options: ["small", "tall", "wide", "long"],
        correctAnswer: "small"
    },
    {
        question: "Which of these is a drink?",
        options: ["water", "bread", "apple", "chair"],
        correctAnswer: "water"
    },
    {
        question: "Which of these is a color?",
        options: ["red", "triangle", "fast", "music"],
        correctAnswer: "red"
    },
    {
        question: "What is the plural of 'child'?",
        options: ["children", "childs", "childes", "child"],
        correctAnswer: "children"
    },
    {
        question: "Which of these is an animal that flies?",
        options: ["bird", "dog", "fish", "cat"],
        correctAnswer: "bird"
    },
    {
        question: "Which of these is an emotion?",
        options: ["happy", "jump", "plate", "tall"],
        correctAnswer: "happy"
    }
];

// DOM elements
const gameSetupEl = document.getElementById('game-setup');
const gameAreaEl = document.getElementById('game-area');
const gameOverEl = document.getElementById('game-over');
const numPlayersInput = document.getElementById('num-players');
const numberRangeInput = document.getElementById('number-range'); // New DOM element
const startGameBtn = document.getElementById('start-game');
const questionBankSelect = document.getElementById('question-bank-select');
const customBankContainer = document.getElementById('custom-bank-container');
const customBankTextarea = document.getElementById('custom-bank-textarea');
const saveCustomBankBtn = document.getElementById('save-custom-bank');
const rangeDisplayEl = document.getElementById('range-display');
const currentPlayerEl = document.getElementById('current-player');
const roundNumberEl = document.getElementById('round-number');
const questionTextEl = document.getElementById('question-text');
const answerOptionsEl = document.getElementById('answer-options');
const guessSectionEl = document.getElementById('guess-section');
const guessInputEl = document.getElementById('guess-input');
const submitGuessBtn = document.getElementById('submit-guess');
const messageAreaEl = document.getElementById('message-area');
const playerListEl = document.getElementById('player-list');
const resultMessageEl = document.getElementById('result-message');
const playAgainBtn = document.getElementById('play-again');

// Event listeners
startGameBtn.addEventListener('click', startGame);
submitGuessBtn.addEventListener('click', function(e) {
    // Only process the guess if the player is allowed to guess
    if (canGuess) {
        handleGuess();
    } else {
        e.preventDefault();
        displayMessage('Please answer the question correctly first', 'error');
    }
});
playAgainBtn.addEventListener('click', resetGame);
questionBankSelect.addEventListener('change', handleQuestionBankChange);
saveCustomBankBtn.addEventListener('click', saveCustomQuestionBank);

// Initialize the game
function initializeGame() {
    // Load any saved question bank from local storage
    loadCustomQuestionBank();
    
    // Set initial question bank selection state
    handleQuestionBankChange();
}

function handleQuestionBankChange() {
    activeQuestionBank = questionBankSelect.value;
    
    if (activeQuestionBank === 'custom') {
        customBankContainer.classList.remove('hidden');
    } else {
        customBankContainer.classList.add('hidden');
    }
}

function saveCustomQuestionBank() {
    try {
        const questionBankData = customBankTextarea.value.trim();
        if (!questionBankData) {
            displaySetupMessage('Please enter valid question data', 'error');
            return;
        }
        
        // Parse the JSON data
        const parsedData = JSON.parse(questionBankData);
        
        // Validate the format
        if (!Array.isArray(parsedData) || !parsedData.every(isValidQuestion)) {
            displaySetupMessage('Invalid question format. Please check your JSON data.', 'error');
            return;
        }
        
        // Save to memory and local storage
        customQuestionBank = parsedData;
        localStorage.setItem('customQuestionBank', questionBankData);
        
        displaySetupMessage('Custom question bank saved successfully!', 'success');
    } catch (error) {
        displaySetupMessage('Error saving question bank: ' + error.message, 'error');
    }
}

function isValidQuestion(q) {
    return q && 
           typeof q.question === 'string' && 
           Array.isArray(q.options) && 
           q.options.length >= 2 &&
           typeof q.correctAnswer === 'string' &&
           q.options.includes(q.correctAnswer);
}

function loadCustomQuestionBank() {
    const savedBank = localStorage.getItem('customQuestionBank');
    if (savedBank) {
        try {
            customQuestionBank = JSON.parse(savedBank);
            customBankTextarea.value = savedBank;
        } catch (error) {
            console.error('Error loading saved question bank:', error);
            customQuestionBank = [];
        }
    }
}

function displaySetupMessage(message, type) {
    const setupMessageArea = document.getElementById('setup-message-area');
    setupMessageArea.textContent = message;
    setupMessageArea.className = '';
    setupMessageArea.classList.add(`message-${type}`);
    
    // Clear message after 5 seconds
    setTimeout(() => {
        setupMessageArea.textContent = '';
        setupMessageArea.className = '';
    }, 5000);
}

function startGame() {
    const numPlayers = parseInt(numPlayersInput.value);
    
    if (numPlayers < 2 || numPlayers > 10) {
        alert('Number of players must be between 2 and 10');
        return;
    }
    
    // Check if using custom question bank and it's empty
    if (activeQuestionBank === 'custom' && customQuestionBank.length === 0) {
        displaySetupMessage('Custom question bank is empty. Please add questions or switch to built-in questions.', 'error');
        return;
    }
    
    // Get selected number range
    upperBound = parseInt(numberRangeInput.value);
    
    // Initialize game state
    gameActive = true;
    lowerBound = 0;
    currentPlayerIndex = 0;
    round = 1;
    loserFound = false;
    canGuess = false; // Reset the flag at the start of the game
    
    // Generate secret number (1 to upperBound-1, excluding bounds)
    secretNumber = Math.floor(Math.random() * (upperBound - 1)) + 1;
    console.log("Secret number: " + secretNumber); // For testing
    
    // Create players
    players = [];
    for (let i = 1; i <= numPlayers; i++) {
        players.push({
            name: `Player ${i}`,
            isSkipped: false
        });
    }
    
    // Update UI
    gameSetupEl.classList.add('hidden');
    gameAreaEl.classList.remove('hidden');
    updateGameInfo();
    renderPlayerList();
    
    // Start first player's turn
    startPlayerTurn();
}

function startPlayerTurn() {
    // Reset guess permission at the start of each turn
    canGuess = false;
    
    // Check if current player is skipped
    if (players[currentPlayerIndex].isSkipped) {
        displayMessage(`${players[currentPlayerIndex].name}'s turn is skipped this round.`, 'info');
        players[currentPlayerIndex].isSkipped = false; // Reset the skip status
        renderPlayerList();
        
        // Move to next player
        setTimeout(() => {
            nextPlayer();
            startPlayerTurn();
        }, 2000);
        
        return;
    }
    
    // Display whose turn it is
    updateGameInfo();
    displayMessage(`${players[currentPlayerIndex].name}'s turn`, 'info');
    
    // Reset UI for new turn
    guessSectionEl.classList.add('hidden');
    guessInputEl.value = '';
    
    // Present a random question
    presentQuestion();
}

function presentQuestion() {
    // Use the active question bank
    const questionSet = activeQuestionBank === 'built-in' ? builtInQuestions : customQuestionBank;
    
    // Select a random question
    const randomIndex = Math.floor(Math.random() * questionSet.length);
    currentQuestion = questionSet[randomIndex];
    currentCorrectAnswer = currentQuestion.correctAnswer;
    
    // Display the question
    questionTextEl.textContent = currentQuestion.question;
    
    // Display the answer options
    answerOptionsEl.innerHTML = '';
    currentQuestion.options.forEach(option => {
        const optionEl = document.createElement('div');
        optionEl.className = 'answer-option';
        optionEl.textContent = option;
        optionEl.addEventListener('click', () => handleAnswerSelection(option));
        answerOptionsEl.appendChild(optionEl);
    });
}

function handleAnswerSelection(selectedAnswer) {
    // Clear previous selections
    document.querySelectorAll('.answer-option').forEach(el => {
        el.style.backgroundColor = '#ecf0f1';
        el.style.color = '#333';
    });
    
    // Highlight the selected answer
    event.target.style.backgroundColor = '#3498db';
    event.target.style.color = 'white';
    
    // Check if the answer is correct
    setTimeout(() => {
        if (selectedAnswer === currentCorrectAnswer) {
            displayMessage('Correct! You can now make a guess.', 'success');
            
            // Allow guessing since the answer was correct
            canGuess = true;
            
            // Wait a moment to show the success message, then show the guess section
            setTimeout(() => {
                // Show the guess section
                guessSectionEl.classList.remove('hidden');
                
                // Update guess input min/max range to exclude the bounds
                guessInputEl.min = lowerBound + 1;
                guessInputEl.max = upperBound - 1;
                
                // Focus on the input field
                guessInputEl.focus();
            }, 1000);
        } else {
            displayMessage('Incorrect! Your turn is skipped.', 'error');
            
            // Ensure guessing is not allowed
            canGuess = false;
            
            // Move to next player after showing the error message
            setTimeout(() => {
                nextPlayer();
                startPlayerTurn();
            }, 2000);
        }
    }, 1000);
}

function handleGuess() {
    // Double-check the canGuess flag (extra validation)
    if (!canGuess) {
        displayMessage('Please answer the question correctly first', 'error');
        return;
    }
    
    const guess = parseInt(guessInputEl.value);
    
    // Validate guess
    if (isNaN(guess)) {
        displayMessage('Please enter a number', 'error');
        return;
    }
    
    if (guess <= lowerBound || guess >= upperBound) {
        displayMessage(`Please enter a number between ${lowerBound + 1} and ${upperBound - 1}`, 'error');
        return;
    }
    
    // Process the guess
    if (guess === secretNumber) {
        // Game over - current player wins
        displayMessage(`${players[currentPlayerIndex].name} guessed the secret number ${secretNumber}!`, 'info');
        endGame(currentPlayerIndex);
    } else if (guess < secretNumber) {
        // Update lower bound
        lowerBound = guess;
        displayMessage(`The secret number is higher than ${guess}. Range updated.`, 'info');
        
        // Check if next player has no valid moves
        if (lowerBound + 1 >= upperBound - 1) {
            // Next player will lose
            const nextPlayerIndex = (currentPlayerIndex + 1) % players.length;
            displayMessage(`${players[nextPlayerIndex].name} wins!`, 'info');
            endGame(nextPlayerIndex);
            return;
        }
        
        // Move to next player
        nextPlayer();
        setTimeout(startPlayerTurn, 2000);
    } else {
        // Update upper bound
        upperBound = guess;
        displayMessage(`The secret number is lower than ${guess}. Range updated.`, 'info');
        
        // Check if next player has no valid moves
        if (lowerBound + 1 >= upperBound - 1) {
            // Next player will lose
            const nextPlayerIndex = (currentPlayerIndex + 1) % players.length;
            displayMessage(`${players[nextPlayerIndex].name} wins!`, 'info');
            endGame(nextPlayerIndex);
            return;
        }
        
        // Move to next player
        nextPlayer();
        setTimeout(startPlayerTurn, 2000);
    }
    
    updateGameInfo();
}

function nextPlayer() {
    currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
    
    // Check if we've completed a round
    if (currentPlayerIndex === 0) {
        round++;
    }
    
    updateGameInfo();
    renderPlayerList();
}

function displayMessage(message, type) {
    messageAreaEl.textContent = message;
    messageAreaEl.className = '';
    messageAreaEl.classList.add(`message-${type}`);
}

function updateGameInfo() {
    // Display the current range showing the exclusive bounds correctly
    rangeDisplayEl.textContent = `${lowerBound} - ${upperBound}`;
    currentPlayerEl.textContent = players[currentPlayerIndex].name;
    roundNumberEl.textContent = round;
}

function renderPlayerList() {
    playerListEl.innerHTML = '';
    
    players.forEach((player, index) => {
        const playerEl = document.createElement('div');
        playerEl.className = 'player-card';
        
        if (index === currentPlayerIndex) {
            playerEl.classList.add('player-active');
        }
        
        if (player.isSkipped) {
            playerEl.classList.add('player-skipped');
        }
        
        playerEl.innerHTML = `
            <div>${player.name}</div>
            ${player.isSkipped ? '<div>Skipped Next Round</div>' : ''}
        `;
        
        playerListEl.appendChild(playerEl);
    });
}

function endGame(loserIndex) {
    loserFound = true;
    gameActive = false;
    
    // Show game over screen
    setTimeout(() => {
        gameAreaEl.classList.add('hidden');
        gameOverEl.classList.remove('hidden');
        
        resultMessageEl.innerHTML = `
            <p>Game Over! The secret number was <span class="highlight">${secretNumber}</span>.</p>
            <p>${players[loserIndex].name} wins!</p>
        `;
    }, 3000);
}

function resetGame() {
    // Hide game over screen and show setup
    gameOverEl.classList.add('hidden');
    gameSetupEl.classList.remove('hidden');
    
    // Reset game state
    secretNumber = null;
    lowerBound = 0;
    upperBound = parseInt(numberRangeInput.value); // Use current selected range
    currentPlayerIndex = 0;
    players = [];
    round = 1;
    gameActive = false;
    currentQuestion = null;
    loserFound = false;
    canGuess = false; // Reset the guess permission flag
    
    // Clear messages
    messageAreaEl.textContent = '';
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', initializeGame);
