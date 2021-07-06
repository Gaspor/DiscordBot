const db = require('./db');

function icCommands(msg, aux) {
    if (msg.content === "->conta") {
        db.selectUser(msg.member.user.id, msg, msg.guild.id);

        aux = 1;

    } if (msg.content === "->criar") {
        db.verifyUser(msg.member.user.id, msg.member.user.tag, msg, msg.guild.id);
                
        aux = 1;

    } if (msg.content.startsWith("->transferir")) {
        const command = msg.content;
        const commandSplit = command.split(" ");

        const value = parseFloat(commandSplit[1].replace(",", "."));
        const discordID = commandSplit[2];
        const accountID = commandSplit[3];

        console.log(value, discordID, accountID);

        if(value <= 0 || isNaN(value)) {
            msg.reply("Valor inválido para transferência, tu tá querendo me bugar krai?");
        
        } else {
            db.transferMoney(msg, value, msg.member.user.id, msg.guild.id, discordID, accountID);

        }
        aux = 1;

    } if (msg.content === "->ic") {
        msg.reply("Os comandos do Imagina Wallet são: \n" + 
        "->conta = Vê as informações da sua conta \n" + 
        "->criar = Cria uma conta, com saldo inicial de 10.00 \n" + 
        "->transferir = Em breve! \n" +
        "Obs: Use os comandos que estão no ->helpkrai para ganhar I₵ 1.00");

        db.updateMoney(msg.guild.id, msg.member.user.id, 1);     
        aux = 1;

    }
}

module.exports = {icCommands};