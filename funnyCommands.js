const db = require('./db');
const Discord = require("discord.js");
const { commands, commandUnavailable } = require('./commands');

require('dotenv').config();

function funnyCommands(msg, commandUsed, bot){
    commandUsed = false;

    if (msg.content.toLowerCase() === "->js") {
        if (commands[10].onlyIn.find(element => (element == msg.guild.id) || (element == process.env.ALL_SERVERS))){
            const attachment = new Discord.MessageAttachment("assets/Js.jpg");
            
            msg.reply("PAU NO CU DO JS", attachment);
            db.updateMoney(msg.guild.id, msg.member.user.id, 1);

        } else {
            msg.reply(commandUnavailable);

        }
        
        commandUsed = true;

    } if (msg.content.toLowerCase() === "->secret") {
        if (commands[9].onlyIn.find(element => (element == msg.guild.id) || (element == process.env.ALL_SERVERS))){
            msg.reply("Tu acha mesmo que ia ter algum segredo? Tu é burrão mesmo bixo!");
            db.updateMoney(msg.guild.id, msg.member.user.id, 1);

        } else {
            msg.reply(commandUnavailable);

        }

        commandUsed = true;

    } if (msg.content.toLowerCase() === "->sexta") {
        if (commands[11].onlyIn.find(element => (element == msg.guild.id) || (element == process.env.ALL_SERVERS))){
            const attachment = new Discord.MessageAttachment("assets/sexta.jpeg");
            msg.reply("Com todo respeito, VAI TE FUDER SEXTA!!!", attachment);
            db.updateMoney(msg.guild.id, msg.member.user.id, 1);

        } else {
            msg.reply(commandUnavailable);

        }

        commandUsed = true;

    } if (msg.content.toLowerCase() === "->ramom") {
        if (commands[13].onlyIn.find(element => (element == msg.guild.id) || (element == process.env.ALL_SERVERS))){
            const attachment = new Discord.MessageAttachment("assets/ramom.jpg");
            msg.reply("Vai pra pqp menor!", attachment);

            db.updateMoney(msg.guild.id, msg.member.user.id, 1);

        } else {
            msg.reply(commandUnavailable);

        }

        commandUsed = true;

    } if (msg.content.toLowerCase() === "->lip") {
        if (commands[12].onlyIn.find(element => (element == msg.guild.id) || (element == process.env.ALL_SERVERS))){
            const attachment = new Discord.MessageAttachment("assets/lipzera.png");
            msg.reply("Da uma mamadinha em mim", attachment);

            db.updateMoney(msg.guild.id, msg.member.user.id, 1);

        } else {
            msg.reply(commandUnavailable);

        }

        commandUsed = true;

    } if (msg.content.toLowerCase() === "->max") {
        if (commands[14].onlyIn.find(element => (element == msg.guild.id) || (element == process.env.ALL_SERVERS))){
            const attachment = new Discord.MessageAttachment("assets/hakiman.png");
            msg.reply(attachment);

            db.updateMoney(msg.guild.id, msg.member.user.id, 1);

        } else {
            msg.reply(commandUnavailable);

        }

        commandUsed = true;

    } if (msg.content.toLowerCase() === "->natação?") {
        if (commands[15].onlyIn.find(element => (element == msg.guild.id) || (element == process.env.ALL_SERVERS))){
            answers = ["Meu pau na sua mão", "Te comi e tu achou bão", "Me da um mamadão"];
            
            random = Math.floor(Math.random() * answers.length);    
            msg.reply(answers[random]);
            db.updateMoney(msg.guild.id, msg.member.user.id, 1);

        } else {
            msg.reply(commandUnavailable);

        }

        commandUsed = true;

    } if (msg.content.toLowerCase() === "->kmeans") {
        if (commands[16].onlyIn.find(element => (element == msg.guild.id) || (element == process.env.ALL_SERVERS))){
            msg.reply("Sei de nada desse assunto não menor, não enche! (Só sei que essa porra de assunto é chatão)");
            db.updateMoney(msg.guild.id, msg.member.user.id, 1);

        } else {
            msg.reply(commandUnavailable);

        }

        commandUsed = true;
        
    } 
    
    if (commandUsed) {
        console.log("O usuário " + msg.member.user.tag + " usou o comando " + msg.content.toLowerCase() + " no servidor " + msg.guild.name + " \n");
        bot.channels.cache.get(process.env.LOG_CHANNEL).send(msg.createdAt + ": O usuário " + msg.member.user.tag + " usou o comando " + msg.content.toLowerCase() + " no servidor " + msg.guild.name);

    }
}

module.exports = {funnyCommands};