let main = document.querySelector(".main");
let startBtn = document.getElementById("startBtn");
let scoresBtn = document.getElementById("scores");
let timer = 60;
let countDown; 
let score = 0;
let questions = [

    {
        question: "How many days are there in a week?",
        answer: ["12", "365", "7", "5"],
        correctAnswer: "7"
    },
    {
        question: "How many hours are there in a day?",
        answer: ["24", "12", "48", "72"],
        correctAnswer: "24"
    },
    {
        question: "Which day is the beginning of the week?",
        answer: ["Wednesday", "Sunday", "Saturday", "Monday"],
        correctAnswer: "Sunday"
    },
    {
        question: "Who was the first American in space?",
        answer: ["Terry Fox", "Neil Armstrong", "Alan Shepard", "Yuri Gagarin"],
        correctAnswer: "Yuri Gagarin"
    },
    {
        question: "What year did WW1 start?",
        answer: ["2020", "1914", "1962", "1918"],
        correctAnswer: "1914"
    },
    {
        question: "Who directed the Transformers movies?",
        answer: ["Michael Bay", "Christopher Nolan", "M. Night Shyamalan", "Steven Spielberg"],
        correctAnswer: "Yuri Gagarin"
    }

    
];
let currentQuestion = 0;
let questionHTML = "<h2>" + questions[currentQuestion].question + "</h2>";
let highscores = [];

// function to display current question and answers
function displayCurrentQA() {

    if (currentQuestion >= questions.length) {
        endQuiz();
        return;
    }

    let question = questions[currentQuestion];
    let questionHTML = "<h2>" + question.question + "</h2>";

    for (let i = 0; i < question.answer.length; i++) {
        questionHTML += "<button class='answerBtn'>" + question.answer[i] + "</button>";
    }
    
    main.innerHTML = questionHTML;

    // conditions for gaining points or losing time 

    let answerBtns = document.querySelectorAll(".answerBtn");

    answerBtns.forEach(function(btn) {
        btn.addEventListener("click", function() {
            if (btn.innerHTML === question.correctAnswer) {
                score++;
                currentQuestion++;
                displayCurrentQA();
            } else {
                timer -= 10;
                currentQuestion++;
                displayCurrentQA();
            }
        });
    });
}

// function to end quiz and save score
function endQuiz() {
    clearInterval(countDown);
    let initials = ""; //85-87 will ensure user enters initials. quite a complex block indeed, dont ask me to explain it from memory lol.
    while (initials.length !== 2 || !initials.match(/^[A-Za-z]+$/) || initials === "") {
        initials = prompt("Enter your initials (maximum 2 characters, only letters):");
    };
    let highscore = {
        initials: initials,
        score: score
    };
    highscores.push(highscore);
    localStorage.setItem("highscores", JSON.stringify(highscores));
    displayHighscores();
}

//function to restart timer after quiz
function restartTimer() {
    timer = 60;
    startTimer()
}

//funtion to start timer
function startTimer() {
    countDown = setInterval(function() {
        timer--;
        if (timer === 0 || timer <= 0) {
            clearInterval(countDown);
            alert("Time is up!");
            endQuiz();
        }
        document.getElementById("timer").innerHTML = timer;
    }, 1000);
}

// function to display highscores
function displayHighscores() {
    let highscoresHTML = "";
    for (let i = 0; i < highscores.length; i++) {
        highscoresHTML += "<li>" + highscores[i].initials + ": " + highscores[i].score + "</li>";
    }
    main.innerHTML = "<h2>Highscores</h2><ol>" + highscoresHTML + "</ol><button id='restartBtn'>Restart Quiz</button>";
    let restartBtn = document.getElementById("restartBtn");
    restartBtn.addEventListener("click", function() {
        score = 0;
        currentQuestion = 0;
        timer;
        displayCurrentQA();
        restartTimer();
    });
}

// button to start quiz 

startBtn.addEventListener("click", function() {
    startTimer();
    displayCurrentQA();
});

// button to view scores 

scoresBtn.addEventListener("click", function() {

    clearInterval(countDown);

    let storedHighscores = JSON.parse(localStorage.getItem("highscores"));

    if (storedHighscores !== null) {
    highscores = storedHighscores;
    };

    displayHighscores();

});


