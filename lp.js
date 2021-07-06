const pupp = require('puppeteer');
const config = require("./config.json");

async function getLPRanking() {
    let LPRanking = ["Ranking das linguagens de programação mais usadas de acordo com o github:"];
    const browser = await pupp.launch();
    const page = await browser.newPage();
    page.goto(config.LPRanking_url);
    await page.waitForNavigation();

    for (let i = 0; i < 10; i++){
        let lp = await page.waitForSelector("#table > table > tbody > tr:nth-child(" + (2 + i) + ") > td:nth-child(3)");
        const lpValue = await (await lp.getProperty('innerText')).jsonValue();
        LPRanking.push((i + 1) + "ª " + lpValue);

    }

    await browser.close();
    return LPRanking;

}

module.exports = {getLPRanking};