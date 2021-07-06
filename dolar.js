const pupp = require('puppeteer');
const config = require("./config.json");

async function getDolar() {
    const browser = await pupp.launch();
    const page = await browser.newPage();
    page.goto(config.dolar_url);
    await page.waitForNavigation();

    const dolar = await page.waitForSelector('#knowledge-currency__updatable-data-column > div.b1hJbf > div.dDoNo.ikb4Bb.gsrt.gzfeS > span.DFlfde.SwHCTb');
    const dolarValue = await (await dolar.getProperty('innerText')).jsonValue();
    await browser.close();
    return await dolarValue;

}

module.exports = {getDolar};