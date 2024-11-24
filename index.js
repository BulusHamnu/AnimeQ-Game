// code
import {animeQuestions} from "./data/anime_questions.js";
const questionContainer = document.querySelector('.question-container');

let questionIndex = 0
let quize = animeQuestions[questionIndex]

displayQuestion()

function displayQuestion() {
    let render = `
        
            <h3 class="question">${quize.question}</h3>
            <div class="answer-box">
                <label for="answer1">
                    <input type="radio" name="answer" id="answer1">
                    ${quize.answers.a}
                </label>
                <label for="answer2">
                    <input type="radio" name="answer" id="answer2">
                    ${quize.answers.b}
                </label>
                <label for="answer3">
                    <input type="radio" name="answer" id="answer3">
                    ${quize.answers.c}
                </label>
                <label for="answer4">
                    <input type="radio" name="answer" id="answer4">
                    ${quize.answers.c}
                </label>
            </div>
            

    `

    questionContainer.innerHTML = render
}

document.querySelector(".next-question").addEventListener("click", function() {
    questionIndex++;
    if (questionIndex >= animeQuestions.length) {
        questionIndex = 0;
        quize = animeQuestions[questionIndex]
        displayQuestion()
    } else {
        quize = animeQuestions[questionIndex];
        displayQuestion()
    }
});

document.querySelector(".prev-question").addEventListener("click", function() {
    questionIndex--;
    if (questionIndex < 0) {
        questionIndex = animeQuestions.length - 1;
        quize = animeQuestions[questionIndex]
        displayQuestion()
    } else {
        quize = animeQuestions[questionIndex];
        displayQuestion()
    }
});



