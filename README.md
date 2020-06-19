# 04 Web APIs: Javascript fundamentals Quiz

## Description
This is a browswer based quiz on Javascript fundamentals. Upon opening the application, user will be presented rules of the quiz and a start button. The start button actives a 75 seconds timer, as well as multiple choice questions that dynamically updates with user clicks. 
The purpose of building this application is to practice important developer skills such as traversing the DOM, adding event listeners, setting up and accessing the local storage, etc. These skills are crucial in order to create a website that dynamically reacts to user inputs.

link to quiz: https://dilanli.github.io/Code-Quiz/

## Developing Process
- Storing Questions and Answers <br/>

    I decided to create an empty div in index.html (.quiz-section) to hold questions and answers. All questions and answers are then created as variables inside javascript, which are later pushed to index.html as .textContent. The reason I chose to store quiz content in javascript instead of html is because it allows more flexibility to access certain elements. This way I do not have to create another series of variable to call elements inside the html.

- Looping Through the Questions and Answers <br/>

    A variable called correctIndex is created to keep track of user's process in the quiz. The correctIndex starts at 0 and increases everytime an answer is clicked, taking the user to the next index of arrays of content. correctIndex is also used to access the correct answer correspondingly in the correctAnswersArray, the content is then compared with the answer user clicked on to determine correctness.

- Timer <br/>

    Timer starts when: the user clicks on the Start Quiz button.<br/>
    Timer stops when: the user clicks on "View Highscore"; the user finishes the last question; the user uses all 75 seconds.<br/>
    Timer decreases by 10 seconds when: the user answers a question incorrectly.

- Highscore History <br/>

    The highscore history is accessed from local storage by looping through local storage key using an index i. This is different from the information user sees when submitting their initials and score, where that text is .textContent of certain hmtl elements, not local storage.

- Interface <br/>

    I decided to create the interface with two theme colors: black and yellow, which is the theme colors of the JavaScript logo. I hope you enjoy it!

- Please refer to script.js for more detailed description of developing process in the comments.