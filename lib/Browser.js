const puppeteer = require( 'puppeteer' );
const devices = require( 'puppeteer/DeviceDescriptors' );
const iPhone = devices['iPhone 6'];


class Browser {

    /**
     * @static
     * @param {Object} option 
     * @memberof Launcher
     */
    static async open( option ) {
        return await puppeteer.launch( option )
            .then( async browser => {
                return browser;
            } );
    }

    /**
     * @static
     * @param {!Object=} openPageOpt //开启页面的基本配置
     * @param {!Object=} pageOpt 
     * @returns {!Promise<!Browser>}
     * @memberof Browser
     */
    static async openPage( openPageOpt, pageOpt ) {
        return new Promise( function ( resolve, reject ) {
            puppeteer.launch( { headless: false, devtools: true } )
                .then( async browser => {
                    const page = await browser.newPage();
                    try {
                        await page.emulate( iPhone );

                        await page.goto( 'http://m.zuzuche.com' );

                        resolve( {
                            pageObj: page,
                            browserObj: browser
                        } );
                    } catch ( e ) {
                        console.log( 'sf err:', e );
                        reject( null );
                    }
                } );
        } );
    }

}

module.exports = Browser;