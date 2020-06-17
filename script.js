var startQuizBtn = document.querySelector(".start-quiz-btn");
var timer = document.querySelector("#timer");
var question = document.querySelector(".question");
var answer1 = document.querySelector(".answer1");
var answer2 = document.querySelector(".answer2");
var answer3 = document.querySelector(".answer3");
var answer4 = document.querySelector(".answer4");
var quizSection = document.querySelector(".quiz-section");
var individualResult = document.querySelector("#right-or-wrong");
var initialsSection = document.querySelector(".initials-section");
var submitButton = document.querySelector(".submit-btn");
var highscoreSection = document.querySelector(".highscores-section");
// var buttons = document.querySelectorAll(".btn-warning");
//array that contains all questions
var question1 = "What best describes Javascript?"
var question2 = "Where on page should a script tag be placed?"
var question3 = "How would you access 'apples' within the following array: var fruits = ['apples', 'bananas', 'watermelon']?"
var question4 = "What data type is 'apples' in var fruits = ['apples', 'bananas', 'watermelon']?"
var question5 = "How would you call the function named getFruits?"
var questionsArray = [question1, question2, question3, question4, question5]

//Answers are objects
var quizAnswers1 = {
    content1: "The skeleton that defines content and structure of a web page",
    content2: "A style sheet language used for describing the presentation of a document",
    content3: "A scripting or programming language that allows developers to implement complex features on web pages",
    content4: "All of the above"
}
var quizAnswers2 = {
    content1: "Inside of the header element",
    content2: "Inside and on the bottom of the body element",
    content3: "Outside the HTML element",
    content4: "The placement of the script tag does not matter"
}

var quizAnswers3 = {
    content1: "fruits[0]",
    content2: "fruits[1]",
    content3: "fruits(0)",
    content4: "fruits(1)"
}

var quizAnswers4 = {
    content1: "number",
    content2: "string",
    content3: "undefined",
    content4: "symbol"
}

var quizAnswers5 = {
    content1: "getFruits",
    content2: "function getFruits",
    content3: "function getFruits()",
    content4: "getFruits()"
}

//array that contains all answers
var answersArray = [quizAnswers1, quizAnswers2, quizAnswers3, quizAnswers4, quizAnswers5]


//all correct answers
var correctAnswer1 = quizAnswers1.content3;
var correctAnswer2 = quizAnswers2.content2;
var correctAnswer3 = quizAnswers3.content1;
var correctAnswer4 = quizAnswers4.content2;
var correctAnswer5 = quizAnswers5.content4;
var correctAnswersArray = [correctAnswer1, correctAnswer2, correctAnswer3, correctAnswer4, correctAnswer5]



//When Start Quiz botton is clicked
    //hide quiz intro and show quiz questions
    startQuizBtn.addEventListener("click", function(){
        document.querySelector(".jumbotron").style.display = "none";
        quizSection.style.display = "block";
        })
    //display first quiz question
    startQuizBtn.addEventListener("click", goToNextQuestion)
    // when any button is clicked, the next question will appear


    var correctIndex = 0;  
function goToNextQuestion(){
    if (correctIndex === questionsArray.length - 1) {
        quizSection.style.display = "none";
        initialsSection.style.display = "inline";
    } else {
        question.textContent = questionsArray[correctIndex];
        answer1.textContent = answersArray[correctIndex].content1;
        answer2.textContent = answersArray[correctIndex].content2;
        answer3.textContent = answersArray[correctIndex].content3;
        answer4.textContent = answersArray[correctIndex].content4;
    }
    }


    //timer starts
    startQuizBtn.addEventListener("click", startTimer)
    
    var secondsLeft = 76;
    var timerInterval;
    function startTimer(){
        timerInterval = setInterval(function() {
            secondsLeft --;
            timer.textContent =  "Time: " + secondsLeft + " seconds";
        
            //if run out of time, alert game over
            if (secondsLeft === 0) {
              clearInterval(timerInterval);
            }
          }, 1000);
        return timerInterval;
    }   

//need to add in when time is up game is over













//determine if user answered correctly
var score = 0;
quizSection.addEventListener("click", determineCorrectAnswer)


function determineCorrectAnswer(event){
    if(event.target.matches(".btn-warning")){
        var chosenAnswer = event.target.textContent;
        console.log("event target: " + event.target)
        console.log("chosen answer : " + chosenAnswer);
        console.log("correct answer : "  + correctAnswersArray[correctIndex]);
        console.log("correct index: " + correctIndex)
        individualResult.textContent = " ";
        individualResult.style.display = "block";
            if (chosenAnswer === correctAnswersArray[correctIndex]){
                individualResult.textContent = "Correct!!!";
                setTimeout(function(){ individualResult.style.display = "none"}, 500);
            } else {
                individualResult.textContent = "Oooops..."
                setTimeout(function(){ individualResult.style.display = "none"}, 500);
                secondsLeft -= 10;
            }
            correctIndex++;
    }
    return secondsLeft;
};

//go to next question when answer buttons are clicked
quizSection.addEventListener("click", function(event){
    if(event.target.matches(".btn-warning")){
        goToNextQuestion();
    }})


//submit buttion: 
//submits user score and initials to local storage, show and display highscores on next page
submitButton.addEventListener("click", function(event){
    event.preventDefault();
        //show highscores page
        initialsSection.style.display = "none";
        document.querySelector(".highscores-section").style.display = "block";
        document.querySelector(".user-scores").style.display = "block";

    //timer stops 
    clearInterval(timerInterval);

    newUser();
})

function newUser(){
    //create p element to hold user initials and scores
    var p = document.createElement("p");
    var userInitial = document.querySelector("#initials").value;
    document.querySelector(".user-scores").appendChild(p);

    //put user initals and scores to local storage and push to p element on html
    localStorage.setItem("userName", userInitial);
    localStorage.setItem("userScore", secondsLeft)
    var name = localStorage.getItem("userName");
    var score = localStorage.getItem("userScore");
    p.textContent = name + ": " + score;
}

//start the quiz again when "Challenge Again" button is pressed
document.querySelector(".challenge-again").addEventListener("click", function(){
    correctIndex = 0;
    goToNextQuestion();
    secondsLeft = 76;
    startTimer();
    quizSection.style.display = "block";
    highscoreSection.style.display = "none";
})

//clear highscore when "Clear Highscores" button is pressed
document.querySelector(".clear-highscores").addEventListener("click", function(){
//    localStorage.clear();
   document.querySelector(".user-scores").style.display = "none";
})

