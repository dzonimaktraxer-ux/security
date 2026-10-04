/* =========================
   PHISHING SCENARIO
========================= */

function phishingChoice(choice) {

    const result = document.getElementById("scenario-result");

    if (!result) return;

    if (choice === "link") {

        result.innerHTML =
            "⚠ ОШИБКА: ссылка ведёт на подозрительный адрес. Всегда проверяй источник сообщения.";

    } else {

        result.innerHTML =
            "✓ ПРАВИЛЬНО: сообщение содержит признаки фишинга — срочность, угрозу блокировки и подозрительную ссылку.";

    }
}


/* =========================
   QUIZ
========================= */

const questions = [
    {
        question: "Используешь ли ты разные пароли для важных аккаунтов?",
        answer: true
    },

    {
        question: "Проверяешь ли ты адрес сайта перед вводом личных данных?",
        answer: true
    },

    {
        question: "Открываешь ли ты ссылки от неизвестных отправителей?",
        answer: false
    },

    {
        question: "Используешь ли ты двухфакторную аутентификацию?",
        answer: true
    },

    {
        question: "Сообщаешь ли ты кому-либо коды подтверждения из SMS?",
        answer: false
    }
];


let currentQuestion = 0;
let score = 0;


function updateQuiz() {

    const question = document.getElementById("question");
    const questionNumber = document.getElementById("question-number");
    const progressBar = document.getElementById("progress-bar");

    if (!question) return;


    if (currentQuestion >= questions.length) {

        showQuizResult();

        return;
    }


    question.textContent = questions[currentQuestion].question;


    questionNumber.textContent =
        `ВОПРОС ${String(currentQuestion + 1).padStart(2, "0")} / ${questions.length}`;


    const progress =
        ((currentQuestion + 1) / questions.length) * 100;


    progressBar.style.width = `${progress}%`;
}


function answerQuiz(answer) {

    if (currentQuestion >= questions.length) {
        return;
    }


    const correctAnswer =
        questions[currentQuestion].answer;


    if (answer === correctAnswer) {
        score++;
    }


    currentQuestion++;

    updateQuiz();
}


function showQuizResult() {

    const question = document.getElementById("question");

    const buttons =
        document.querySelector(".quiz-buttons");

    const result =
        document.getElementById("quiz-result");

    const questionNumber =
        document.getElementById("question-number");

    const progressBar =
        document.getElementById("progress-bar");


    const percentage =
        Math.round((score / questions.length) * 100);


    questionNumber.textContent =
        "АНАЛИЗ ЗАВЕРШЕН";


    progressBar.style.width = "100%";


    buttons.style.display = "none";


    let title;
    let message;


    if (percentage >= 80) {

        title = "БЕЗУПРЕЧНО";

        message =
            "Ты хорошо ориентируешься в основных правилах цифровой безопасности.";

    } else if (percentage >= 60) {

        title = "ХОРОШО";

        message =
            "У тебя неплохой уровень знаний, но некоторые привычки стоит улучшить.";

    } else {

        title = "НЕОБХОДИМО ВМЕШАТЕЛЬСТВО";

        message =
            "Стоит уделить больше внимания защите своих аккаунтов и личных данных.";

    }


    question.innerHTML =
        `${title}<br><span style="color: #b7ff00">${percentage}%</span>`;


    result.textContent = message;


    const restartButton =
        document.createElement("button");


    restartButton.className = "quiz-button";

    restartButton.style.marginTop = "30px";

    restartButton.textContent =
        "ПРОЙТИ ЕЩЁ РАЗ";


    restartButton.onclick = restartQuiz;


    result.appendChild(restartButton);
}


function restartQuiz() {

    currentQuestion = 0;

    score = 0;


    const buttons =
        document.querySelector(".quiz-buttons");

    buttons.style.display = "flex";


    const result =
        document.getElementById("quiz-result");

    result.innerHTML = "";


    updateQuiz();
}


/* =========================
   START
========================= */

document.addEventListener("DOMContentLoaded", () => {

    updateQuiz();

});