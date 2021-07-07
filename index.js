const Discord = require("discord.js");
const bot = new Discord.Client();
const config = require("./config.json");
const cron = require('cron');
const db = require('./db');
const siga = require('./siga');
const ic = require('./ICcommands');
const fun = require('./funnyCommands');

let dateAux;

bot.login(config.token);

let scheduledMessage = new cron.CronJob('00 02 19 * * 1-3', () => {
    bot.channels.cache.get(config.general_channel).send("Mensagem agendada para avisar que as seguintes aulas vão começar: \n " + siga.getToday());
    
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
    siga.getSchedule(dateAux, bot);

});

let attScheduleAula1 = new cron.CronJob('00 55 18 * * 1-3', () => {
    let date = new Date();
    let td = date.getDay();

    bot.user.setActivity("Manutenção agendada!");
    siga.setSchedule(td);
    bot.user.setActivity("a vida fora!\n ->helpkrai para ver os comandos!");

});

let attScheduleAula2 = new cron.CronJob('00 55 20 * * 1-3', () => {
    let date = new Date();
    let td = date.getDay();

    bot.user.setActivity("Manutenção agendada!");
    siga.setSchedule(td); 

});


bot.on("ready", () => {
    dateAux = new Date().getDate();
    bot.user.setActivity("a vida fora!\n ->helpkrai para ver os comandos!"); 
    siga.getSchedule(dateAux, bot);
    scheduledMessage.start();
    examinationMessage.start();
    in40minMessage.start();
    examinationEnd.start();
    attSchedule.start();
    //attScheduleAula1.start();
    //attScheduleAula2.start();
    console.log("Bot started in " + bot.guilds.cache.size + " servers!\n");
    bot.channels.cache.get(config.log_channel).send('\n\n\n=======================================================\nBot started '  + bot.guilds.cache.size +  ' servers!');

});

bot.on("message", msg => {
    aux = 0;
    
    if (msg.member.id == config.gasporId && msg.guild.id === config.JogoMinimalistaId) {
        const member = msg.member;
        let testRole = bot.guilds.cache.get(config.JogoMinimalistaId).roles.cache.find(role => role.id == config.setinhaId);
        member.roles.add(testRole);

    } if (msg.content === "->hoje") {
        let schedule = siga.getToday();
        msg.reply("as aulas de hj para o 3º período são: \n" + schedule + "\n");

        db.updateMoney(msg.guild.id, msg.member.user.id, 1);
        aux = 1;
            
    } if (msg.content === "->amanhã" || msg.content === "->amanha") {
        let schedule = siga.getTomorrow();
        msg.reply("as aulas de amanhã para o 3º período são: \n" + schedule + "\n");

        db.updateMoney(msg.guild.id, msg.member.user.id, 1);
        aux = 1;

    } if (msg.content === "->ava") {
        msg.reply("Link para o Ava: https://ava.qstione.com.br/");

        db.updateMoney(msg.guild.id, msg.member.user.id, 1);
        aux = 1;

    } if (msg.content === "->prova") {
        let examination = siga.getExaminationInfo();
        msg.reply(examination);

        db.updateMoney(msg.guild.id, msg.member.user.id, 1);
        aux = 1;

    } if (msg.content === "->dolar") {
        async function dolar(msg) {
            const dolar = require('./dolar');
            const dolarCurrent = await dolar.getDolar();
            msg.reply("O dolar está: R$" + dolarCurrent + "\nPatrocinio: Maxsuelzinho dos teclado");
        };

        dolar(msg);
        db.updateMoney(msg.guild.id, msg.member.user.id, 1);
        aux = 1;

    } if (msg.content === "->LPRank") {
        async function lp(msg) {
            const lp = require('./lp');
            LPRanking = await lp.getLPRanking();
            msg.reply(LPRanking);
        };

        lp(msg);

        db.updateMoney(msg.guild.id, msg.member.user.id, 1);
        aux = 1;

    } if (msg.content === "->github") {
        msg.reply("Link para o github: https://github.com/Gaspor/DiscordBot");

        db.updateMoney(msg.guild.id, msg.member.user.id, 1);
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
        "->ic = Vê os comandos do ImaginaCoin \n" +
        "->helpkrai = Mostra a lista de comando e suas funcionalidades \n" + 
        "Estou no github, se quiser contribuir você pode usar o comando ->github \n" +
        "================= Created by Gaspor =================");

        db.updateMoney(msg.guild.id, msg.member.user.id, 1);
        aux = 1;

    } if (msg.content === "->comunicado") {
        const attachment = new Discord.MessageAttachment("assets/ImagineWallet.png");
        const message = "Comunicado oficial da ImaginaWallet! \n Atenção todos, a ImaginaWallet agora está com integrada a um banco de dados, \npor razão disso todas as contas foram reiniciadas, \npara criar a sua digite o comando ->criar. \n\nAgradecemos a atenção!\nAss: Equipe RogerinPokaBala";
        bot.channels.cache.get(config.log_channel).send(message, attachment);
        
        aux = 1;

    }

    ic.icCommands(msg, aux);
    fun.funnyCommands(msg, aux);

    if (msg.member.user.tag != "RogerinPokaBala#9006" && aux != 0) {
        console.log("O usuário " + msg.member.user.tag + " usou o comando " + msg.content + " no servidor " + msg.guild.name + " \n");
        bot.channels.cache.get(config.log_channel).send(msg.createdAt + ": O usuário " + msg.member.user.tag + " usou o comando " + msg.content + " no servidor " + msg.guild.name);

    }
});
