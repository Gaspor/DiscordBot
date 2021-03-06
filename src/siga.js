const pupp = require('puppeteer');
const pupUtils = require("./commands");
let bot;

let today = [];
let tomorrow = [];
let examination = "";
let firstOfDay = true;
let maintenance = true;

function formatSchedule(Array) {
    let schedule = "";

    for (let i = 0; i < Array.length; i++) {
        let aux = 0;
        if ((i + 1) % 3 === 1) {
            aux = 0;

        } else if ((i + 1) % 3 === 2) {
            aux = 1;

        } else if ((i + 1) % 3 === 3) {
            aux = 2;

        }

        if (aux === 0) {
            schedule += Array[i];

        } else if (aux === 1) {
            schedule += " (" + Array[i] + "): \n";

        } else if (aux === 2) {
            schedule += Array[i] + " \n";

        }
    }

    return schedule;
}

function getSchedule(dateAux, myBot) {
    bot = myBot;
    let date = new Date();
    let td = date.getDay();
    let dateNow = date.getDate();
    let inVacation;

    if ((date.getMonth() + 1 >= process.env.vacation_month && date.getDate() >= process.env.vacation_day) || (date.getMonth() + 1 > process.env.vacation_month)) {
        inVacation = false;
    
    } else {
        inVacation = true;
        examination = "Não sei, tô de férias";
        today = "Menor, eu tô de férias, me pergunta sobre aula não, faz favor!";
        tomorrow = "Eu tô de férias, F-É-R-I-A-S, me deixa em paz!";

    }

    if (dateNow > dateAux && !inVacation) {
        firstOfDay = true;
        dateAux = dateNow;
        getExamination();

    }

    if (firstOfDay && !inVacation) {
        maintenance = true;
        console.log("\n===================== Start of Maintenance =====================\n");
        
        bot.user.setActivity("Em manutenção!");
        today = ["Calma corno, eu tô em manutenção!"];
        tomorrow = ["Calma corno, eu tô em manutenção!"];
        
        //Sunday
        if (td === 0) {
            today = ["Hoje é domingo maluko, não enche! Volta amanhã, sua praga" + " \n"];
            getInfoOnlyTomorrow(td);
    
        //Monday and Tuesday
        } else if (td === 1 || td === 2) {
            getInfo(td);
    
        //Wednesday
        } else if (td === 3) {
            getInfoOnlyToday(td);

            tomorrow = ["Amanhã é quinta, a gente tem aula não bixo" + " \n"];
    
        //Thursday
        } else if (td === 4) {
            today = ["Hoje é quinta a gente não tem nenhuma aula, pqp que felicidade!" + " \n"];
            tomorrow = ["Amanhã é sexta, obvio q a gente não tem aula porra!" + " \n"];
            maintenance = false;
    
        //Friday
        } else if (td === 5) {
            today = ["Hoje é sexta a gente não tem nenhuma aula, ae krai!" + " \n"];
            tomorrow = ["Amanhã é Sábado, se tu acha que amanhã tem aula então para de usar droga meno" + " \n"];
            maintenance = false;
    
        //Saturday
        } else if (td === 6) {
            today = ["Menor, hj é sábado, me da descanço porra" + " \n"];
            tomorrow = ["Amanhã é domingo, finge que eu nem existo" + " \n"];
            maintenance = false;
        }

        firstOfDay = false;

        if (!maintenance){
            bot.user.setActivity("a vida fora!\n ->helpkrai para ver os comandos!");
            console.log("\n===================== End of Maintenance =====================\n");

        }
    }
}

async function setSchedule(td) {
    const browser = await pupp.launch(pupUtils.chromeOptions);
    const page = await browser.newPage();

    try {
        page.goto(process.env.siga_authUrl);
        await page.waitForNavigation();
        await page.type('input[data-v-bee72fea]', process.env.username);
        await page.type('input[data-v-2b5110c9]', process.env.password);
        await page.click('button[data-v-0fade7b6]');

        await page.waitForNavigation();
        page.goto(process.env.siga_userUrl);
        
        await page.waitForNavigation();

        if (td === 0) {
            await getLinks(1, tomorrow, page);
        
        } else if (td === 4) {
            await getLinks(0, today, page);

        } else {
            await getLinks(0, today, page);
            await getLinks(1, tomorrow, page);

        }

        bot.user.setActivity("a vida fora!\n ->helpkrai para ver os comandos!");
        console.log("\n===================== End of Maintenance =====================\n");
        maintenance = false;
        browser.close();

    } catch {
        if (td === 0) {
            tomorrow = ["Não foi possível pegar o link das aulas, avise ao corno que me programou!"];
        
        } else if (td === 3) {
            today = ["Não foi possível pegar o link das aulas, avise ao corno que me programou!"];

        } else {
            today = ["Não foi possível pegar o link das aulas, avise ao corno que me programou!"];
            tomorrow = ["Não foi possível pegar o link das aulas, avise ao corno que me programou!"];

        }
        
        browser.close();
        bot.channels.cache.get(process.env.LOG_CHANNEL).send('Erro ao entrar no siga, arruma essa porra seu corno!');
        bot.user.setActivity("Erro ao entrar no siga!");
        console.log("ERROR: SIGA ERROR \n");

    }    
}

async function getLinks(rightArrowClicks, populateArray, page) {
    let teacherName = [], hours = [], links = [], hoursAux = [];
    let meetingsPerDay = 1;
    
    for (let i = 0; i < meetingsPerDay; i++) {
        await page.reload();
        await page.waitForTimeout(2000);
        const elements = await page.$x('/html/body/div/div[2]/div[3]/main/div[2]/div/div/div/div/div/div[2]/div/div[2]/div[1]/div[2]/div[1]/div[1]/div[1]/div[1]/button[2]');
    
        for (let j = 0; j < rightArrowClicks; j++) {
            await elements[0].click();
            await page.waitForTimeout(2000);

        }

        const elementsLenght = await page.waitForSelector("body > div > div.layout.layout-default.production > div.layout-page-container.transition-generic > main > div.transition-wrapper > div > div > div > div > div > div.q-tabs-panes > div > div.row > div.col-sm-12.col-md-7.group > div:nth-child(2) > div.q-card-main.q-card-container.card-content > div > div");
        let elementsLenghtAux = await (await elementsLenght.getProperty('textContent')).jsonValue();
        let valueElements = await elementsLenghtAux.split("more_vert").length - 1;

        if (valueElements < 1) {
            populateArray[0] = ["Não teremos aulas hoje!"];
            return;
        }
        
        if (valueElements > meetingsPerDay) {
            meetingsPerDay = valueElements;
        }
        
        const hour = await page.waitForSelector("body > div > div.layout.layout-default.production > div.layout-page-container.transition-generic > main > div.transition-wrapper > div > div > div > div > div > div.q-tabs-panes > div > div.row > div.col-sm-12.col-md-7.group > div:nth-child(2) > div.q-card-main.q-card-container.card-content > div > div > div:nth-child(" + (i + 1) + ") > div.q-item-main.q-item-section > div.q-item-sublabel");
        hoursAux[i] = await (await hour.getProperty('textContent')).jsonValue();
        const auxString = await hoursAux[i].split(" ");
        hoursAux[i] = await auxString[1].replace(".", "");
        console.log(hoursAux[i]);
        
        if (hoursAux[i] === "19:00" || hoursAux[i] === "21:00" || hoursAux[i] === "21:50") {
            const teacher = await page.waitForSelector("body > div > div.layout.layout-default.production > div.layout-page-container.transition-generic > main > div.transition-wrapper > div > div > div > div > div > div.q-tabs-panes > div > div.row > div.col-sm-12.col-md-7.group > div:nth-child(2) > div.q-card-main.q-card-container.card-content > div > div > div:nth-child(" + (i + 1) + ") > div.q-item-main.q-item-section > div.q-item-label");
            teacherName.push(await (await teacher.getProperty('textContent')).jsonValue());
            hours.push(hoursAux[i]);

            try {
                await page.waitForTimeout(2000);
                await page.click("body > div > div.layout.layout-default.production > div.layout-page-container.transition-generic > main > div.transition-wrapper > div > div > div > div > div > div.q-tabs-panes > div > div.row > div.col-sm-12.col-md-7.group > div:nth-child(2) > div.q-card-main.q-card-container.card-content > div > div > div:nth-child(" + (i + 1) + ") > div.q-item-main.q-item-section > div.q-item-sublabel");
                
                const hrefs = await page.waitForSelector('body > div > div.layout.layout-default.production > div.layout-page-container.transition-generic > main > div.transition-wrapper > div > div > div > div.q-card-main.q-card-container.q-card--main > div > div.app-form > div > div.field-base.field.has-100.field-html > div:nth-child(2) > div > a', {timeout: 2000});
                links.push(await (await hrefs.getProperty('href')).jsonValue());
                await page.goBack();

            } catch {
                links.push("Ainda sem link para essa aula!");
                await page.reload();

            }
            
            //console.log(teacherName.pop() + " (" + hours.pop() + "): " + links.pop() + " \n");
            console.log("SUCESS: This link was taken!\n\n");
        }
    }

    for (let i = 0; i < links.length; i++) {
        populateArray[0 + (3*i)] = teacherName[i];
        populateArray[1 + (3*i)] = hours[i];
        populateArray[2 + (3*i)] = links[i] + " \n";
    
    }
}

function getExamination() {
    let date = new Date();
    let todayDate = date.getDate();

    if (todayDate == process.env.examination_day) {
        examination = "A prova é hj e começa " +  process.env.examination_hour + " fica esperto que vai ser presencial! \n";

    } else {
        examination = "A prova será no dia: " + process.env.examination_day + "/" + process.env.examination_month + "/" + process.env.examination_year;

    }

    return examination;
}

function getExaminationInfo() {
    examination = getExamination();
    return examination;
}

function getToday(){
    return today;
}

function getTomorrow(){
    return tomorrow;
}

async function getInfoOnlyTomorrow(td){
    await setSchedule(td);
    tomorrow = formatSchedule(tomorrow);

}

async function getInfo(td){
    await setSchedule(td);
    today = formatSchedule(today);
    tomorrow = formatSchedule(tomorrow);

}

async function getInfoOnlyToday(td){
    await setSchedule(td);
    today = formatSchedule(today);
    //tomorrow = formatSchedule(tomorrow);

}


module.exports = {getSchedule, setSchedule, getExaminationInfo, getToday, getTomorrow};