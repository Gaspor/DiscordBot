const db = require('./db');
const Discord = require("discord.js");
const config = require("./config.json");

function funnyCommands(msg, aux){
    if (msg.content === "->Js") {
        if (msg.guild.id != config.botTestesId && msg.guild.id != config.JogoMinimalistaId) {
            msg.reply("Este comando não está disponível neste servidor!");

        } else {
            const attachment = new Discord.MessageAttachment("assets/Js.jpg");
            msg.reply("PAU NO CU DO JS", attachment);
            
        }

        db.updateMoney(msg.guild.id, msg.member.user.id, 1);
        aux = 1;

    } if (msg.content === "->secret") {
        msg.reply("Tu acha mesmo que ia ter algum segredo? Tu é burrão mesmo bixo!");

        db.updateMoney(msg.guild.id, msg.member.user.id, 1);
        aux = 1;

    } if (msg.content === "->Sexta") {
        if (msg.guild.id != config.botTestesId && msg.guild.id != config.JogoMinimalistaId) {
            msg.reply("Este comando não está disponível neste servidor!");

        } else {
            const attachment = new Discord.MessageAttachment("assets/sexta.jpeg");
            msg.reply("Com todo respeito, VAI TE FUDER SEXTA!!!", attachment);

        }

        db.updateMoney(msg.guild.id, msg.member.user.id, 1);
        aux = 1;

    } if (msg.content === "->ramom") {
        if (msg.guild.id != config.botTestesId && msg.guild.id != config.JogoMinimalistaId) {
            msg.reply("Este comando não está disponível neste servidor!");

        } else {
            const attachment = new Discord.MessageAttachment("assets/ramom.jpg");
            msg.reply("Vai pra pqp menor!", attachment);
        
        }

        db.updateMoney(msg.guild.id, msg.member.user.id, 1);
        aux = 1;

    } if (msg.content === "->lip") {
        if (msg.guild.id != config.botTestesId && msg.guild.id != config.JogoMinimalistaId) {
            msg.reply("Este comando não está disponível neste servidor!");

        } else {
            const attachment = new Discord.MessageAttachment("assets/lipzeta.png");
            msg.reply("Da uma mamadinha em mim", attachment);
        
        }

        db.updateMoney(msg.guild.id, msg.member.user.id, 1);
        aux = 1;

    } if (msg.content === "->max") {
        if (msg.guild.id != config.botTestesId && msg.guild.id != config.JogoMinimalistaId) {
            msg.reply("Este comando não está disponível neste servidor!");

        } else {
            const attachment = new Discord.MessageAttachment("assets/hakiman.png");
            msg.reply(attachment);

        }

        db.updateMoney(msg.guild.id, msg.member.user.id, 1);
        aux = 1;

    } if (msg.content === "->natação?") {
        if (msg.guild.id != config.botTestesId && msg.guild.id != config.JogoMinimalistaId) {
            msg.reply("Este comando não está disponível neste servidor!");

        } else {
            answers = ["Meu pau na sua mão", "Te comi e tu achou bão", "Me da um mamadão"];
            random = Math.floor(Math.random() * answers.length);

            msg.reply(answers[random]);
        }

        db.updateMoney(msg.guild.id, msg.member.user.id, 1);
        aux = 1;

    } if (msg.content === "->kmeans") {
        if (msg.guild.id != config.botTestesId && msg.guild.id != config.JogoMinimalistaId) {
            msg.reply("Este comando não está disponível neste servidor!");

        } else {
            msg.reply("Sei de nada desse assunto não menor, não enche! (Só sei que essa porra de assunto é chatão)");
        
        }

        db.updateMoney(msg.guild.id, msg.member.user.id, 1);
        aux = 1;

    }
}

module.exports = {funnyCommands};