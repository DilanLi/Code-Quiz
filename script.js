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
var viewHighscores = document.querySelector("#highscore");

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
//array that contains answers objects
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
    //if all questions answered, take user to initials page to enter info
    if (correctIndex === questionsArray.length - 1) {
        setTimeout(function(){quizSection.style.display = "none";
        initialsSection.style.display = "inline";
    }, 500);
        //timer stops 
        setTimeout(function(){clearInterval(timerInterval)}, 500);

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
        
            //if run out of time, go straight to user initial page to record score
            if (secondsLeft === 0) {
              clearInterval(timerInterval);
              quizSection.style.display = "none";
              initialsSection.style.display = "inline";
            }
          }, 1000);
        return timerInterval;
    }   


//determine if user answered correctly
var score = 0;
quizSection.addEventListener("click", determineCorrectAnswer)


function determineCorrectAnswer(event){
    if(event.target.matches(".btn-warning")){
        var chosenAnswer = event.target.textContent;
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
var userInitial = document.querySelector("#initials").value;

submitButton.addEventListener("click", function(event){
    event.preventDefault();
                //show highscores page
                userInitial = document.querySelector("#initials").value;
                initialsSection.style.display = "none";
                document.querySelector(".highscores-section").style.display = "block";
                document.querySelector(".user-scores").style.display = "block";
            newUser();        
})

//pushes user info to html
function newUser(){
    localStorage.setItem(userInitial, secondsLeft);
        var p = document.createElement("p");
        p.textContent = userInitial + ": " + secondsLeft;
        document.querySelector(".user-scores").appendChild(p);
}


//start the quiz again when "Challenge Again" button is pressed
document.querySelector(".challenge-again").addEventListener("click", function(){
    correctIndex = 0;
    // goToNextQuestion();
    secondsLeft = 76;
    // startTimer();
    document.querySelector(".jumbotron").style.display = "block";
    highscoreSection.style.display = "none";
})


//clear highscore when "Clear Highscores" button is pressed
document.querySelector(".clear-highscores").addEventListener("click", clearLocalStorage);

function clearLocalStorage() {
    localStorage.clear();
    document.querySelector(".user-scores").textContent = " ";
    document.querySelector(".user-scores").style.display = "none";
}

//view highscores link
viewHighscores.addEventListener("click", function(){
    clearInterval(timerInterval);
    document.querySelector(".jumbotron").style.display = "none";
    quizSection.style.display = "none";
    initialsSection.style.display = "none";
    highscoreSection.style.display = "block";
    document.querySelector(".user-scores").textContent = " ";
    for (let i = 0; i< localStorage.length; i++) {
        var p = document.createElement("p");
        var user = localStorage.key(i);
        var scores = localStorage.getItem(localStorage.key(i));
        p.textContent = user + ": " + scores;
        document.querySelector(".user-scores").appendChild(p);}
    })
