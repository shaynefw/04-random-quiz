let main = document.querySelector(".main");
let startBtn = document.getElementById("startBtn");
let timer = 5;
let countDown; 
let questions = [
    //the quiz questions and answers in array
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
    }
    
];
let currentQuestion = questions[0];
let questionHTML = "<h2>" + currentQuestion.question + "</h2>";

// when the user clicks start button the following will happen

startBtn.addEventListener("click", function() {

    //countdown function

    countDown = setInterval(function() {
        timer--;
        if (timer === 0) {
            clearInterval(countDown);
        };
        document.getElementById("timer").innerHTML = timer;
    }, 1000);

    //adding answer buttons inplace of the initial start button

    for (let i = 0; i < currentQuestion.answer.length; i++) {
        questionHTML += "<button>" + currentQuestion.answer[i] + "</button>";
    };

    //replacing the initial main section with the questions
    
    main.innerHTML = questionHTML;
});

