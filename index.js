const QUESTIONS = [
    "Відчуття оніміння та поколювання в тілі.",
    "Відчуття жару.",
    "Тремтіння в ногах, мимовільні рухи ногами.",
    "Неможливість розслабитись.",
    "Страх, що станеться найгірше.",
    "Запаморочення або затьмарена свідомість.",
    "Прискорене серцебиття.",
    "Нестабільність, неврівноваженість.",
    "Відчуття паніки і страху.",
    "Дратівливість.",
    "Відчуття задухи.",
    "Тремтіння в руках.",
    "Слабкість і/або «ватні ноги».",
    "Страх втрати самоконтролю.",
    "Труднощі з диханням.",
    "Страх смерті.",
    "Переляк.",
    "Шлунково-кишкові розлади (відчуття дискомфорту у животі).",
    "Відчуття непритомності.",
    "Прилив крові до обличчя.",
    "Холодний піт."
];
const VARIANTS = [
    "Зовсім не турбує",
    "Трохи турбує (не дуже турбує)",
    "Іноді турбує (це було дуже неприємно, але я впорався/лася з цим)",
    "Дуже турбує (насилу впорався/лася з цим)"
];
const LOW_ANXIETY = `
Надто низька тривога може вказувати на те,\ що ви відірвані від себе,\ інших чи свого оточення.\ Підтвердженням цього припущення можуть бути проблеми з тиском,\ сном або системою травлення.\ Іншими свідченнями емоційної відокремленості є:\n
\t◉\ незадоволеність особистими взаємовідносинами;\r
\t◉\ труднощі розуміння чого вам хочеться;\r
\t◉\ проблеми із отриманням задоволення;\r
\t◉\ часте відсутність відчуття радості та задоволення.\n
В даному випадку дуже корисною та результативною стане робота з емоційним інтелектом \ (відчуттям та проживанням емоцій).\ Вона дозволить знову віднайти радість життя і значно покращити стосунки з сім'єю та оточенням.
`;
const MEDIUM_ANXIETY = `
Середній рівень тривожності вказує на те,\ що у Вас є:\n
\t◉\ схильність до сприйняття широкого кола ситуацій як загрозливих для своєї самооцінки,\ престижу,\ самоповаги чи життєдіяльності;\r
\t◉\ схильність реагувати на такі ситуації станом тривоги;\r
\t◉\ чутливість щодо тих негативних подій чи невдач,\ які ймовірно можуть статися чи відбутися.\n
Тривога може стати перепоною на шляху професійного та кар'єрного зростання,\ «скляною стелею»,\ яку подолати не виходить.\ У цьому випадку можна працювати у форматі коучінга з установками,\ емоційним інтелектом та патернами \ (стереотипами)\ вашої поведінки.
`;
const HIGHT_ANXIETY = `
Високий рівень тривожності є вкрай неприємним станом,\ який помітно знижує якість життя.\ Також тривога може бути симптомом таких захворювань:\n
\t◉\ агорафобії – страх перебування у певних місцях;\r
\t◉\ тривожного розладу, спричиненого захворюванням;\r
\t◉\ генералізованого тривожного розладу;\r
\t◉\ панічного розладу, що супроводжується панічними атаками;\r
\t◉\ соціальної фобії – страх перебування у соціальному середовищі.\n
Також науково доведено,\ що підвищений рівень тривожності може сприяти розвитку чи загостренню психоматичних та хронічних захворювань:\ виразка дванадцятипалої кишки чи шлунка;\ гіпертонія;\ виразковий коліт;\ бронхіальна астма;\ нейродерміт,\ псоріаз;\ ревматоїдний артрит;\ гіперфункція щитовидної залози\ (гіпертиреоз).\ Тому вам краще не відкладати візит до психолога.
`;
const RESULTS = {
    10 : ["симптоми тривоги відсутні",""],
    19 : ["низький рівень тривоги",LOW_ANXIETY],
    30 : ["середній рівень тривоги",MEDIUM_ANXIETY],
    64 : ["високий рівень тривоги",HIGHT_ANXIETY]
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
        name : `<label>Ваше Им\`я<span class="star">*</span><br>
                    <input type="text" name="name" size="40" aria-required="true" aria-invalid="false" required class="js-userDataInput">
                </label>`,
        email : `<label>Введіть Ваш Email<span class="star">*</span><br>
                    <input type="email" name="email" size="40" aria-required="true" aria-invalid="false" required class="js-userDataInput">
                </label>`,
        tel :  `<label>Введіть номер мобільного<span class="star">*</span><br>
                    <input type="tel" name="tel" value="" size="40" aria-required="1" placeholder="+380 (__) ___-__-__" data-mask="+380 (__) ___-__-__" required class="js-userDataInput">
                </label>`
        // tel: `<input type="tel" name="tel" value="" size="40" aria-required="1" placeholder="+380 (__) ___-__-__" data-mask="+380 (__) ___-__-__" required class="js-userDataInput">`
    }
    
    const html = `${input[userDataKey]}
                    <br/>
                    <button  class="js-userDataButton fl-button">Підтвердити</button>`;
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
        <span class="js-question__inf">Питання
           <b>${1+currentQuestion}</b>
              із
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
    
    htmlRefs.buttons.innerHTML = getConfirmButtonHTML("Підтвердити");
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
    const currentDate = getLocaleDate('UK-uk');
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
        Добрий день,\ ${userData.name}!\n
        У ${currentDate},\ Ви проходили тест на визначення рівня тривожності у Центрі психотерапії СТРУКТУРА.\n
        За результатами цього тесту: \n
        Ваша сума балів:\ ${summ} \ -\ ${bref}.\n
        Це підтверджується середньо або сильно вираженими симптомами у Вас, таких як:\n
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