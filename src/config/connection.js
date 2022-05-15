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

module.exports = { connect };
