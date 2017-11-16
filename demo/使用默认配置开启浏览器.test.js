const Pikachu = require( '../lib/Pikachu' );

Pikachu.openBrowser()
    .then( async ( browser ) => {

        let page = await browser.newPage();
        await console.log(browser)
    } );