require('dotenv').config();

const chromeOptions = {
    headless: true,
    defaultViewport: null,
    args: [
        "--incognito",
        "--no-sandbox",
        "--single-process",
        "--no-zygote",
        "--disabled-setupid-sandbox"
    ],
};

const commandUnavailable = "Este comando não está disponível neste servidor!";

const commands = [{
    /* 0 */
    commandExample : "->hoje",
    onlyIn: [
        process.env.JOGOMINIMALISTAID, 
        process.env.BOTTESTESID, 
        process.env.FACUL_SERVERID
    ],

    description : "Para ver as aulas que aconteceram hj"
},
{
    /* 1 */
    commandExample : "->amanhã/amanha",
    onlyIn: [
        process.env.JOGOMINIMALISTAID, 
        process.env.BOTTESTESID, 
        process.env.FACUL_SERVERID
    ],

    description : "Para ver as aulas que aconteceram amanhã"
},
{
    /* 2 */
    commandExample : "->lprank",
    onlyIn: [
        process.env.JOGOMINIMALISTAID, 
        process.env.BOTTESTESID, 
        process.env.FACUL_SERVERID,
        process.env.ALL_SERVERS
    ],

    description : "Mostra o ranking das 10 primeiras linguagens de programação mais usadas"
},
{
    /* 3 */
    commandExample : "->prova",
    onlyIn: [
        process.env.JOGOMINIMALISTAID,
        process.env.BOTTESTESID, 
        process.env.FACUL_SERVERID
    ],

    description : "Para ver quando será a próxima prova"
},
{
    /* 4 */
    commandExample : "->ava",
    onlyIn: [
        process.env.JOGOMINIMALISTAID, 
        process.env.BOTTESTESID, 
        process.env.FACUL_SERVERID
    ],

    description : "Informa o link do AVA"
},
{
    /* 5 */
    commandExample : "->dolar",
    onlyIn: [
        process.env.JOGOMINIMALISTAID, 
        process.env.BOTTESTESID, 
        process.env.FACUL_SERVERID,
        process.env.ALL_SERVERS
    ],
    
    description : "Informa a cotação atual do dolar (Sim, eu não tenho mais nada pra fazer da vida)"
},
{
    /* 6 */
    commandExample : "->github",
    onlyIn: [
        process.env.JOGOMINIMALISTAID, 
        process.env.BOTTESTESID, 
        process.env.FACUL_SERVERID,
        process.env.ALL_SERVERS
    ],
    
    description : "Para ver o github do projeto"
},
{
    /* 7 */
    commandExample : "->helpkrai",
    onlyIn: [
        process.env.JOGOMINIMALISTAID, 
        process.env.BOTTESTESID, 
        process.env.FACUL_SERVERID,
        process.env.ALL_SERVERS
    ],

    description : "Mostra a lista de comando e suas funcionalidades"
},
{
    /* 8 */
    commandExample : "->minigames",
    onlyIn: [
        process.env.JOGOMINIMALISTAID, 
        process.env.BOTTESTESID, 
        process.env.FACUL_SERVERID,
        process.env.ALL_SERVERS
    ],

    description : "Mostra a lista de minigames que tem no bot"
},

/* FUNNY COMMANDS */
{
    /* 9 */
    commandExample : "->secret",
    onlyIn: [
        process.env.JOGOMINIMALISTAID, 
        process.env.BOTTESTESID,
        process.env.ALL_SERVERS
    ],

    description : "É segredo menor, fica xiu!"
},
{
    /* 10 */
    commandExample : "->js",
    onlyIn: [
        process.env.JOGOMINIMALISTAID, 
        process.env.BOTTESTESID
    ],

    description : "???"
},
{
    /* 11 */
    commandExample : "->sexta",
    onlyIn: [
        process.env.JOGOMINIMALISTAID, 
        process.env.BOTTESTESID
    ],

    description : "???"
},
{
    /* 12 */
    commandExample : "->lip",
    onlyIn: [
        process.env.JOGOMINIMALISTAID, 
        process.env.BOTTESTESID
    ],

    description : "???"
},
{
    /* 13 */
    commandExample : "->ramom",
    onlyIn: [
        process.env.JOGOMINIMALISTAID, 
        process.env.BOTTESTESID
    ],

    description : "???"
},
{
    /* 14 */
    commandExample : "->max",
    onlyIn: [
        process.env.JOGOMINIMALISTAID, 
        process.env.BOTTESTESID
    ],

    description : "???"
},
{
    /* 15 */
    commandExample : "->natação?",
    onlyIn: [
        process.env.JOGOMINIMALISTAID, 
        process.env.BOTTESTESID, 
        process.env.FACUL_SERVERID,
        process.env.ALL_SERVERS
    ],

    description : "???"
},
{
    /* 16 */
    commandExample : "->kmeans",
    onlyIn: [
        process.env.JOGOMINIMALISTAID, 
        process.env.BOTTESTESID, 
        process.env.FACUL_SERVERID
    ],

    description : "???"
},

/* IMAGINA COIN COMMANDS*/
{
    /* 17 */
    commandExample : "->ic",
    onlyIn: [
        process.env.JOGOMINIMALISTAID, 
        process.env.BOTTESTESID, 
        process.env.FACUL_SERVERID,
        process.env.ALL_SERVERS
    ],

    description : "Mostra os comandos do ImaginaCoin"
}]

const commandsMinigames = [{
    /* 0 */
    commandExample : "->yt",
    onlyIn: [
        process.env.JOGOMINIMALISTAID, 
        process.env.BOTTESTESID, 
        process.env.FACUL_SERVERID,
        process.env.ALL_SERVERS
    ],

    description : "Para assistir youtube com os amiguinhos em call"
},
{
    /* 1 */
    commandExample : "->poker",
    onlyIn: [
        process.env.JOGOMINIMALISTAID, 
        process.env.BOTTESTESID, 
        process.env.FACUL_SERVERID,
        process.env.ALL_SERVERS
    ],

    description : "Jogar aquele pokerzão em call"
},
{
    /* 2 */
    commandExample : "->betrayal",
    onlyIn: [
        process.env.JOGOMINIMALISTAID, 
        process.env.BOTTESTESID, 
        process.env.FACUL_SERVERID,
        process.env.ALL_SERVERS
    ],

    description : "Jogar o among us de baixo orçamento"
},
{
    /* 3 */
    commandExample : "->fishing",
    onlyIn: [
        process.env.JOGOMINIMALISTAID, 
        process.env.BOTTESTESID, 
        process.env.FACUL_SERVERID,
        process.env.ALL_SERVERS
    ],

    description : "Jogar um jogo de pescaria muito brabo mesmo, confia"
},
{
    /* 4 */
    commandExample : "->chess",
    onlyIn: [
        process.env.JOGOMINIMALISTAID, 
        process.env.BOTTESTESID, 
        process.env.FACUL_SERVERID,
        process.env.ALL_SERVERS
    ],

    description : "Jogar um Xadrezin brabo"
}]

const commandsIC = [{ 
    /* 0 */
    commandExample : "->conta",
    onlyIn: [
        process.env.JOGOMINIMALISTAID, 
        process.env.BOTTESTESID, 
        process.env.FACUL_SERVERID,
        process.env.ALL_SERVERS
    ],

    description : "Vê as informações da sua conta"
},
{
    /* 1 */
    commandExample : "->criar",
    onlyIn: [
        process.env.JOGOMINIMALISTAID,
        process.env.BOTTESTESID, 
        process.env.FACUL_SERVERID,
        process.env.ALL_SERVERS
    ],

    description : "Cria uma conta, com saldo inicial de 10.00"
},
{
    /* 2 */
    commandExample : "->transferir [valor] [Discord Id da pessoa] [Id da conta]",
    onlyIn: [
        process.env.JOGOMINIMALISTAID, 
        process.env.BOTTESTESID, 
        process.env.FACUL_SERVERID,
        process.env.ALL_SERVERS
    ],

    description : "Transfere uma quantia em imaginacoin para a pessoa com esse Discord ID ou com esse id da conta"
}]

module.exports = {commands, commandsMinigames, commandsIC, commandUnavailable, chromeOptions};