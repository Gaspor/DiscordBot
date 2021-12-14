const fetch = require("node-fetch");
const Discord = require("discord.js");
const { commandsMinigames, commandUnavailable } = require("./commands");
require('dotenv').config();

async function minigames(msg, commandUsed, bot) {
    commandUsed = false;
    if (msg.content.toLowerCase() === "->yt") {
        if (commandsMinigames[0].onlyIn.find(element => (element == msg.guild.id) || (element == process.env.ALL_SERVERS))){
            const voiceChannel = msg.member.voice.channel;
            if (!voiceChannel){
                msg.reply("Entra em um canal primeiro, oh seu animal!")
            
            } else {
                fetch(
                    `https://discord.com/api/v8/channels/${voiceChannel.id}/invites`, {
                        method: "POST",
                        body: JSON.stringify({
                            max_age: 21600,
                            max_users: 0,
                            target_application_id: "755600276941176913", //Youtube ID
                            target_type: 2,
                            temporary: false,
                            validate: null
                        }),
                        headers: {
                            "Authorization": `Bot ${process.env.token}`,
                            "Content-Type": "application/json"
                        }
                    } 
                ).then(res => res.json()).then(invite => {
                    if(!invite.code) return msg.reply("Deu B.O!");
                    const embed = new Discord.MessageEmbed().setTitle("Clicka no pai pra assistir Youtube").setURL(`https://discord.com/invite/${invite.code}`).setAuthor("Youtube");
                    msg.channel.send(embed);
                })
            }
            
        } else {
            msg.reply(commandUnavailable);

        }

        commandUsed = true;

    } if (msg.content.toLowerCase() === "->poker") {
        if (commandsMinigames[1].onlyIn.find(element => (element == msg.guild.id) || (element == process.env.ALL_SERVERS))){
            const voiceChannel = msg.member.voice.channel;
            if (!voiceChannel){
                msg.reply("Entra em um canal primeiro, oh seu animal!")
            
            } else {
                fetch(
                    `https://discord.com/api/v8/channels/${voiceChannel.id}/invites`, {
                        method: "POST",
                        body: JSON.stringify({
                            max_age: 21600,
                            max_users: 0,
                            target_application_id: "755827207812677713", //Poker ID
                            target_type: 2,
                            temporary: false,
                            validate: null
                        }),
                        headers: {
                            "Authorization": `Bot ${process.env.token}`,
                            "Content-Type": "application/json"
                        }
                    } 
                ).then(res => res.json()).then(invite => {
                    if(!invite.code) return msg.reply("Deu B.O!");
                    const embed = new Discord.MessageEmbed().setTitle("Clicka no pai pra jogar um pokerzin").setURL(`https://discord.com/invite/${invite.code}`).setAuthor("Poker");
                    msg.channel.send(embed);
                })
            }
        } else {
            msg.reply(commandUnavailable);

        }

        commandUsed = true;

    } if (msg.content.toLowerCase() === "->betrayal") {
        if (commandsMinigames[2].onlyIn.find(element => (element == msg.guild.id) || (element == process.env.ALL_SERVERS))){
            const voiceChannel = msg.member.voice.channel;
            if (!voiceChannel){
                msg.reply("Entra em um canal primeiro, oh seu animal!")
            
            } else {
                fetch(
                    `https://discord.com/api/v8/channels/${voiceChannel.id}/invites`, {
                        method: "POST",
                        body: JSON.stringify({
                            max_age: 21600,
                            max_users: 0,
                            target_application_id: "773336526917861400", //Betrayal ID
                            target_type: 2,
                            temporary: false,
                            validate: null
                        }),
                        headers: {
                            "Authorization": `Bot ${process.env.token}`,
                            "Content-Type": "application/json"
                        }
                    } 
                ).then(res => res.json()).then(invite => {
                    if(!invite.code) return msg.reply("Deu B.O!");
                    const embed = new Discord.MessageEmbed().setTitle("Clicka no pai pra jogar um among us de baixo orçamento").setURL(`https://discord.com/invite/${invite.code}`).setAuthor("Betrayal");
                    msg.channel.send(embed);
                })
            }
        } else {
            msg.reply(commandUnavailable);

        }

        commandUsed = true;    

    } if (msg.content.toLowerCase() === "->fishing") {
        if (commandsMinigames[3].onlyIn.find(element => (element == msg.guild.id) || (element == process.env.ALL_SERVERS))){
            const voiceChannel = msg.member.voice.channel;
            if (!voiceChannel){
                msg.reply("Entra em um canal primeiro, oh seu animal!")
            
            } else {
                fetch(
                    `https://discord.com/api/v8/channels/${voiceChannel.id}/invites`, {
                        method: "POST",
                        body: JSON.stringify({
                            max_age: 21600,
                            max_users: 0,
                            target_application_id: "814288819477020702", //Fishing ID
                            target_type: 2,
                            temporary: false,
                            validate: null
                        }),
                        headers: {
                            "Authorization": `Bot ${process.env.token}`,
                            "Content-Type": "application/json"
                        }
                    } 
                ).then(res => res.json()).then(invite => {
                    if(!invite.code) return msg.reply("Deu B.O!");
                    const embed = new Discord.MessageEmbed().setTitle("Clicka no pai pra dar uma pescada").setURL(`https://discord.com/invite/${invite.code}`).setAuthor("Fishing.io");
                    msg.channel.send(embed);
                })
            }
        } else {
            msg.reply(commandUnavailable);

        }

        commandUsed = true;    

    } if (msg.content.toLowerCase() === "->chess") {
        if (commandsMinigames[4].onlyIn.find(element => (element == msg.guild.id) || (element == process.env.ALL_SERVERS))){
            const voiceChannel = msg.member.voice.channel;
            if (!voiceChannel){
                msg.reply("Entra em um canal primeiro, oh seu animal!")
            
            } else {
                fetch(
                    `https://discord.com/api/v8/channels/${voiceChannel.id}/invites`, {
                        method: "POST",
                        body: JSON.stringify({
                            max_age: 21600,
                            max_users: 0,
                            target_application_id: "832012774040141894", //Chess ID
                            target_type: 2,
                            temporary: false,
                            validate: null
                        }),
                        headers: {
                            "Authorization": `Bot ${process.env.token}`,
                            "Content-Type": "application/json"
                        }
                    } 
                ).then(res => res.json()).then(invite => {
                    if(!invite.code) return msg.reply("Deu B.O!");
                    const embed = new Discord.MessageEmbed().setTitle("Clicka no pai pra jogar um xadrezin").setURL(`https://discord.com/invite/${invite.code}`).setAuthor("Xadrãozada");
                    msg.channel.send(embed);
                })
            }
        } else {
            msg.reply(commandUnavailable);

        }

        commandUsed = true;
    }

    if (commandUsed) {
        console.log("O usuário " + msg.member.user.tag + " usou o comando " + msg.content.toLowerCase() + " no servidor " + msg.guild.name + " \n");
        bot.channels.cache.get(process.env.log_channel).send(msg.createdAt + ": O usuário " + msg.member.user.tag + " usou o comando " + msg.content.toLowerCase() + " no servidor " + msg.guild.name);

    }
}

module.exports = {minigames};