const fetch = require("node-fetch");
const config = require("./config.json");
const Discord = require("discord.js");

async function minigames(msg, aux) {
    if (msg.content === "->yt") {
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
                        "Authorization": `Bot ${config.token}`,
                        "Content-Type": "application/json"
                    }
                } 
            ).then(res => res.json()).then(invite => {
                if(!invite.code) return msg.reply("Deu B.O!");
                const embed = new Discord.MessageEmbed().setTitle("Clicka no pai pra assistir Youtube").setURL(`https://discord.com/invite/${invite.code}`).setAuthor("Youtube");
                msg.channel.send(embed);
            })
        }

        aux = 1;

    } if (msg.content === "->poker") {
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
                        "Authorization": `Bot ${config.token}`,
                        "Content-Type": "application/json"
                    }
                } 
            ).then(res => res.json()).then(invite => {
                if(!invite.code) return msg.reply("Deu B.O!");
                const embed = new Discord.MessageEmbed().setTitle("Clicka no pai pra jogar um pokerzin").setURL(`https://discord.com/invite/${invite.code}`).setAuthor("Poker");
                msg.channel.send(embed);
            })
        }

        aux = 1;

    } if (msg.content === "->betrayal") {
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
                        "Authorization": `Bot ${config.token}`,
                        "Content-Type": "application/json"
                    }
                } 
            ).then(res => res.json()).then(invite => {
                if(!invite.code) return msg.reply("Deu B.O!");
                const embed = new Discord.MessageEmbed().setTitle("Clicka no pai pra jogar um among us de baixo orçamento").setURL(`https://discord.com/invite/${invite.code}`).setAuthor("Betrayal");
                msg.channel.send(embed);
            })
        }

        aux = 1;    

    } if (msg.content === "->fishing") {
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
                        "Authorization": `Bot ${config.token}`,
                        "Content-Type": "application/json"
                    }
                } 
            ).then(res => res.json()).then(invite => {
                if(!invite.code) return msg.reply("Deu B.O!");
                const embed = new Discord.MessageEmbed().setTitle("Clicka no pai pra dar uma pescada").setURL(`https://discord.com/invite/${invite.code}`).setAuthor("Fishing.io");
                msg.channel.send(embed);
            })
        }

        aux = 1;    
    }
}

module.exports = {minigames};