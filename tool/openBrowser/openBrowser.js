const puppeteer = require( 'puppeteer' );
const devices = require( 'puppeteer/DeviceDescriptors' );
const iPhone = devices['iPhone 6'];
const staticRequest = require( '../staticRequest' );
const login = require( '../login/login' );
const setCookie = require( '../setCookie' );

function openBrowser( opt ) {
    return new Promise( function ( resolve, reject ) {
        puppeteer.launch( { headless: false } )
            .then( async browser => {
                const page = await browser.newPage();
                try {
                    await page.emulate( iPhone );
                    await staticRequest( page, opt.pageName );

                    await page.goto( opt.url );

                    if ( opt.isLogin ) {
                        let cookieData = await login( opt.loginId,opt.name );
                        await setCookie( page, cookieData );
                    }

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

module.exports = openBrowser;