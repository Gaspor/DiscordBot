require('dotenv').config();
const pupp = require('puppeteer');
const pupUtils = require("./commands");

async function getDolar() {
    const browser = await pupp.launch(pupUtils.chromeOptions);
    const page = await browser.newPage();
    page.goto(process.env.DOLAR_URL);
    await page.waitForNavigation();

    const dolar = await page.waitForSelector('#knowledge-currency__updatable-data-column > div.b1hJbf > div.dDoNo.ikb4Bb.gsrt.gzfeS > span.DFlfde.SwHCTb');
    const dolarValue = await (await dolar.getProperty('innerText')).jsonValue();
    await browser.close();
    return await dolarValue;

}

module.exports = {getDolar};