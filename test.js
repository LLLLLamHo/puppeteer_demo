const puppeteer = require( 'puppeteer' );
const devices = require( 'puppeteer/DeviceDescriptors' );
const iPhone = devices['iPhone 6'];

puppeteer.launch( { headless: false } )
.then( async browser => {
    const page = await browser.newPage();
    try {
        await page.emulate( iPhone );

        await page.goto( 'https://m.zuzuche.com?isTest=1', );

        await page.touchscreen.tap(0, 200)
        await page.touchscreen.tap(50, 100)

        
    } catch ( e ) {
        console.log( 'sf err:', e );
    }
} );