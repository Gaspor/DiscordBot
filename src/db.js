const { connect } = require("./config/connection");

async function isRegister(discordID, serverID) {
    const client = await connect();
    const sql = `SELECT * FROM users WHERE discordid='${discordID}' AND serverid='${serverID}'`;

    return new Promise(function (resolve, reject) {
        client.query(sql)
            .then(function (res) {
                resolve(res);
                return res.rows[0];

            }).catch(function (e) {
                reject(e.stack);

            });
    });
}

async function getAccount(discordID, serverID, msg) {
    return isRegister(discordID, serverID)
        .then(function (result) {
            if (result.rowCount > 0) {
                msg.reply("Número da conta: " + result.rows[0].id + "\n " +
                    "Usuário: " + result.rows[0].username + "\n " +
                    "Saldo: " + result.rows[0].wallet);

            } else {
                msg.reply("Você ainda não tem uma conta nessa porra de Server, para criar uma digite ->criar");

            }
        }).catch(function (err) {
            console.log(err);

        });
}

async function insertUser(discordID, serverID, username, msg) {
    try {
        const client = await connect();
        const sql = 'INSERT INTO users(discordname, wallet, discordid, serverid) VALUES ($1, $2, $3, $4);';
        const values = [username, 10.00, discordID, serverID];
        await client.query(sql, values);
        msg.reply("Usuário criado com sucesso!");

    } catch (e) {
        console.log(e);
        msg.reply("Ocorreu um erro ao criar sua conta, tente novamente mais tarde!");

    }
}

async function createUser(discordID, serverID, username, msg) {
    return isRegister(discordID, serverID)
        .then(function (result) {
            if (result.rowCount > 0) {
                msg.reply("Tu já tem uma conta aqui, seu arrombado!");

            } else {
                insertUser(discordID, serverID, username, msg);

            }
        }).catch(function (err) {
            console.log(err);

        });
}

async function updateMoney(discordID, serverID, value) {
    return isRegister(discordID, serverID)
        .then(async function (result) {
            if (result.rowCount > 0) {
                try {
                    const client = await connect();
                    const newWalletValue = parseFloat(result.rows[0].wallet) + value;
                    const sqlUpdate = `UPDATE users SET wallet=$1 WHERE serverid='${serverID}' AND discordid='${discordID}'`;
                    const values = [newWalletValue];
                    await client.query(sqlUpdate, values);
                    console.log("Dado atualizado com sucesso");
                    
                } catch (e) {
                    console.log("Erro ao atualizar o dado do usuário");
                    
                }
            } else {
                console.log("Usuário não encontrado!");

            }
        }).catch(function (err) {
            console.log(err);

        });
}

async function transferMoneyById(serverID, receiverAccountID) {
    const client = await connect();
    const sql = `SELECT * FROM users WHERE serverid='${serverID}' AND id='${receiverAccountID}'`;

    return new Promise(function (resolve, reject) {
        client.query(sql)
            .then(function (resultsReceiver) {
                resolve(resultsReceiver.rows[0].discordid);
                return resultsReceiver.rows[0].discordid;

            }).catch(function (e) {
                reject(e.stack);

            });
    });
}

async function transferMoney(discordID, receiverDiscordID, serverID, receiverAccountID, msg, value) {
    if (receiverAccountID != 0) {
        await transferMoneyById(serverID, receiverAccountID)
            .then(function (result) {
                if (result) {
                    receiverDiscordID = result;
                }
            }).catch(function (err) {
                console.log(err);
        
            });
    }

    return isRegister(discordID, serverID)
        .then(async function (result) {
            if (result.rowCount > 0) {
                isRegister(receiverDiscordID, serverID)
                    .then(async function (resultReceiver) {
                        if (resultReceiver.rowCount > 0) {
                            try {
                                await updateMoney(receiverDiscordID, serverID, value);
                                await updateMoney(discordID, serverID, -value);
                                msg.reply("Transferência bem sucedida!");

                            } catch {
                                msg.reply("Erro ao fazer a transferência!");

                            }
                        }
                    }).catch(function (err) {
                        console.log(err);

                    });
            } else {
                msg.reply("Erro na transferência! Pode ser q você não tenha uma conta");

            }
        }).catch(function (err) {
            console.log(err);

        });  
}

module.exports = { getAccount, createUser, updateMoney, transferMoney };
