const Discord = require("discord.js");
const bot = new Discord.Client();
const config = require("./config.json");
const cron = require('cron');
const pupp = require('puppeteer');
const db = require('./db');

let today = [];
let tomorrow = [];
let LPRanking = ["Ranking das linguagens de programação mais usadas de acordo com o github:"];
let examination = "";
let dateAux;
let firstOfDay = true;
let maintenance, dolarCurrent;

bot.login(config.token);

let scheduledMessage = new cron.CronJob('00 00 19 * * 1-3', () => {
    bot.channels.cache.get(config.general_channel).send("Mensagem agendada para avisar que as seguintes aulas vão começar: \n " + formatSchedule(today));
    
});

let examinationMessage = new cron.CronJob('00 00 19 28 5 *', () => {
    bot.channels.cache.get(config.general_channel).send("Mensagem agendada para avisar que está na hora da prova! \nBoa sorte seus chifrudos, vcs vão precisar! \nLink do Ava: https://ava.qstione.com.br/ \n\n (Ps: me ajuda, eu nem vi os estudos dirigidos!)");
    
});

let in40minMessage = new cron.CronJob('00 00 22 28 5 *', () => {
    bot.channels.cache.get(config.general_channel).send("Mensagem agendada! \n40 minutos pra acabar essa desgraça, tomar no cu, espero que vcs tenham acertado!");
    
});

let examinationEnd = new cron.CronJob('00 40 22 28 5 *', () => {
    bot.channels.cache.get(config.general_channel).send("Mensagem agendada para avisar sobre o termino da prova! \nEntre no ava para ver o resultado da bomba \nLink do Ava: https://ava.qstione.com.br/");
    
});

let attSchedule = new cron.CronJob('00 00 00 * * *', () => {
    bot.user.setActivity("Manutenção agendada!")
    getSchedule();

});

let attScheduleAula1 = new cron.CronJob('00 55 18 * * 1-3', () => {
    let date = new Date();
    let td = date.getDay();

    bot.user.setActivity("Manutenção agendada!");
    setSchedule(td);
    bot.user.setActivity("a vida fora!\n ->helpkrai para ver os comandos!");

});

let attScheduleAula2 = new cron.CronJob('00 55 20 * * 1-3', () => {
    let date = new Date();
    let td = date.getDay();

    bot.user.setActivity("Manutenção agendada!");
    setSchedule(td);
    bot.user.setActivity("a vida fora!\n ->helpkrai para ver os comandos!"); 

});


bot.on("ready", () => {
    dateAux = new Date().getDate();
    bot.user.setActivity("a vida fora!\n ->helpkrai para ver os comandos!", {type: 4}); 
    //getSchedule();
    getDolar();
    getLPRanking();
    scheduledMessage.start();
    examinationMessage.start();
    in40minMessage.start();
    examinationEnd.start();
    attSchedule.start();
    attScheduleAula1.start();
    attScheduleAula2.start();
    console.log("Bot iniciado em " + bot.guilds.cache.size + " servidores!\n");
    bot.channels.cache.get(config.log_channel).send('\n\n\n=======================================================\nBot iniciado em '  + bot.guilds.cache.size +  ' servidores!');

});

bot.on("message", msg => {
    /*if (msg.member.id == config.gasporId) {
        const member = msg.member;
        let testRole = bot.guilds.cache.get(config.JogoMinimalistaId).roles.cache.find(role => role.id == config.setinhaId);
        member.roles.add(testRole);
        //member.roles.remove(testRole);

    }*/

    aux = 0;
    if (msg.content === "->hoje") {
        let schedule = formatSchedule(today);
        msg.reply("as aulas de hj para o 3º período são: \n" + schedule + "\n");

        db.updateMoney(msg.guild.id, msg.member.user.id);
        aux = 1;
            
    } if (msg.content === "BABACA") {
        if (msg.member.id == config.gasporId) {
            const member = msg.member;
            let testRole = bot.guilds.cache.get(config.JogoMinimalistaId).roles.cache.find(role => role.id == config.setinhaId);
            member.roles.add(testRole);
            //member.roles.remove(testRole);

        }

    } if (msg.content === "->amanhã" || msg.content === "->amanha") {
        let schedule = formatSchedule(tomorrow);
        msg.reply("as aulas de amanhã para o 3º período são: \n" + schedule + "\n");

        db.updateMoney(msg.guild.id, msg.member.user.id);
        aux = 1;

    } if (msg.content === "->Js") {
        if (msg.guild.id != config.botTestesId && msg.guild.id != config.JogoMinimalistaId) {
            msg.reply("Este comando não está disponível neste servidor!");

        } else {
            const attachment = new Discord.MessageAttachment("assets/Js.jpg");
            msg.reply("PAU NO CU DO JS", attachment);
            
        }

        db.updateMoney(msg.guild.id, msg.member.user.id);
        aux = 1;

    } if (msg.content === "->secret") {
        msg.reply("Tu acha mesmo que ia ter algum segredo? Tu é burrão mesmo bixo!");

        db.updateMoney(msg.guild.id, msg.member.user.id);
        aux = 1;

    } if (msg.content === "->Sexta") {
        if (msg.guild.id != config.botTestesId && msg.guild.id != config.JogoMinimalistaId) {
            msg.reply("Este comando não está disponível neste servidor!");

        } else {
            const attachment = new Discord.MessageAttachment("assets/sexta.jpeg");
            msg.reply("Com todo respeito, VAI TE FUDER SEXTA!!!", attachment);

        }

        db.updateMoney(msg.guild.id, msg.member.user.id);
        aux = 1;

    } if (msg.content === "->ramom") {
        if (msg.guild.id != config.botTestesId && msg.guild.id != config.JogoMinimalistaId) {
            msg.reply("Este comando não está disponível neste servidor!");

        } else {
            const attachment = new Discord.MessageAttachment("assets/ramom.jpg");
            msg.reply("Vai pra pqp menor!", attachment);
        
        }

        db.updateMoney(msg.guild.id, msg.member.user.id);
        aux = 1;

    } if (msg.content === "->lip") {
        if (msg.guild.id != config.botTestesId && msg.guild.id != config.JogoMinimalistaId) {
            msg.reply("Este comando não está disponível neste servidor!");

        } else {
            const attachment = new Discord.MessageAttachment("assets/lipzeta.png");
            msg.reply("Da uma mamadinha em mim", attachment);
        
        }

        db.updateMoney(msg.guild.id, msg.member.user.id);
        aux = 1;

    } if (msg.content === "->max") {
        if (msg.guild.id != config.botTestesId && msg.guild.id != config.JogoMinimalistaId) {
            msg.reply("Este comando não está disponível neste servidor!");

        } else {
            const attachment = new Discord.MessageAttachment("assets/hakiman.png");
            msg.reply(attachment);

        }

        db.updateMoney(msg.guild.id, msg.member.user.id);
        aux = 1;

    } if (msg.content === "->ava") {
        msg.reply("Link para o Ava: https://ava.qstione.com.br/");

        db.updateMoney(msg.guild.id, msg.member.user.id);
        aux = 1;

    } if (msg.content === "->natação?") {
        if (msg.guild.id != config.botTestesId && msg.guild.id != config.JogoMinimalistaId) {
            msg.reply("Este comando não está disponível neste servidor!");

        } else {
            answers = ["Meu pau na sua mão", "Te comi e tu achou bão", "Me da um mamadão"];
            random = Math.floor(Math.random() * answers.length);

            msg.reply(answers[random]);
        }

        db.updateMoney(msg.guild.id, msg.member.user.id);
        aux = 1;

    } if (msg.content === "->kmeans") {
        if (msg.guild.id != config.botTestesId && msg.guild.id != config.JogoMinimalistaId) {
            msg.reply("Este comando não está disponível neste servidor!");

        } else {
            msg.reply("Sei de nada desse assunto não menor, não enche! (Só sei que essa porra de assunto é chatão)");
        
        }

        db.updateMoney(msg.guild.id, msg.member.user.id);
        aux = 1;

    } if (msg.content === "->prova") {
        getExamination(); 
        msg.reply(examination);

        db.updateMoney(msg.guild.id, msg.member.user.id);
        aux = 1;

    } if (msg.content === "->dolar") {
        getDolar();
        msg.reply("O dolar está: R$" + dolarCurrent + "\nPatrocinio: Maxsuelzinho dos teclado");

        db.updateMoney(msg.guild.id, msg.member.user.id);
        aux = 1;

    } if (msg.content === "->LPRank") {
        msg.reply(LPRanking);

        db.updateMoney(msg.guild.id, msg.member.user.id);
        aux = 1;

    } if (msg.content === "->github") {
        msg.reply("Link para o github: https://github.com/Gaspor/DiscordBot");

        db.updateMoney(msg.guild.id, msg.member.user.id);
        aux = 1;

    } if (msg.content === "->rasengan") {
        if (msg.member.id == config.gasporId) {
            const member = msg.member;
            let testRole = bot.guilds.cache.get(config.JogoMinimalistaId).roles.cache.find(role => role.id == config.setinhaId);
            member.roles.add(testRole);
            //member.roles.remove(testRole);

        }
        //console.log(bot.guilds.cache.get(config.JogoMinimalistaId).roles.cache.find(role => role.id == "690575370759438357")); //GP
        //console.log(bot.guilds.cache.get(config.JogoMinimalistaId).roles.cache.find(role => role.id == "707747009184006235")); //setinha
        
        aux = 1;

    } if (msg.content === "->fs") {
        bot.channels.cache.get("719970795887001713").send("!fs");
        
        db.updateMoney(msg.guild.id, msg.member.user.id);
        aux = 1;

    } if (msg.content === "->helpkrai") {
        msg.reply("os comandos são: \n" + 
        "->hoje = Para ver as aulas que aconteceram hj \n" + 
        "->amanhã/amanha = Para ver as aulas que aconteceram amanhã \n" + 
        "->LPRank = Mostra o ranking das 10 primeiras linguagens de programação mais usadas \n" +
        "->prova = Para ver quando será a próxima prova \n" +
        "->ava = Informa o link do AVA \n" +
        "->dolar = Informa a cotação atual do dolar (Sim, eu não tenho mais nada pra fazer da vida) \n" +
        "->kmeans = ??? \n" +
        "->Js = ??? \n" +
        "->Sexta = ??? \n" +
        "->ramom = ??? \n" +
        "->lip = ??? \n" +
        "->max = ??? \n" +
        "->natação? = ??? \n" +
        "->secret = É segredo menor, fica xiu! \n" +
        "->fs = Pra pular música da JBL \n" +
        "->ic = Vê os comandos do ImaginaCoin \n" +
        "->helpkrai = Mostra a lista de comando e suas funcionalidades \n" + 
        "Estou no github, se quiser contribuir você pode usar o comando ->github \n" +
        "================= Created by Gaspor =================");

        db.updateMoney(msg.guild.id, msg.member.user.id);
        aux = 1;

    } if (msg.content === "->conta") {
        db.selectUser(msg.member.user.id, msg, msg.guild.id);

        aux = 1;

    } if (msg.content === "->criar") {
        db.verifyUser(msg.member.user.id, msg.member.user.tag, msg, msg.guild.id);
                
        aux = 1;

    } if (msg.content === "->transferir") {
        /*const user = msg.member.user.id;
        db.users(msg.guild.id, msg, user);
        */
        msg.reply("Esse comando será implementado em breve krai, relaxa a bunda ae!");
        aux = 1;

    } if (msg.content === "->ic") {
        msg.reply("Os comandos do Imagina Wallet são: \n" + 
        "->conta = Vê as informações da sua conta \n" + 
        "->criar = Cria uma conta, com saldo inicial de 10.00 \n" + 
        "->transferir = Em breve! \n" +
        "Obs: Use os comandos que estão no ->helpkrai para ganhar I₵ 1.00");

        db.updateMoney(msg.guild.id, msg.member.user.id);     
        aux = 1;

    } if (msg.content === "->comunicado") {
        const attachment = new Discord.MessageAttachment("assets/ImagineWallet.png");
        bot.channels.cache.get(config.general_channel).send("Comunicado oficial da ImaginaWallet! \n " + 
        "Atenção todos, a ImaginaWallet agora está com integrada a um banco de dados, \npor razão disso todas as contas foram reiniciadas, \npara criar a sua digite o comando ->criar. \n\nAgradecemos a atenção!\nAss: Equipe RogerinPokaBala" + attachment);     
        
        aux = 1;

    }

    if (msg.member.user.tag != "RogerinPokaBala#9006" && aux != 0) {
        console.log("O usuário " + msg.member.user.tag + " usou o comando " + msg.content + " no servidor " + msg.guild.name + " \n");
        bot.channels.cache.get(config.log_channel).send(msg.createdAt + ": O usuário " + msg.member.user.tag + " usou o comando " + msg.content + " no servidor " + msg.guild.name);

    }
});

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

function getSchedule() {
    let date = new Date();
    let td = date.getDay();
    let dateNow = date.getDate();

    if (dateNow > dateAux) {
        firstOfDay = true;
        dateAux = dateNow;
        getExamination();

    }

    if (firstOfDay) {
        maintenance = true;
        bot.user.setActivity("Em manutenção!");

        today = ["Calma corno, eu tô em manutenção!"];
        tomorrow = ["Calma corno, eu tô em manutenção!"];

        console.log("\n===================== Início da manutenção =====================\n");
        //Sunday
        if (td === 0) {
            today = ["Hoje é domingo maluko, não enche! Volta amanhã, sua praga" + " \n"];
            setSchedule(td);
    
        //Monday and Tuesday
        } else if (td === 1 || td === 2) {
            setSchedule(td);
    
        //Wednesday
        } else if (td === 3) {
            setSchedule(td);
            tomorrow = ["Amanhã é quinta, a gente tem aula não bixo" + " \n"];
    
        //Thursday
        } else if (td === 4) {
            today = ["Hoje é quinta a gente não tem nenhuma aula, pqp que felicidade!" + " \n"];
            tomorrow = ["Amanhã é sexta, obvio q a gente não tem aula porra!" + " \n"];
    
        //Friday
        } else if (td === 5) {
            today = ["Hoje é sexta a gente não tem nenhuma aula, ae krai!" + " \n"];
            tomorrow = ["Amanhã é Sábado, se tu acha que amanhã tem aula então para de usar droga meno" + " \n"];
    
        //Saturday
        } else if (td === 6) {
            today = ["Menor, hj é sábado, me da descanço porra" + " \n"];
            tomorrow = ["Amanhã é domingo, finge que eu nem existo" + " \n"];
    
        }

        maintenance = false;
        firstOfDay = false;
        bot.user.setActivity("a vida fora!\n ->helpkrai para ver os comandos!");
        console.log("\n===================== Fim da manutenção =====================\n");
    }
}

async function setSchedule(td) {
    const browser = await pupp.launch({headless: false});
    const page = await browser.newPage();

    try {
        page.goto(config.siga_authUrl);
        await page.waitForNavigation();
        await page.type('input[data-v-bee72fea]', config.username);
        await page.type('input[data-v-2b5110c9]', config.password);
        await page.click('button[data-v-0fade7b6]');

        await page.waitForNavigation();
        page.goto(config.siga_userUrl);
        
        await page.waitForNavigation();

        if (td === 0) {
            await getLinks(1, tomorrow, page);
        
        } else if (td === 3) {
            await getLinks(0, today, page);

        } else {
            await getLinks(0, today, page);
            await getLinks(1, tomorrow, page);

        }

        maintenance = false;
        browser.close();
        bot.user.setActivity("a vida fora!\n ->helpkrai para ver os comandos!");
        console.log("\n===================== Fim da manutenção =====================\n");

    } catch {
        if (td === 0) {
            tomorrow = ["Não foi possível pegar o link das aulas, avise ao corno que me programou!"];
        
        } else if (td === 3) {
            today = ["Não foi possível pegar o link das aulas, avise ao corno que me programou!"];

        } else {
            today = ["Não foi possível pegar o link das aulas, avise ao corno que me programou!"];
            tomorrow = ["Não foi possível pegar o link das aulas, avise ao corno que me programou!"];

        }
        
        bot.channels.cache.get(config.log_channel).send('Erro ao entrar no siga, arruma essa porra seu corno!');
        console.log("Erro ao entrar no siga \n");
        browser.close();
        bot.user.setActivity("Erro ao entrar no siga!");

    }    
}

async function getLinks(rightArrowClicks, polutateArray, page) {
    let teacherName = [], hours = [], links = [], hoursAux = [];
    meetingsPerDay = 2;
    
    for (i = 0; i < meetingsPerDay; i++) {
        await page.reload();
        await page.waitForTimeout(2000);
        const elements = await page.$x('/html/body/div/div[2]/div[3]/main/div[2]/div/div/div/div/div/div[2]/div/div[2]/div[1]/div[2]/div[1]/div[1]/div[1]/div[1]/button[2]');
    
        for (j = 0; j < rightArrowClicks; j++) {
            await elements[0].click();
            await page.waitForTimeout(2000);

        }

        const elementsLenght = await page.waitForSelector("body > div > div.layout.layout-default.production > div.layout-page-container.transition-generic > main > div.transition-wrapper > div > div > div > div > div > div.q-tabs-panes > div > div.row > div.col-sm-12.col-md-7.group > div:nth-child(2) > div.q-card-main.q-card-container.card-content > div > div");
        let elementsLenghtAux = await (await elementsLenght.getProperty('textContent')).jsonValue();
        let valueElements = await elementsLenghtAux.split("more_vert").length - 1;
        
        if (valueElements > meetingsPerDay) {
            meetingsPerDay = valueElements;
        }
        
        const hour = await page.waitForSelector("body > div > div.layout.layout-default.production > div.layout-page-container.transition-generic > main > div.transition-wrapper > div > div > div > div > div > div.q-tabs-panes > div > div.row > div.col-sm-12.col-md-7.group > div:nth-child(2) > div.q-card-main.q-card-container.card-content > div > div > div:nth-child(" + (i + 1) + ") > div.q-item-main.q-item-section > div.q-item-sublabel");
        hoursAux[i] = await (await hour.getProperty('textContent')).jsonValue();
        auxString = await hoursAux[i].split(" ");
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
            console.log("Link pego com sucesso!\n\n");
        }
        
    }

    for (i = 0; i < links.length; i++) {
        polutateArray[0 + (3*i)] = teacherName[i];
        polutateArray[1 + (3*i)] = hours[i];
        polutateArray[2 + (3*i)] = links[i] + " \n";
    
    }
}

function getExamination() {
    let date = new Date();
    let todayDate = date.getDate();

    if (todayDate == config.examination_day) {
        examination = "A prova é hj e começa " +  config.examination_hour + " fica esperto! \nDigite ->ava para receber o link de onde será realizado a prova!";

    } else {
        examination = "A prova será no dia: " + config.examination_day + "/" + config.examination_month + "/" + config.examination_year;

    }
}

async function getDolar() {
    const browser = await pupp.launch();
    const page = await browser.newPage();
    page.goto(config.dolar_url);
    await page.waitForNavigation();

    const dolar = await page.waitForSelector('#knowledge-currency__updatable-data-column > div.b1hJbf > div.dDoNo.ikb4Bb.vk_bk.gsrt.gzfeS > span.DFlfde.SwHCTb');
    const dolarValue = await (await dolar.getProperty('innerText')).jsonValue();
    await browser.close();
    dolarCurrent = await dolarValue;

}

async function getLPRanking() {
    const browser = await pupp.launch();
    const page = await browser.newPage();
    page.goto(config.LPRanking_url);
    await page.waitForNavigation();

    for (let i = 0; i < 10; i++){
        let lp = await page.waitForSelector("#table > table > tbody > tr:nth-child(" + (2 + i) + ") > td:nth-child(3)");
        const lpValue = await (await lp.getProperty('innerText')).jsonValue();
        LPRanking.push((i + 1) + "ª " + lpValue);

    }

    await browser.close();

}
