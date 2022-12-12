var cardContent = document.querySelector('.card-content');
var startButton = document.getElementById("start-quiz");
var nextButton = document.getElementById('next');
nextButton.addEventListener('click', nextQuestion)
var quizList = document.getElementById('quiz-list');
var correctAns = document.getElementById('correct');
var quizContent = document.getElementById('quiz-content');
var quizImage = document.querySelector('img');
var endGame = document.getElementById('end-game');
var scoreBoard = document.getElementById('scoreboard');
var saveBtn = document.getElementById('save');
var leaderboardBtn = document.getElementById('leaderboard');
var leaderboardList = document.getElementById('leaderboard-div');

var timer = document.getElementById('timer');

var pokmeonNames = ['bulbasaur', 'ivysaur', 'venasaur', 'charmander', 'charmeleon', 'charizard', 'squirtle', 'wartortle', 'blastoise', 'caterpie', 'metapod', 'butterfree', 'weedle', 'kakuna', 'beedrill', 'pidgey', 'pidgeotto', 'pidgeot', 'rattata', 'raticate', 'spearow', 'fearow', 'ekans', 'arbok', 'pikachu']
var score = 0;



// audio vars and functions
var menuMusic = document.getElementById('menu-music');
document.getElementById('menu-music').loop = true;
document.getElementById('menu-music').controls = true;
function playMenuMusic() {
    menuMusic.play();
}
function pauseMenuMusic() {
    menuMusic.pause();
}

var battleMusic = document.getElementById('battle');
document.getElementById('battle').loop = true;

function playBattleMusic() {
    battleMusic.play();
    document.getElementById('battle').controls = true;
    document.getElementById('menu-music').controls = false;
}
function pauseBattleMusic() {
    battleMusic.pause();
}

var hallOfFame = document.getElementById('hall-of-fame');
function playFameMusic() {
    hallOfFame.play();
    document.getElementById('battle').controls = false;
}
function pauseFameMusic() {
    hallOfFame.pause();
}

//mouse click sounds
var clickNoise = document.getElementById('click');

function MouseSound() {
    clickNoise.play();
}

window.addEventListener('click', MouseSound , false);


//start of quiz code
var answerIndex;
var btn = startButton.addEventListener('click', startGame)

//start menu music on page load
playMenuMusic();

function startGame() {
    //timer
    timer.innerText = 5;
    var myInterval = setInterval(function() {
        timer.innerText--;
        if (timer.innerText == 0) {
            clearTimeout(myInterval);
            endState();
        }
    }, 1000);
    
    //hide the start button and create first quiz question
    startButton.classList.add('hide');
    blurImage();
    createLi();
    pauseMenuMusic();
    playBattleMusic();
    nextButton.classList.remove('hide');
}


function randomize(arr) {
    let i = arr.length, randomIndex;
  
    while (i != 0) {
      randomIndex = Math.floor(Math.random() * i);
      i--;
  
      [arr[i], arr[randomIndex]] = [arr[randomIndex], arr[i]];
    }
    return arr;
  }

  // Quiz object containing image, all answers, and correct answer
  // Image will be grayed out intially and then after answer selection 
  // Turn back to normal

  var quiz = [
    {
        image: "./Assets/Images/024.png",
        answers: ['Pikachu', 'Ekans', 'Eevee', 'Arbok'],
        correct: 'Arbok'
    },
    {
        image: './Assets/Images/004.png',
        answers: ['Charmeleon', 'Charmander', 'Weedle', 'Pidgey'],
        correct: 'Charmander'
    },
    {
        image: './Assets/Images/009.png',
        answers: ['Blastoise', 'Charizard', 'Fearow', 'Wartortle'],
        correct: 'Blastoise'
    },
    {
        image: './Assets/Images/015.png',
        answers: ['Butterfree', 'Pidgeotto', 'Beedrill', 'Metapod'],
        correct: 'Beedrill'
    },
    {
        image: './Assets/Images/025.png',
        answers: ['Rattata', 'Caterpie', 'Clefairy', 'Pikachu'],
        correct: 'Pikachu'
    }
  ]


// setting quiz index to 0 to start at first question

var index = 0;

// createLi function lists the answers for each question
// and sets an attribute for the correct answer

function createLi() {
    
    for (let i = 0; i < quiz[index].answers.length; i++) {
        var li = document.createElement('li');
        li.textContent = quiz[index].answers[i];
        if (quiz[index].answers[i] == quiz[index].correct) {
            li.setAttribute('id', 'correct');
        }
        document.getElementById('quiz-list').appendChild(li);
        quizImage.src = quiz[index].image;
    }
    index++;
    if (index == quiz.length) {
        // add new button to restart quiz from index 0.
    }
    
}


// shows result once an answer is clicked
// lets you know if you were right or wrong
// increases score if you were right

quizList.addEventListener('click', showResult);

function showResult (e) {
    showImage();
    var correctAns = document.getElementById('correct').innerText;
    var p = document.createElement('p');
    e = e || document.event;
    var target = e.target || e.srcElement, text = target.textContent || target.innerText;
    if (text == correctAns) {
        quizContent.appendChild(p).textContent = "You're a Pokemon master!";
        score++;
        timer.innerText = parseInt(timer.innerText) + 5;
        scoreBoard.innerText = '';
        scoreBoard.innerText = score + "/5"
    } else {
        quizContent.appendChild(p).textContent = "Study harder, and try again!";
        timer.innerText = parseInt(timer.innerText) - 2;
    }
   
}

var pElement = document.querySelector('p');


//function to clear the previous answers, reblur the image, and remove the right/wrong messages
function resetState() {
    quizList.innerHTML = '';
    blurImage();
    quizContent.removeChild(quizContent.lastChild);
}

//clear last answer, reblur, and set new question's answers
function nextQuestion() {
    resetState();
    createLi();
    if (index >= 5) {
        nextButton.classList.add('hide');
        endGame.classList.remove('hide');
        endGame.addEventListener('click', endState);
        // for (let i = 0; i < 4; i++) {
        //     document.getElementById('quiz-list').removeChild(quizList.firstChild);
        // }
    }
}


function showImage() {
    document.querySelector('img').style.filter = "contrast(100%)";
}

function blurImage() {
    document.querySelector('img').style.filter = "contrast(0%)";
}

function endState() {
    //cardContent.removeChild(cardContent.firstChild);
    quizContent.classList.add('hide');
    saveBtn.classList.remove('hide');
    leaderboardBtn.classList.remove('hide');
    
    //get initials to store in local storage and append to leaderboard
    var initials = prompt("What are your initials?");
    initials = initials.split('', 3);
    initials = initials.join('');
    initials = initials.toUpperCase();
    
    localStorage.setItem('name', initials);
    leaderboardBtn.addEventListener('click', showLeaderboard);
    // var board = document.getElementById('leaderboard');
    // var btn = document.createElement('button');
    // btn.textContent = 'Save Score';
    // board.appendChild(btn).setAttribute('id', 'save')
    // var saveBtn = document.getElementById('save');
    saveBtn.addEventListener('click', saveData);
    

    //show leaderboard button with save results function
    //clear other elements and show end screen
}

// create new div for leaderboard scores
// var div = document.createElement('div');
// cardContent.appendChild(div).setAttribute('id', 'leaderboard');

function saveData() {
    console.log(score);
    //add multiplyer for having more than 2 seconds
    if (timer.innerText >= 2) {
        var multiplyer = (parseInt(timer.innerText)/2);
    } else {
        multiplyer = 1;
    }
    //if all correct add bonus
    if (score == 5) {
        var bonus = 25;
    } else {bonus = 0;}
    score = score * multiplyer + bonus;
    let x = score.toString();
    localStorage.setItem("save", x);
    updateLeaderboard();
}

function updateLeaderboard() {
    var board = document.getElementById('leaderboard-div');
    var z = localStorage.getItem('name') + ': ' + localStorage.getItem("save");
    console.log(z);
    let p = document.createElement('p');
    p.textContent = z;
    board.appendChild(p);
}

function showLeaderboard() {
    leaderboardList.classList.remove('hide');
}
