const fetch = require("node-fetch");
const Discord = require("discord.js");
const { commandsMinigames, commandUnavailable } = require("./commands");

const Minigames = {
    youtube: {
        id: "880218394199220334",
        title: "Clicka no pai pra assistir Youtube",
        author: "Youtube"

    },
    poker: {
        id: "755827207812677713",
        title: "Clicka no pai pra jogar um pokerzin",
        author: "Poker"

    },
    betrayal: {
        id: "773336526917861400",
        title: "Clicka no pai pra jogar um among us de baixo orçamento",
        author: "Betrayal"

    },
    fishing: {
        id: "814288819477020702",
        title: "Clicka no pai pra dar uma pescada",
        author: "Fishing.io"

    },
    chess: {
        id: "832012774040141894",
        title: "Clicka no pai pra jogar um xadrezin",
        author: "Xadrãozada"

    },
    teste: {
        id: "879863976006127627",
        title: "Isso é um Teste FDP",
        author: "Teste de Corno"
    }
}

async function minigames(msg, commandUsed, bot) {
    commandUsed = false;
    if (msg.content.toLowerCase() === "->yt") {
        if (commandsMinigames[0].onlyIn.find(element => (element == msg.guild.id) || (element == process.env.ALL_SERVERS))) {
            const minigame = Minigames.youtube;
            getMinigameLink(msg, minigame.id, minigame.title, minigame.author);

        } else {
            msg.reply(commandUnavailable);

        }

        commandUsed = true;

    } if (msg.content.toLowerCase() === "->poker") {
        if (commandsMinigames[1].onlyIn.find(element => (element == msg.guild.id) || (element == process.env.ALL_SERVERS))) {
            const minigame = Minigames.poker;
            getMinigameLink(msg, minigame.id, minigame.title, minigame.author);

        } else {
            msg.reply(commandUnavailable);

        }

        commandUsed = true;

    } if (msg.content.toLowerCase() === "->betrayal") {
        if (commandsMinigames[2].onlyIn.find(element => (element == msg.guild.id) || (element == process.env.ALL_SERVERS))) {
            const minigame = Minigames.betrayal;
            getMinigameLink(msg, minigame.id, minigame.title, minigame.author);

        } else {
            msg.reply(commandUnavailable);

        }

        commandUsed = true;

    } if (msg.content.toLowerCase() === "->fishing") {
        if (commandsMinigames[3].onlyIn.find(element => (element == msg.guild.id) || (element == process.env.ALL_SERVERS))) {
            const minigame = Minigames.fishing;
            getMinigameLink(msg, minigame.id, minigame.title, minigame.author);

        } else {
            msg.reply(commandUnavailable);

        }

        commandUsed = true;

    } if (msg.content.toLowerCase() === "->chess") {
        if (commandsMinigames[4].onlyIn.find(element => (element == msg.guild.id) || (element == process.env.ALL_SERVERS))) {
            const minigame = Minigames.chess;
            getMinigameLink(msg, minigame.id, minigame.title, minigame.author);

        } else {
            msg.reply(commandUnavailable);

        }

        commandUsed = true;
    } if (msg.content.toLowerCase() === "->testemg") {
        if (commandsMinigames[4].onlyIn.find(element => (element == msg.guild.id) || (element == process.env.ALL_SERVERS))) {
            if (msg.member.user.id != process.env.GASPORID) {
                return;
            }
            const minigame = Minigames.teste;
            getMinigameLink(msg, minigame.id, minigame.title, minigame.author);
            
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

function getMinigameLink(msg, minigameId, minigameTitle, minigameAuthor) {
    const voiceChannel = msg.member.voice.channel;
    if (!voiceChannel) {
        msg.reply("Entra em um canal primeiro, oh seu animal!")

    } else {
        fetch(
            `https://discord.com/api/v8/channels/${voiceChannel.id}/invites`, {
            method: "POST",
            body: JSON.stringify({
                max_age: 21600,
                max_users: 0,
                target_application_id: minigameId,
                target_type: 2,
                temporary: false,
                validate: null
            }),
            headers: {
                "Authorization": `Bot ${process.env.TOKEN}`,
                "Content-Type": "application/json"
            }
        }
        ).then(res => res.json()).then(invite => {
            if (!invite.code) return msg.reply("Deu B.O!");
            const embed = new Discord.MessageEmbed().setTitle(minigameTitle).setURL(`https://discord.com/invite/${invite.code}`).setAuthor(minigameAuthor);
            msg.channel.send(embed);
        })
    }
}

module.exports = { minigames };