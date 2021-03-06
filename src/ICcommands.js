const db = require('./db');
const { commandsIC, commandUnavailable, commands } = require('./commands');

function icCommands(msg, commandUsed, bot) {
    commandUsed = false;

    if (msg.content.toLowerCase() === "->conta") {
        if (commandsIC[0].onlyIn.find(element => (element == msg.guild.id) || (element == process.env.ALL_SERVERS))) {
            db.getAccount(msg.member.user.id, msg.guild.id, msg);

        } else {
            msg.reply(commandUnavailable);

        }

        commandUsed = true;

    } if (msg.content.toLowerCase() === "->criar") {
        if (commandsIC[1].onlyIn.find(element => (element == msg.guild.id) || (element == process.env.ALL_SERVERS))) {
            db.createUser(msg.member.user.id, msg.guild.id, msg.member.user.tag, msg);

        } else {
            msg.reply(commandUnavailable);

        }

        commandUsed = true;

    } if (msg.content.toLowerCase().startsWith("->transferir")) {
        if (commandsIC[2].onlyIn.find(element => (element == msg.guild.id) || (element == process.env.ALL_SERVERS))) {
            const command = msg.content.toLowerCase();
            const commandSplit = command.split(" ");

            const value = parseFloat(commandSplit[1].replace(",", "."));
            const discordIDReceiver = commandSplit[2];
            const accountID = commandSplit[3];

            console.log(value, discordIDReceiver, accountID);

            if (value <= 0 || isNaN(value)) {
                msg.reply("Valor inválido para transferência, tu tá querendo me bugar krai?");

            } else {
                db.transferMoney(msg.member.user.id, discordIDReceiver, msg.guild.id, accountID, msg, value);

            }
        } else {
            msg.reply(commandUnavailable);

        }

        commandUsed = true;

    } if (msg.content.toLowerCase() === "->ic") {
        if (commands[17].onlyIn.find(element => (element == msg.guild.id) || (element == process.env.ALL_SERVERS))) {
            let message = "Os comandos do Imagina Wallet são: \n";

            commandsIC.forEach((value) => {
                if (value.onlyIn.find(element => (element == msg.guild.id) || (element == process.env.ALL_SERVERS))) {
                    message += value.commandExample + " = " + value.description + "\n";

                }
            })

            message += "Obs: Use os comandos que estão no ->helpkrai para ganhar I₵ 1.00";
            msg.reply(message);

            db.updateMoney(msg.member.user.id, msg.guild.id, 1);
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

module.exports = { icCommands };