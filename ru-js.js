const QUESTIONS = [
    "Притупление чувств, покалывание или жжение.",
    "Ощущение жары.",
    "Дрожь в ногах, непроизвольные движения ногами.",
    "Невозможность успокоиться.",
    "Страх, что случится самое страшное.",
    "Головокружение или затуманенное сознание.",
    "Учащенное сердцебиение.",
    "Неуравновешенность.",
    "Ощущение паники.",
    "Нервозность.",
    "Ощущение удушья.",
    "Дрожь в руках.",
    "Слабость и/или 'ватные ноги'.",
    "Страх потерять самообладание.",
    "Затрудненное дыхание.",
    "Страх смерти.",
    "Испуг.",
    "Расстройство пищеварения (ощущение дискомфорта в животе).",
    "Ощущение обморока.",
    "Покраснение лица (жар).",
    "Холодный пот."
];
const VARIANTS = [
    "Совсем не беспокоит",
    "Беспокоит в лёгкой степени (не особенно беспокоит)",
    "Беспокоит в средней степени (это было очень неприятно, но я справился/лась с этим)",
    "Беспокоит в значительной степени (с трудом справился/лась с этим)"
];
const LOW_ANXIETY = `
Слишком низкая тревога может указывать на то,\ что вы оторваны от себя,\ других или своего окружения.\ Подтверждением этого предположения могут быть проблемы с давлением,\ сном или пищеварительной системой.\ Другими свидетельствами эмоциональной обособленности являются:\n
\t◉\ неудовлетворенность личными взаимоотношениями;\r
\t◉\ трудность понимания того чего вам хочется;\r 
\t◉\ проблемы с получением удовольствия;\r
\t◉\ частое отсутствие ощущения радости и удовлетворения.\n
В данном случае очень полезной и результативной станет работа с эмоциональным интеллектом \ (ощущением и проживанием эмоций).\ Она позволит снова обрести радость жизни и значительно улучшить отношения с семьей и окружением.
`;
const MEDIUM_ANXIETY = `
Средний уровень тревожности указывает на то,\ что у Вас уже есть:\n
\t◉\ предрасположенность к восприятию широкого круга ситуаций как угрожающих своей самооценке,\ престижу,\ самоуважению или жизнедеятельности;\r
\t◉\ склонность реагировать на такие ситуации состоянием тревоги;\r
\t◉\ чувствительность в отношении тех негативных событий или неудач, которые предположительно могут случиться или произойти.\n
Тревога может стать преградой на пути профессионального и карьерного роста,\ «стеклянным потолком»,\ который преодолеть не получается.\ В этом случае возможно работать в формате коучинга с установками,\ эмоциональным интеллектом и паттернами \ (стереотипами)\ вашего поведения.
`;
const HIGHT_ANXIETY = `
Высокий уровень тревожности уже сам по себе является крайне неприятным состоянием,\ которое заметно снижает качество жизни.\ Также она может являться симптомом таких заболеваний:\n
\t◉\ агорафобии - боязни находиться в определенных местах;\r
\t◉\ тревожного расстройства, вызванного заболеванием;\r
\t◉\ генерализованного тревожного расстройства;\r
\t◉\ панического расстройства, сопровождающегося паническими атаками;\r
\t◉\ социальной фобии - боязни находиться в социальное среде.\n
Также научно доказано,\ что повышенный уровень тревожности может способствовать развитию или обострению психсоматических и хронических заболеваний:\ язва двенадцатиперстной кишки или желудка;\ гипертония;\ язвенный колит;\ бронхиальная астма;\ нейродермит,\ псориаз;\ ревматоидный артрит;\ гиперфункция щитовидной железы\ (гипертиреоз).\ Поэтому Вам лучше не откладывать визит к психологу.
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
//   const answers = [0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 1, 0, 0, 0, 1, 0, 1, 1, 2, 1];


let currentHandledUserDataFieldName = null;

let currentQuestion = 0;
// let currentQuestion = 20;
let currentAnswer = null;

const htmlRefs = {
    hiddenConfirmForm : document.querySelector('.js-cf7-form.visually-hidden'),
    inputGuestMail : document.querySelector('#guest-email'),
    inputGuestName : document.querySelector('#guest-name'),
    inputGuestTel : document.querySelector('#guest-tel'),
    inputResultToClient : document.querySelector('#result-to-client'),
    inputResultToAdmin : document.querySelector('#result-to-admin'),
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
const getConfirmButtonHTML = text => `<button class="confirmBtn fl-button" type="button">${text}</button>`;

const getUndefinedUserDataKey = () => Object.keys(userData).find(key=>!userData[key]);

function getUserDataForm(userDataKey){
    const input= {
        name : `<label>Ваше Имя<span class="star">*</span><br>
                    <input type="text" name="name" size="40" aria-required="true" aria-invalid="false" required class="js-userDataInput">
                </label>`,
        email : `<label>Введите Ваш Email<span class="star">*</span><br>
                    <input type="email" name="email" size="40" aria-required="true" aria-invalid="false" required class="js-userDataInput">
                </label>`,
        tel :  `<label>Введите номер мобильного<span class="star">*</span><br>
                    <input type="tel" name="tel" value="" size="40" aria-required="1" placeholder="+380 (__) ___-__-__" data-mask="+380 (__) ___-__-__" required class="js-userDataInput">
                </label>`
        // tel: `<input type="tel" name="tel" value="" size="40" aria-required="1" placeholder="+380 (__) ___-__-__" data-mask="+380 (__) ___-__-__" required class="js-userDataInput">`
    }
    
    const html = `${input[userDataKey]}
                    <br/>
                    <button  class="js-userDataButton fl-button">Подтвердить</button>`;
    htmlRefs.userDataForm.innerHTML = html;
}

function getUserData(){

    // const {name, email, tel} = userData;

    let userDataKey = getUndefinedUserDataKey();

    if(!userDataKey) {
        // console.log("User Data", userData);
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
        <span class="js-question__inf">Вопрос
           <b>${1+currentQuestion}</b>
              из
                 <b>${QUESTIONS.length}</b>
                    :
        </span>
        <b class="js-question__question">${QUESTIONS[currentQuestion]}</b>
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
    const currentDate = getLocaleDate('RU-uk');
    const summ = answers.reduce((acc, value) => acc + value, 0);
    const [bref, description] = getResult(summ);

    htmlRefs.arena.innerHTML = '';
    htmlRefs.inputGuestMail.value = userData.email;
    htmlRefs.inputGuestName.value = userData.name;
    htmlRefs.inputGuestTel.value = userData.tel;
    htmlRefs.inputResultToClient.value = getResultToClient();
    htmlRefs.inputResultToAdmin.value = getResultToAdmin();
    htmlRefs.hiddenConfirmForm.classList.remove('visually-hidden');

    function getResultToClient(){        
        return `
        Здравствуйте,\ ${userData.name}!\n
        В ${currentDate},\ Вы проходили тест на определения уровня тревожности в Центре психотерапии СТРУКТУРА.\n
        По результатам данного теста: \n
        Ваша cумма балов:\ ${summ} \ -\ ${bref}.\n
        Это подтверждается средней или сильной выраженностью у Вас следующих симптомов:\n
            ${getSimptoms()}\n
        ${description}
    `;
    }
    function getResultToAdmin(){
        return `
            Тест:\r
            \tДата:\ ${currentDate}\n    
            \tИмя:\ ${userData.name}\n    
            \tТел:\ ${userData.tel}\n
            \tMail:\ ${userData.email}\n
            Результат:\r
            \tCумма балов:\ ${summ} \ -\ ${bref}\n
            Симптомы:\r
            ${getSimptoms()}

        `;
    }
    function getSimptoms(){
        // const A = [0, 2, 1, 3, 1, 3, 1, 2, 0, 2, 3, 1, 3, 2, 1, 1, 3, 2, 0, 2];
        const simptoms = answers.reduce((acc, value, index) =>{
        // if(value >= 2) acc += `<li>${QUESTIONS[index]}</li>`;
        if(value >= 2) acc += `\t➜ ${QUESTIONS[index]}\n`;
            return acc;
        }, "");
        return `${simptoms}`
    }
    function getResult(summ){
        const resultKey = Object.keys(RESULTS).find(num => summ < num );
        const result = RESULTS[resultKey];
        return result;
    }
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