
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
const LOW_ANXIETY = `<p>Слишком низкая тревога может указывать на то, что вы оторваны от себя, других или своего окружения. Подтверждением этого предположения могут быть проблемы с давлением, сном или пищеварительной системой. Другими свидетельствами эмоциональной обособленности являются:</p>
<ul>
  <li>неудовлетворенность личными взаимоотношениями;</li>
  <li>трудность понимания того чего вам хочется;</li> 
  <li>проблемы с получением удовольствия;</li>
  <li>частое отсутствие ощущения радости и удовлетворения.</li>
</ul>
<p>В данном случае очень полезной и результативной станет работа с эмоциональным интеллектом  (ощущением и проживанием эмоций). Она позволит снова обрести радость жизни и значительно улучшить отношения с семьей и окружением.</p>
`;
const MEDIUM_ANXIETY = `<p>Средний уровень тревожности указывает на то, что у Вас уже есть:</p>
<ul>
  <li>предрасположенность к восприятию широкого круга ситуаций как угрожающих своей самооценке, престижу, самоуважению или жизнедеятельности;</li>
  <li>склонность реагировать на такие ситуации состоянием тревоги;</li>
  <li>чувствительность в отношении тех негативных событий или неудач, которые предположительно могут случиться или произойти.</li>
</ul>
<p>Тревога может стать преградой на пути профессионального и карьерного роста, «стеклянным потолком», который преодолеть не получается. В этом случае возможно работать в формате коучинга с установками, эмоциональным интеллектом и паттернами (стереотипами) вашего поведения.</p> 
`;
const HIGHT_ANXIETY = `<p>Высокий уровень тревожности уже сам по себе является крайне неприятным состоянием, которое заметно снижает качество жизни. Также она может являться симптомом таких заболеваний:</p>
<ul>
    <li>агорафобии - боязни находиться в определенных местах;</li>
    <li>тревожного расстройства, вызванного заболеванием;</li>
    <li>генерализованного тревожного расстройства;</li>
    <li>панического расстройства, сопровождающегося паническими атаками;</li>
    <li>социальной фобии - боязни находиться в социальное среде.</li.
<ul>
<p>Также научно доказано, что повышенный уровень тревожности может способствовать развитию или обострению психсоматических и хронических заболеваний:  язва двенадцатиперстной кишки или желудка; гипертония; язвенный колит; бронхиальная астма; нейродермит, псориаз; ревматоидный артрит; гиперфункция щитовидной железы (гипертиреоз). Поэтому Вам лучше не откладывать визит к психологу.</p>
`;
const RESULTS = {
    10 : ["симптомы тревоги отсутствуют",""],
    19 : ["низкий уровень тревоги",LOW_ANXIETY],
    30 : ["средний уровень тревоги",MEDIUM_ANXIETY],
    64 : ["высокий уровень тревоги",HIGHT_ANXIETY]
}


const userData = {
    // name : "null",
    name : null,
    // email : "null",
    email : null,
    // tel: "null"
    tel: null
}
const answers = [];

// Hight
// const answers = [2, 3, 1, 1, 2, 3, 1, 2, 0, 2, 3, 1, 0, 2, 3, 2, 1, 3, 2, 3];
// Medium
// const answers = [1, 1, 1, 1, 2, 1, 1, 2, 0, 2, 1, 1, 0, 2, 1, 2, 1, 1, 2, 1];
// Low
//  const answers = [0, 0, 0, 0, 1, 0, 0, 2, 0, 2, 1, 1, 0, 2, 1, 2, 1, 1, 2, 1];
//Nothing
//  const answers = [0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 1, 0, 0, 0, 1, 0, 1, 1, 2, 1];


let currentHandledUserDataFieldName = null;

let currentQuestion = 0;
// let currentQuestion = 20;
let currentAnswer = null;

const htmlRefs = {
    arena: document.querySelector(".js-arena"),
    userDataForm : document.querySelector(".js-userDataForm"),
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

const getUndefinedUserDataKey = () => Object.keys(userData).find(key=>!userData[key]);

function getUserDataForm(userDataKey){
    const input= {
        name : ["text", "Введите Имя"],
        email : ["email", "Введите Email"],
        tel :  ["tel", "Введите Номер мобильного"]
    }
    
    const html = `<input name="${userDataKey}" type="${input[userDataKey][0]}" placeholder="${input[userDataKey][1]}" required class="js-userDataInput">
                    <button  class="js-userDataButton">Подтвердить</button>`;
    htmlRefs.userDataForm.innerHTML = html;
}

function getUserData(){

    // const {name, email, tel} = userData;

    let userDataKey = getUndefinedUserDataKey();

    if(!userDataKey) {
        console.log("User Data", userData);
        htmlRefs.userDataForm.innerHTML = "";
        letInterview();
        return;
    }; 
    currentHandledUserDataFieldName = userDataKey;
    getUserDataForm(userDataKey);

    

}

function handleConfirmUserData(e){
    e.preventDefault();
    
    const inputName = currentHandledUserDataFieldName;
   const inputValue = htmlRefs.userDataForm[currentHandledUserDataFieldName].value;
        
    userData[inputName] = inputValue;

    console.log("userData", userData)

    getUserData();
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
}
function getLocaleDate(locale){
    const date = new Date();

    // формат вывода
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    };

    return date.toLocaleString(locale, options);
}

function actionResult(){
    alert("Результат !");
    const currentDate = getLocaleDate('RU-uk');
    const summ = answers.reduce((acc, value) => acc + value, 0);
    const [bref, description] = getResult(summ);
    htmlRefs.arena.innerHTML = `
        <p>Здравствуйте, ${userData.name}!<p>

        <p>В ${currentDate} Вы проходили тест на определения уровня тревожности в Центре психотерапии СТРУКТУРА.</p>
        <p>По результатам данного теста: </p>
        <p>Ваша cумма балов : ${summ} - ${bref}.</p>
        <p>Это подтверждается средней или сильной выраженностью у Вас следующих симптомов:</p>
            ${getSimptoms()}
        <p>${description}<p>
        <p>В рамках Программы Заботы о Клиентах, Центр психотерапии СТРУКТУРА предлагает Вам консультацию со специалистом по тревожным расстройствам Ростиславом Хцынским со скидкой 70% (по цене 330 грн.)</p>
        <button type="button">ЗАПИСАТЬСЯ НА КОНСУЛЬТАЦИЮ</button>
        <p>Специалисты нашего Центра заботятся о том, чтобы Ваши любые психологические проблемы решались максимально быстро и комфортно!</p>
        <p>Благодарим за то, что выбрали нас!</p>
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

function addEventListeners(){
    htmlRefs.userDataForm.addEventListener('submit', handleConfirmUserData);

    htmlRefs.arena.addEventListener('click', e=>{
        console.log(e.target);
        handleAnswerClick(e);
        handleConfirmBtnClick(e);
})
}

function letInterview(){
    const {varianst} = htmlRefs;
    // console.log(htmlRefs.question)
    drawCurrentQuestion();
    varianst.innerHTML =  getAnswerVariantsHTML();
    // buttons.innerHTML =  getConfirmButtonHTML();
    
}

function letTest(){

    addEventListeners();

    getUserData();
    // letInterview();

}
letTest();