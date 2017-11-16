const puppeteer = require( 'puppeteer' );
const devices = require( 'puppeteer/DeviceDescriptors' );
const iPhone = devices['iPhone 6'];

class Page {

    static async newPage( browser ) {
        const page = await browser.newPage();
        return await page;
    }
}

module.exports = Page;