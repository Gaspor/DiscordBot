const config = require("./config.json");

const commandUnavailable = "Este comando não está disponível neste servidor!";

const commands = [{
    /* 0 */
    commandExample : "->hoje",
    onlyIn: [
        config.JogoMinimalistaId, 
        config.botTestesId, 
        config.facul_serverID
    ],

    description : "Para ver as aulas que aconteceram hj"
},
{
    /* 1 */
    commandExample : "->amanhã/amanha",
    onlyIn: [
        config.JogoMinimalistaId, 
        config.botTestesId, 
        config.facul_serverID
    ],

    description : "Para ver as aulas que aconteceram amanhã"
},
{
    /* 2 */
    commandExample : "->lprank",
    onlyIn: [
        config.JogoMinimalistaId, 
        config.botTestesId, 
        config.facul_serverID,
        config.all_servers
    ],

    description : "Mostra o ranking das 10 primeiras linguagens de programação mais usadas"
},
{
    /* 3 */
    commandExample : "->prova",
    onlyIn: [
        config.JogoMinimalistaId,
        config.botTestesId, 
        config.facul_serverID
    ],

    description : "Para ver quando será a próxima prova"
},
{
    /* 4 */
    commandExample : "->ava",
    onlyIn: [config.JogoMinimalistaId, 
        config.botTestesId, 
        config.facul_serverID
    ],

    description : "Informa o link do AVA"
},
{
    /* 5 */
    commandExample : "->dolar",
    onlyIn: [
        config.JogoMinimalistaId, 
        config.botTestesId, 
        config.facul_serverID,
        config.all_servers
    ],
    
    description : "Informa a cotação atual do dolar (Sim, eu não tenho mais nada pra fazer da vida)"
},
{
    /* 6 */
    commandExample : "->github",
    onlyIn: [
        config.JogoMinimalistaId, 
        config.botTestesId, 
        config.facul_serverID,
        config.all_servers
    ],
    
    description : "Para ver o github do projeto"
},
{
    /* 7 */
    commandExample : "->helpkrai",
    onlyIn: [
        config.JogoMinimalistaId, 
        config.botTestesId, 
        config.facul_serverID,
        config.all_servers
    ],

    description : "Mostra a lista de comando e suas funcionalidades"
},
{
    /* 8 */
    commandExample : "->minigames",
    onlyIn: [
        config.JogoMinimalistaId, 
        config.botTestesId, 
        config.facul_serverID,
        config.all_servers
    ],

    description : "Mostra a lista de minigames que tem no bot"
},

/* FUNNY COMMANDS */
{
    /* 9 */
    commandExample : "->secret",
    onlyIn: [
        config.JogoMinimalistaId, 
        config.botTestesId,
        config.all_servers
    ],

    description : "É segredo menor, fica xiu!"
},
{
    /* 10 */
    commandExample : "->js",
    onlyIn: [
        config.JogoMinimalistaId, 
        config.botTestesId
    ],

    description : "???"
},
{
    /* 11 */
    commandExample : "->sexta",
    onlyIn: [
        config.JogoMinimalistaId, 
        config.botTestesId
    ],

    description : "???"
},
{
    /* 12 */
    commandExample : "->lip",
    onlyIn: [
        config.JogoMinimalistaId, 
        config.botTestesId
    ],

    description : "???"
},
{
    /* 13 */
    commandExample : "->ramom",
    onlyIn: [
        config.JogoMinimalistaId, 
        config.botTestesId
    ],

    description : "???"
},
{
    /* 14 */
    commandExample : "->max",
    onlyIn: [
        config.JogoMinimalistaId, 
        config.botTestesId
    ],

    description : "???"
},
{
    /* 15 */
    commandExample : "->natação?",
    onlyIn: [
        config.JogoMinimalistaId, 
        config.botTestesId, 
        config.facul_serverID,
        config.all_servers
    ],

    description : "???"
},
{
    /* 16 */
    commandExample : "->kmeans",
    onlyIn: [
        config.JogoMinimalistaId, 
        config.botTestesId, 
        config.facul_serverID
    ],

    description : "???"
},

/* IMAGINA COIN COMMANDS*/
{
    /* 17 */
    commandExample : "->ic",
    onlyIn: [
        config.JogoMinimalistaId, 
        config.botTestesId, 
        config.facul_serverID,
        config.all_servers
    ],

    description : "Mostra os comandos do ImaginaCoin"
}]

const commandsMinigames = [{
    /* 0 */
    commandExample : "->yt",
    onlyIn: [
        config.JogoMinimalistaId, 
        config.botTestesId, 
        config.facul_serverID,
        config.all_servers
    ],

    description : "Para assistir youtube com os amiguinhos em call"
},
{
    /* 1 */
    commandExample : "->poker",
    onlyIn: [
        config.JogoMinimalistaId, 
        config.botTestesId, 
        config.facul_serverID,
        config.all_servers
    ],

    description : "Jogar aquele pokerzão em call"
},
{
    /* 2 */
    commandExample : "->betrayal",
    onlyIn: [
        config.JogoMinimalistaId, 
        config.botTestesId, 
        config.facul_serverID,
        config.all_servers
    ],

    description : "Jogar o among us de baixo orçamento"
},
{
    /* 3 */
    commandExample : "->fishing",
    onlyIn: [
        config.JogoMinimalistaId, 
        config.botTestesId, 
        config.facul_serverID,
        config.all_servers
    ],

    description : "Jogar um jogo de pescaria muito brabo mesmo, confia"
},
{
    /* 4 */
    commandExample : "->chess",
    onlyIn: [
        config.JogoMinimalistaId, 
        config.botTestesId, 
        config.facul_serverID,
        config.all_servers
    ],

    description : "Jogar um Xadrezin brabo"
}]

const commandsIC = [{ 
    /* 0 */
    commandExample : "->conta",
    onlyIn: [
        config.JogoMinimalistaId, 
        config.botTestesId, 
        config.facul_serverID,
        config.all_servers
    ],

    description : "Vê as informações da sua conta"
},
{
    /* 1 */
    commandExample : "->criar",
    onlyIn: [
        config.JogoMinimalistaId,
        config.botTestesId, 
        config.facul_serverID,
        config.all_servers
    ],

    description : "Cria uma conta, com saldo inicial de 10.00"
},
{
    /* 2 */
    commandExample : "->transferir [valor] [Discord Id da pessoa] [Id da conta]",
    onlyIn: [
        config.JogoMinimalistaId, 
        config.botTestesId, 
        config.facul_serverID,
        config.all_servers
    ],

    description : "Transfere uma quantia em imaginacoin para a pessoa com esse Discord ID ou com esse id da conta"
}]

module.exports = {commands, commandsMinigames, commandsIC, commandUnavailable};