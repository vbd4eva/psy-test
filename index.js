
const QUESTIONS = [
    "Притупление чувств, покалывание или жжение",
    "Ощущение жары",
    "Дрожь в ногах, непроизвольные движения ногами",
    "Невозможность успокоиться",
    "Страх, что случится самое страшное",
    "Головокружение или затуманенное сознание",
    "Учащенное сердцебиение",
    "Неуравновешенность",
    "Ощущение паники",
    "Нервозность",
    "Ощущение удушья",
    "Дрожь в руках",
    "Слабость и/или 'ватные ноги'",
    "Страх потерять самообладание",
    "Затрудненное дыхание",
    "Страх смерти",
    "Испуг",
    "Расстройство пищеварения (ощущение дискомфорта в животе)",
    "Ощущение обморока",
    "Покраснение лица (жар)",
    "Холодный пот"
];
const VARIANTS = [
    "Совсем не беспокоит",
    "Беспокоит в лёгкой степени (не особенно беспокоит)",
    "Беспокоит в средней степени (это было очень неприятно, но я справился/лась с этим)",
    "Беспокоит в значительной степени (с трудом справился/лась с этим)"
];
const RESULTS = {
    10 : "симптомы тревоги отсутствуют",
    19 : "низкий уровень тревоги",
    30 : "средний уровень тревоги",
    64 : "высокий уровень тревоги"
}

const answers = [];
let currentQuestion = 0;
let currentAnswer = null;

const htmlRefs = {
    arena: document.querySelector(".js-arena"),
    question : document.querySelector(".js-question"),
    varianst : document.querySelector(".js-variants"),
    buttons: document.querySelector(".js-buttons"),
    answerList: document.querySelector(".answerList"),
}

const getAnswerVariantsHTML = () =>
`<ul>${VARIANTS.map(
    v => `<li class="js-answer">${v}</li>`
).join("")}</ul>`;
function clearCurrentVariant(){
    htmlRefs.varianst.querySelectorAll('.js-answer').forEach(variant=>{
        variant.classList.remove('current');
    });
}
const getConfirmButtonHTML = text => `<button class="confirmBtn" type="button">${text}</button>`;

function letTest(){
    const {question, varianst, buttons} = htmlRefs;
    // console.log(htmlRefs.question)
    drawCurrentQuestion();
    varianst.innerHTML =  getAnswerVariantsHTML();
    // buttons.innerHTML =  getConfirmButtonHTML();
    addClickListener();
}

function drawCurrentQuestion(){
    htmlRefs.question.innerHTML = `
        Вопрос ${1+currentQuestion} из ${QUESTIONS.length} : <b>${QUESTIONS[currentQuestion]}</b>
    `;
}

function handleAnswerClick(e){
    if(!e.target.classList.contains('js-answer')) return;

    currentAnswer = VARIANTS.indexOf(e.target.innerHTML);
    
    clearCurrentVariant();
    e.target.classList.add("current");    
    
    htmlRefs.buttons.innerHTML = getConfirmButtonHTML("Подтвердить");
}
function handleConfirmBtnClick(e){
    if(!e.target.classList.contains('confirmBtn')) return;


    if(!(currentQuestion < QUESTIONS.length-1)){
        actionResult();        
    }
    
    answers[currentQuestion] = currentAnswer;
    console.log(currentQuestion +"<"+ QUESTIONS.length);
    currentQuestion = answers.length;
       
    console.log("currentQuestion : ",currentQuestion)
    console.log("QUESTIONS.length : ", QUESTIONS.length)
    console.log("answers.length : ", answers.length)

    currentAnswer = null;
    clearCurrentVariant();

    htmlRefs.buttons.querySelector('.confirmBtn').setAttribute('disabled', true);
    // console.log('answers',answers);
    drawCurrentQuestion();
};
function actionResult(){
    alert("Результат !");

    const summ = answers.reduce((acc, value) => acc + value, 0);

    htmlRefs.arena.innerHTML = `
        <h1>Результат (письмо "Клиенту")</h1>
        <p><b>Сумма балов</b> : <b>${summ}</b>, - ${getResult(summ)}.</p>
        <p>
            <b>Рекомендуем вам обратить внимание на следующие симптомы:</b>
            ${getSimptoms()}
        </p>
    `;
    console.log("answers", answers)
}
function getResult(summ){
    const resultKey = Object.keys(RESULTS).find(num => summ < num );
    const result = RESULTS[resultKey];
    return result;
 }
function getSimptoms(){
    // const A = [0, 2, 1, 3, 1, 3, 1, 2, 0, 2, 3, 1, 3, 2, 1, 1, 3, 2, 0, 2];
    const simptoms = answers.reduce((acc, value, index) =>{
    if(value >= 2) acc += `<li>${QUESTIONS[index]}</li>`;
        return acc;
    }, "");
    return `<ol>${simptoms}</ol>`
}

function addClickListener(){
    htmlRefs.arena.addEventListener('click', e=>{
        console.log(e.target);
        handleAnswerClick(e);
        handleConfirmBtnClick(e);
})
}


letTest();