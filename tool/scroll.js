function scrollToY( page, scrollHeight, elem ) {

    return new Promise( async ( resolve, reject ) => {

        let scrollElem = await page.$( 'html' );
        if ( elem ) {
            scrollElem = await page.$( elem );
        }

        await page.evaluate( async ( scrollElem, scrollHeight ) => {
            scrollElem.scrollTop = scrollHeight;
        }, scrollElem, scrollHeight );

        await resolve();
    } );

}

function scrollToX( page, scrollHeight, elem ) {

    return new Promise( async ( resolve, reject ) => {

        let scrollElem = await page.$( 'html' );
        if ( elem ) {
            scrollElem = await page.$( elem );
        }

        await page.evaluate( async ( scrollElem, scrollHeight ) => {
            scrollElem.scrollLeft = scrollHeight;
        }, scrollElem, scrollHeight );

    } );

}

function getScrollHeight( page ) {

    return new Promise( async ( resolve, reject ) => {

        scrollHeight = await page.evaluate( async () => {

            let scrollHeight = 0, bodyScrollHeight = 0, documentScrollHeight = 0;
            if ( document.body ) {
                bodyScrollHeight = document.body.scrollHeight;
            }
            if ( document.documentElement ) {
                documentScrollHeight = document.documentElement.scrollHeight;
            }
            scrollHeight = ( bodyScrollHeight - documentScrollHeight > 0 ) ? bodyScrollHeight : documentScrollHeight;
            return scrollHeight;
        } );
        await resolve( scrollHeight );
    } ).then( ( scrollHeight ) => {
        return scrollHeight;
    } );
}

function getWindowHeight() {
    var windowHeight = 0;
    if ( document.compatMode == "CSS1Compat" ) {
        windowHeight = document.documentElement.clientHeight;
    } else {
        windowHeight = document.body.clientHeight;
    }
    return windowHeight;
}




module.exports = { scrollToX, scrollToY, getScrollHeight, getWindowHeight }