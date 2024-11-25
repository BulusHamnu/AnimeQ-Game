// code
import {animeQuestions} from "./data/anime_questions.js";
const questionContainer = document.querySelector('.question-container');

let questionIndex = 0
let quize = animeQuestions[questionIndex]
let score = 0;
let isCorrect = false;
let timer;
const windowWidth = window.innerWidth



function displayQuestion() {
    isCorrect = false;
    let render = `
            <h3 class="question">${quize.question}</h3>
            <div class="answer-box">
                <label for="answer1" class="indicator" data-qId="a">
                    <input type="radio" name=${questionIndex} value="a" class="selector">
                    ${quize.answers.a}
                </label>
                <label for="answer2" class="indicator" data-qId="b">
                    <input type="radio" name=${questionIndex} value="b" class="selector">
                    ${quize.answers.b}
                </label>
                <label for="answer3" class="indicator" data-qId="c">
                    <input type="radio" name=${questionIndex} value="c" class="selector">
                    ${quize.answers.c}
                </label>
                <label for="answer4" class="indicator" data-qId="d">
                    <input type="radio" name=${questionIndex} value="d" class="selector">
                    ${quize.answers.d}
                </label>
            </div>
            

    `

    questionContainer.innerHTML = render;
    document.querySelector(".question-no").innerHTML = `Question: ${questionIndex + 1 } of ${animeQuestions.length}`

    document.querySelectorAll('.selector').forEach(selector => {
        
            selector.addEventListener("click", selectorEvent)
    })


    let count = 0; 
    timer = setInterval(() => {
        count++;
        
        if (windowWidth <= 430) {
            document.querySelector(".timer-indicator").style.width = `${(count / 20) * 21}rem`
        } else {
            document.querySelector(".timer-indicator").style.width = `${(count / 20) * 40}rem`
        }

        
        if (count === 20) {
            clearInterval(timer);
            document.querySelectorAll('.indicator').forEach(indicator => {
                if (indicator.dataset.qid === animeQuestions[questionIndex].correctAnswer) {
                    indicator.classList.add("highlight");
                }
            })
            
            document.querySelectorAll('.selector').forEach(selector => {
                selector.removeEventListener('click',selectorEvent)
            })
        }
        
    },1000)

}


document.querySelector(".start-game").addEventListener("click",function () {
    displayQuestion()
    document.querySelector(".next-question").style.display = "block"
})

document.querySelector(".next-question").addEventListener("click", function() {
    
    clearInterval(timer);
    questionIndex++;
    timer = 0;
    if (questionIndex >= animeQuestions.length) {
        document.querySelector(".next-question").style.display = "none";
        document.querySelector(".restart-btn").style.display = "block";
        questionContainer.innerHTML = `You finished the game, you total score is ${score} out of ${animeQuestions.length} questions`;
        document.querySelector(".timer-indicator").style.width = "0rem"
    } else {
        if (isCorrect) {
            score++;
            console.log(`Correct Answer! Score: ${score}`)
            document.querySelector(".scores").style.display = `Score: ${score}`;
        } else {
            console.log(`Wrong Answer! Score: ${score}`)
            document.querySelector(".scores").style.display = `Score: ${score}`;
        }
        quize = animeQuestions[questionIndex];
        setTimeout(() => {
            displayQuestion()
            document.querySelector(".scores").innerHTML = `Score: ${score}`;
        },600)
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

function selectorEvent(e) {
    let selector = e.target;
    clearInterval(timer);
    if (selector.checked) {
        if (selector.value === animeQuestions[parseInt(selector.name)].correctAnswer) {

            document.querySelectorAll(".indicator").forEach(indicator => {
                
                if (indicator.dataset.qid === selector.value) {
                    indicator.classList.add("highlight");
                    
            } 
            
            
        });
            
            isCorrect = true;


        } else {
            isCorrect = false;

            document.querySelectorAll(".indicator").forEach(indicator => {
                
                if (indicator.dataset.qid === selector.value) {
                    indicator.classList.add("wrong-answer");
                    
            }
            if (indicator.dataset.qid === animeQuestions[parseInt(selector.name)].correctAnswer ) {
                indicator.classList.add("highlight");
                
        } 
        
        
        } )

        }
    }
}




// Data Storage: Use local storage or session storag

