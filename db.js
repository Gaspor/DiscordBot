require('dotenv').config();

async function connect() {
    process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

    if (global.connection)
        return global.connection.connect();

    const { Pool } = require('pg');
    const pool = new Pool({
        connectionString: 'postgres://' + process.env.DB_USERNAME + ':' +
            process.env.DB_PASSWORD + '@' +
            process.env.DB_SERVER + ':' +
            process.env.DB_PORT + '/' +
            process.env.DB_NAME + "?sslmode=require"
    });

    //apenas testando a conexão
    const client = await pool.connect();
    console.log("Criou pool de conexões no PostgreSQL!");

    const res = await client.query('SELECT NOW()');
    console.log(res.rows[0]);
    client.release();

    //guardando para usar sempre o mesmo
    global.connection = pool;
    return pool.connect();
}

async function verifyUser(discordID, username, msg, serverID) {
    const client = await connect();
    const sql = `SELECT * FROM users WHERE discordid='${discordID}' AND serverid='${serverID}'`;

    await client.query(sql, async function (err, results) {
        let result = results != undefined ? results.rows.length : 0;
        console.log("Row count: %d", result);

        if (result === 0) {
            await insertUser(discordID, username, msg, serverID);

        } else {
            msg.reply("Deu erro nessa porra, tu já tenha uma conta aqui carai!");

        }
    }
    );
}

async function insertUser(discordID, username, msg, serverID) {
    const client = await connect();
    console.log('Inserindo...');
    const sql = 'INSERT INTO users(username, wallet, discordid, serverid) VALUES ($1, $2, $3, $4);';
    const values = [username, 10.00, discordID, serverID];
    await client.query(sql, values);
    msg.reply("Usuário criado com sucesso!");

}

async function selectUser(discordID, msg, serverID) {
    const client = await connect();
    console.log("Buscando User...");
    const sql = `SELECT * FROM users WHERE discordid='${discordID}' AND serverid='${serverID}'`;
    await client.query(sql, async function (err, results) {
        let result = results != undefined ? results.rows.length : 0;
        console.log("Row count: %d", result);

        if (result > 0) {
            msg.reply("Número da conta: " + results.rows[0].id + "\n " +
                "Usuário: " + results.rows[0].username + "\n " +
                "Saldo: " + results.rows[0].wallet);

        } else {
            msg.reply("Você ainda não tem uma conta nessa porra de Server, para criar uma digite ->criar");

        }
    });
}

async function updateMoney(serverID, discordID, value) {
    const client = await connect();
    console.log("Atualizando dados...");
    const sql = `SELECT * FROM users WHERE discordid='${discordID}' AND serverid='${serverID}'`;
    await client.query(sql, async function (err, results) {
        let result = results != undefined ? results.rows.length : 0;
        console.log("Row count: %d", result);
        if (result > 0) {
            newWalletValue = parseFloat(results.rows[0].wallet) + value;
            console.log(newWalletValue);
            const sqlUpdate = `UPDATE users SET wallet=$1 WHERE serverid='${serverID}' AND discordid='${discordID}'`;
            const values = [newWalletValue];
            await client.query(sqlUpdate, values);
            console.log("Dado atualizado com sucesso");

        }
    });
}

async function transferMoney(msg, value, user, server, receiverDiscordID, receiverAccountID) {
    const client = await connect();
    let sql = `SELECT * FROM users WHERE serverid='${server}' AND discordid='${user}'`;
    await client.query(sql, async function (err, results) {
        let result = results != undefined ? results.rows.length : 0; console.log("Row count: %d", results.rows.length);
        if (result > 0 && receiverDiscordID != 0) {
            sql = `SELECT * FROM users WHERE serverid='${server}' AND discordid='${receiverDiscordID}'`;
            await client.query(sql, async function (err, resultsReceiver) {
                result = resultsReceiver.rows.length;
                console.log("Row count: %d", resultsReceiver.rows.length);

                if (result > 0) {
                    try {
                        await updateMoney(msg.guild.id, receiverDiscordID, value);
                        await updateMoney(msg.guild.id, msg.member.user.id, -value);
                        msg.reply("Transferência bem sucedida!");

                    } catch {
                        msg.reply("Erro ao fazer a transferência!");

                    }
                } else {
                    msg.reply("Erro, não foi encontrado nenhum usuário com esse discordID!");

                }
            });

        } else if (result > 0 && receiverAccountID != 0) {
            sql = `SELECT * FROM users WHERE serverid='${server}' AND id='${receiverAccountID}'`;
            await client.query(sql, async function (err, resultsReceiver) {
                result = resultsReceiver.rows.length;
                console.log("Row count: %d", resultsReceiver.rows.length);

                if (result > 0) {
                    try {
                        let discordID = resultsReceiver.rows[0].discordid;
                        await updateMoney(msg.guild.id, discordID, value);
                        await updateMoney(msg.guild.id, msg.member.user.id, -value);
                        msg.reply("Transferência bem sucedida!");

                    } catch {
                        msg.reply("Erro ao fazer a transferência!");

                    }
                } else {
                    msg.reply("Erro, não foi encontrado nenhum usuário com esse ID de conta nesse servidor!");

                }
            });

        } else {
            msg.reply("Erro, não foi possível encontrar a sua conta nesse servidor!");

        }
    });
}

module.exports = { connect, verifyUser, selectUser, updateMoney, transferMoney };