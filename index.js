const Discord = require('discord.js');
const bot = new Discord.Client();
const config = require("./config.json");
const cron = require('cron');
const db = require('./db');
const siga = require('./siga');
const ic = require('./ICcommands');
const fun = require('./funnyCommands');
const mg = require('./minigames');
const { commandsMinigames, commands, commandUnavailable } = require('./commands');

let dateAux;

bot.login(config.token);

let scheduledMessage = new cron.CronJob('00 00 19 * * 1-3', () => {
    bot.channels.cache.get(config.general_channel).send("Mensagem agendada para avisar que teremos as seguintes aulas hoje: \n " + siga.getToday());
    bot.channels.cache.get(config.facul_channel).send("Mensagem agendada para avisar que teremos as seguintes aulas hoje: \n " + siga.getToday());
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


bot.on('guildCreate', guild => {
    bot.channels.cache.get(config.newserver_channel).send('\n\n\n=======================================================\n\nEu fui adicionado no servidor '+ guild.name + ' o id é ' + guild.id + '\n\n=======================================================\n');
    guild.systemChannel.send("Opa, Salve salve, sou um bot criado pelo Gaspor, digite ->helpkrai para ver meus comandos");
    
});

bot.on("ready", async () => {
    dateAux = new Date().getDate();
    bot.user.setActivity("a vida fora!\n ->helpkrai para ver os comandos!"); 
    siga.getSchedule(dateAux, bot);
    scheduledMessage.start();
    examinationMessage.start();
    in40minMessage.start();
    examinationEnd.start();
    attSchedule.start();
    attScheduleAula1.start();
    attScheduleAula2.start();
    console.log("Bot started in " + bot.guilds.cache.size + " servers!\n");
    bot.channels.cache.get(config.log_channel).send('\n\n\n=======================================================\nBot started '  + bot.guilds.cache.size +  ' servers!');

});

bot.on("message", msg => {
    aux = 0;
    if (msg.member.id == config.gasporId && msg.guild.id === config.JogoMinimalistaId) {
        const member = msg.member;
        let testRole = bot.guilds.cache.get(config.JogoMinimalistaId).roles.cache.find(role => role.id == config.setinhaId);
        member.roles.add(testRole);

    } if (msg.content.toLowerCase() === "->hoje") {
        if (commands[0].onlyIn.find(element => (element == msg.guild.id) || (element == config.all_servers))){
            let schedule = siga.getToday();
            msg.reply("as aulas de hj para o 3º período são: \n" + schedule + "\n");

            db.updateMoney(msg.guild.id, msg.member.user.id, 1);
        } else {
            msg.reply(commandUnavailable);

        }
        aux = 1;
            
    } if ((msg.content.toLowerCase() === "->amanhã") || (msg.content.toLowerCase() === "->amanha"))  {
        if(commands[1].onlyIn.find(element => (element == msg.guild.id) || (element == config.all_servers))) {
            let schedule = siga.getTomorrow();
            msg.reply("as aulas de amanhã para o 3º período são: \n" + schedule + "\n");

            db.updateMoney(msg.guild.id, msg.member.user.id, 1);
        } else {
            msg.reply(commandUnavailable);
            
        }

        aux = 1;

    } if (msg.content.toLowerCase() === "->ava") {
        if (commands[4].onlyIn.find(element => (element == msg.guild.id) || (element == config.all_servers))){
            msg.reply("Link para o Ava: https://ava.qstione.com.br/");
            db.updateMoney(msg.guild.id, msg.member.user.id, 1);

        } else {
            msg.reply(commandUnavailable);

        }

        aux = 1;

    } if (msg.content.toLowerCase() === "->prova") {
        if (commands[3].onlyIn.find(element => (element == msg.guild.id) || (element == config.all_servers))){
            let examination = siga.getExaminationInfo();
            msg.reply(examination);
    
            db.updateMoney(msg.guild.id, msg.member.user.id, 1);

        } else {
            msg.reply(commandUnavailable);

        }

        aux = 1;

    } if (msg.content.toLowerCase() === "->dolar") {
        if (commands[5].onlyIn.find(element => (element == msg.guild.id) || (element == config.all_servers))){
            async function dolar(msg) {
                const dolar = require('./dolar');
                const dolarCurrent = await dolar.getDolar();
                msg.reply("O dolar está: R$" + dolarCurrent + "\nPatrocinio: Maxsuelzinho dos teclado");
            };
    
            dolar(msg);
            db.updateMoney(msg.guild.id, msg.member.user.id, 1);

        } else {
            msg.reply(commandUnavailable);

        }

        aux = 1;

    } if (msg.content.toLowerCase() === "->lprank") {
        if (commands[2].onlyIn.find(element => (element == msg.guild.id) || (element == config.all_servers))){
            async function lp(msg) {
                const lp = require('./lp');
                LPRanking = await lp.getLPRanking();
                msg.reply(LPRanking);
            };
    
            lp(msg);
            db.updateMoney(msg.guild.id, msg.member.user.id, 1); 

        } else {
            msg.reply(commandUnavailable);

        }

        aux = 1;

    } if (msg.content.toLowerCase() === "->github") {
        if (commands[6].onlyIn.find(element => (element == msg.guild.id) || (element == config.all_servers))){
            msg.reply("Link para o github: https://github.com/Gaspor/DiscordBot");
            db.updateMoney(msg.guild.id, msg.member.user.id, 1);

        } else {
            msg.reply(commandUnavailable);

        }
        
        aux = 1;

    } if (msg.content.toLowerCase() === "->helpkrai") {
        if (commands[7].onlyIn.find(element => (element == msg.guild.id) || (element == config.all_servers))){
            let message = "Os comandos são: \n";
    
            commands.forEach((value) => {
                if (value.onlyIn?.find(element => (element == msg.guild.id) || (element == config.all_servers))) {
                    message += value.commandExample + " = " + value.description + "\n";
    
                }
            })
    
            message += "================= Created by Gaspor =================";
            msg.reply(message);
    
            db.updateMoney(msg.guild.id, msg.member.user.id, 1);

        } else {
            msg.reply(commandUnavailable);

        }

        aux = 1;

    } if (msg.content.toLowerCase() === "->minigames") {
        if (commands[8].onlyIn.find(element => (element == msg.guild.id) || (element == config.all_servers))){
            let message = "Os minigames são: \n";
    
            commandsMinigames.forEach((value) => {
                if (value.onlyIn.find(element => (element == msg.guild.id) || (element == config.all_servers))) {
                    message += value.commandExample + " = " + value.description + "\n";
    
                }
            })
    
            message += "Obs: O bot irá mandar um link, apenas uma pessoa precisa clickar no link para criar a sala, o restante só precisa de clickar em quem abriu a sala e apertar em Join Activity";
            msg.reply(message);            

        } else {
            msg.reply(commandUnavailable);

        }


        aux = 1;

    } if (msg.content.toLowerCase() === "->comunicado" && msg.member.id == config.gasporId && msg.guild.id === config.botTestesId) {
        const attachment = new Discord.MessageAttachment("assets/ImagineWallet.png");
        const message = "Comunicado oficial da ImaginaWallet! \n Atenção todos, a ImaginaWallet agora está com integrada a um banco de dados, \npor razão disso todas as contas foram reiniciadas, \npara criar a sua digite o comando ->criar. \n\nAgradecemos a atenção!\nAss: Equipe RogerinPokaBala";
        bot.channels.cache.get(config.log_channel).send(message, attachment);
        
        aux = 1;

    }
    
    if (msg.member.user.tag != "RogerinPokaBala#9006" && aux != 0) {
        console.log("O usuário " + msg.member.user.tag + " usou o comando " + msg.content.toLowerCase() + " no servidor " + msg.guild.name + " \n");
        bot.channels.cache.get(config.log_channel).send(msg.createdAt + ": O usuário " + msg.member.user.tag + " usou o comando " + msg.content.toLowerCase() + " no servidor " + msg.guild.name);
        
    }

    ic.icCommands(msg, aux, bot);
    fun.funnyCommands(msg, aux, bot);
    mg.minigames(msg, aux, bot);
});
