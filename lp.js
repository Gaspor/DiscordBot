require('dotenv').config();
const pupp = require('puppeteer');
const pupUtils = require("./commands");

async function getLPRanking() {
    
    let LPRanking = ["Ranking das linguagens de programação mais usadas de acordo com o github:"];
    const browser = await pupp.launch(pupUtils.chromeOptions);
    const page = await browser.newPage();
    page.goto(process.env.LPRANKING_URL);
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