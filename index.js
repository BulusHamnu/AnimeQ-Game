// code
import {animeQuestions} from "./data/anime_questions.js";
const questionContainer = document.querySelector('.question-container');

let questionIndex = 0
let quize = animeQuestions[questionIndex]
let score = 0;
let isCorrect = false;

displayQuestion()

function displayQuestion() {
    isCorrect = false;
    let render = `
            <div class="question-no">Question: ${questionIndex + 1 } of ${animeQuestions.length}</div>
            <h3 class="question">${quize.question}</h3>
            <div class="answer-box">
                <label for="answer1">
                    <input type="radio" name=${questionIndex} value="a" class="selector">
                    ${quize.answers.a}
                </label>
                <label for="answer2">
                    <input type="radio" name=${questionIndex} value="b" class="selector">
                    ${quize.answers.b}
                </label>
                <label for="answer3">
                    <input type="radio" name=${questionIndex} value="c" class="selector">
                    ${quize.answers.c}
                </label>
                <label for="answer4">
                    <input type="radio" name=${questionIndex} value="d" class="selector">
                    ${quize.answers.d}
                </label>
            </div>
            

    `

    questionContainer.innerHTML = render

    document.querySelectorAll('.selector').forEach(selector => {
        selector.addEventListener("click", function() {
            if (selector.checked) {
                if (selector.value === animeQuestions[parseInt(selector.name)].correctAnswer) {
                    isCorrect = true;
                } else {
                    isCorrect = false;
                }
            }
        })
    })

    

}

document.querySelector(".next-question").addEventListener("click", function() {
    questionIndex++;
    if (questionIndex >= animeQuestions.length) {
        document.querySelector(".next-question").style.display = "none";
        document.querySelector(".restart-btn").style.display = "block";
        questionContainer.innerHTML = `You finished the game, you total score is ${score}`;
    } else {
        if (isCorrect) {
            score++;
            document.querySelector(".status").innerHTML = `Correct Answer!`
        } else {
            console.log(`Wrong Answer! Score: ${score}`)
            document.querySelector(".status").innerHTML = `Wrong Answer!`
        }
        quize = animeQuestions[questionIndex];
        setTimeout(() => {
            displayQuestion()
            document.querySelector(".status").innerHTML = ``;
            document.querySelector(".scores").innerHTML = `Score: ${score}`;
        },500)
    }
});





document.querySelector(".restart-btn").addEventListener("click", function() {
    questionIndex = 0;
    quize = animeQuestions[questionIndex]
    score = 0;
    isCorrect = false;

    document.querySelector(".next-question").style.display = "block";
    document.querySelector(".restart-btn").style.display = "none";
    document.querySelector(".scores").innerHTML = `Score: ${score}`;

    displayQuestion()
});

