function Question(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}
Question.prototype.isCorrectAnswer = function(choice) {
    return this.answer === choice;
}
function Quiz(questions) {
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;
}

Quiz.prototype.getQuestionIndex = function() {
    return this.questions[this.questionIndex];
}

Quiz.prototype.guess = function(answer) 
{
    //this points to current question
    if(this.getQuestionIndex().isCorrectAnswer(answer)) 
    {
        //updates score IF user clicks on button containing correct option ELSE does nothing
        this.score++;
    }
    //updates question index to next after button click
    this.questionIndex++;
}

Quiz.prototype.isEnded = function() {
    //terminates quiz when questions have been exhausted
    return this.questionIndex === this.questions.length;
}

function populate() {
    if(quiz.isEnded()) {
        showScores();
    }
    else {
        // show question on UI
        var element = document.getElementById("question");
        element.innerHTML = quiz.getQuestionIndex().text;
        
        // show options on UI
        var choices = quiz.getQuestionIndex().choices;
        for(var i = 0; i < choices.length; i++)
        {
            var element = document.getElementById("choice" + i);//<span id="choice0">
            element.innerHTML = choices[i];//from array with signature[text,choices[],asnwer]
            guess("btn" + i, choices[i]);//<button id="btn0">
        }
        //displays which question is featured
        showProgress();
    }
};
//function
function guess(id, option) {

    //selects button element (in which MCQ options are displayed)
    var button = document.getElementById(id);

    //defines what happens on clicking the button
    button.onclick = function() {
        quiz.guess(option);
        populate();
    }
};

function showProgress() {
    var currentQuestionNumber = quiz.questionIndex + 1;
    //selects footer
    var element = document.getElementById("progress");

    //displays current question in footer 
    element.innerHTML = "Question " + currentQuestionNumber + " of " + quiz.questions.length;
};

function showScores() {
    var gameOverHTML = "<h1>Result</h1>";
    gameOverHTML += "<h2 id='score'> Your score: " + quiz.score + "</h2>";
    var element = document.getElementById("quiz");
    element.innerHTML = gameOverHTML;
};




// create questions
var questions = [
    new Question("Which one is not an object oriented programming language?", ["Java", "C#","C++", "C"], "C"),
    new Question("Which language is used for styling web pages?", ["HTML", "JQuery", "CSS", "XML"], "CSS"),
    new Question("There are/is ____ main component(s) of object oriented programming.", ["1", "6","2", "4"], "4"),
    new Question("Which language is used for web apps?", ["PHP", "Python", "Javascript", "All"], "All"),
    new Question("MVC is a ____.", ["Language", "Library", "Framework", "All"], "Framework")
];

// create quiz
var quiz = new Quiz(questions);

// display quiz
populate();





