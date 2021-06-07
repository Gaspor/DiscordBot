async function connect() {
    const config = require("./config.json");

    if (global.connection)
        return global.connection.connect();

    const { Pool } = require('pg');
    const pool = new Pool({
        connectionString: 'postgres://' + config.db_username + ':' + 
        config.db_password + '@' + 
        config.db_server + ':' + 
        config.db_port + '/' + 
        config.db_name
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
    const sql = 'SELECT * FROM users WHERE discordid=' + discordID;

    await client.query(sql, async function(err, results) {
        let resultDcId = results.rows.length;
        console.log("Row count: %d", results.rows.length)
        const sql = 'SELECT * FROM users WHERE serverid=' + serverID;

        await client.query(sql, async function(err, resultsServer) {
            let resultServerId = resultsServer.rows.length;
            console.log("Row count: %d", resultsServer.rows.length)   
            if ((resultDcId === 0 && resultServerId === 0) || (resultDcId != 0 && resultServerId === 0) || (resultDcId === 0 && resultServerId != 0)) {
                await insertUser(discordID, username, msg, serverID);
            
            } else {
                msg.reply("Deu erro nessa porra, pode ser que tu já tenha uma conta!");
            
            }})
    });
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
    const sql = 'SELECT * FROM users WHERE serverid=' + serverID + 'AND discordID=' + discordID;
    await client.query(sql, async function(err, results) {
        let result = results.rows.length;
        console.log("Row count: %d", results.rows.length);
        if(result > 0) {
            msg.reply("Número da conta: " + results.rows[0].id + "\n " +
            "Usuário: " + results.rows[0].username + "\n " +
            "Saldo: " + results.rows[0].wallet);
        } else {
            msg.reply("Você ainda não tem uma conta nessa porra de Server, para criar uma digite ->criar");

        }
    });
}

async function updateMoney(serverID, discordID) {
    const client = await connect();
    console.log("Atualizando dados...");
    const sql = 'SELECT * FROM users WHERE serverid=' + serverID + 'AND discordID=' + discordID;
    await client.query(sql, async function(err, results) {
        let result = results.rows.length;
        console.log("Row count: %d", results.rows.length);
        if(result > 0) {
            newWalletValue = parseFloat(results.rows[0].wallet) + 1;
            console.log(newWalletValue);
            const sqlUpdate = 'UPDATE users SET wallet=$1 WHERE serverid=' + serverID + 'AND discordID=' + discordID;
            const values = [newWalletValue];
            await client.query(sqlUpdate, values);
            console.log("Dado atualizado com sucesso");

        }
    });

}

/*async function pagarMax(){
    const client = await connect();
    const sql = 'SELECT * FROM users WHERE serverid=690573745517232279 AND discordID=687432716769034240';
    await client.query(sql, async function(err, results) {
        let result = results.rows.length;
        console.log("Row count: %d", results.rows.length);
        if(result > 0) {
            newWalletValue = parseFloat(results.rows[0].wallet) + 100;
            console.log(newWalletValue);
            const sqlUpdate = 'UPDATE users SET wallet=$1 WHERE serverid=690573745517232279 AND discordID=687432716769034240';
            const values = [newWalletValue];
            await client.query(sqlUpdate, values);
            console.log("Dado atualizado com sucesso");

        }
    });
}*/

/*async function users(serverID, msg, user){
    const client = await connect();
    console.log("Buscando Users...");
    const sql = 'SELECT * FROM users WHERE serverid=' + serverID;
    await client.query(sql, async function(err, results) {
        let result = results.rows.length;
        console.log("Row count: %d", results.rows.length);
        if(result > 0) {
            let allUsers = "Usuários que você pode transferir dinheiro\n";
            for (let i = 0; i < result; i++) {
                allUsers += results.rows[i].id + " - " + results.rows[i].username + "\n";
            }
            allUsers += "Pra qual usuário você deseja transferir dinheiro?";
            msg.reply(allUsers);

            if (msg.member.user.id === user){
                transferMoney(msg.member.user.id, msg, msg.guild.id, msg.guild.id);
    
            }
            
        } else {
            msg.reply("Você ainda não tem uma conta nessa porra de Server, para criar uma digite ->criar");

        }
    });

}

async function transferMoney(discordID, msg, serverID, receiver) {
    msg.reply("Transferência bem sucedida!");
}*/

module.exports = {connect, verifyUser, selectUser, updateMoney, pagarMax};