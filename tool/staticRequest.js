
const {
    initStore,
    setJsStatic,
    setCssStatic,
    setPngStatic,
    setJpgStatic,
    setXhrStatic,
    setBase64Static
} = require( './staticInfoStore/action' );

async function staticRequest( page, pageName ) {
    await initStore( pageName );
    await page.setRequestInterceptionEnabled( true );

    //捕获请求的响应数据体
    page.on( 'request', interceptedRequest => {

        if ( new RegExp( 'data:image\/(png|jpeg|gif|jpg);base64' ).test( interceptedRequest.url ) ) {
            setBase64Static( pageName, interceptedRequest.url, {
                status: 'padding'
            } );
        }
        else if ( new RegExp( '\.js' ).test( interceptedRequest.url ) ) {
            setJsStatic( pageName, interceptedRequest.url, {
                status: 'padding'
            } );
        } else if ( new RegExp( '\.css' ).test( interceptedRequest.url ) ) {
            setCssStatic( pageName, interceptedRequest.url, {
                status: 'padding'
            } );
        } else if ( new RegExp( '\.png' ).test( interceptedRequest.url ) ) {
            setPngStatic( pageName, interceptedRequest.url, {
                status: 'padding'
            } );
        } else if ( new RegExp( '\.jpg' ).test( interceptedRequest.url ) ) {
            setJpgStatic( pageName, interceptedRequest.url, {
                status: 'padding'
            } );
        } else if ( new RegExp( '\.php' ).test( interceptedRequest.url ) ) {
            setXhrStatic( pageName, interceptedRequest.url, {
                status: 'padding'
            } );
        }

        interceptedRequest.continue();
    } );


    //捕获请求的响应数据体
    page.on( 'response', response => {

        if ( new RegExp( 'data:image\/(png|jpeg|gif|jpg);base64' ).test( response.url ) ) {
            setBase64Static( pageName, response.url, {
                status: 'done'
            } );
        }
        else if ( new RegExp( '\.js' ).test( response.url ) ) {
            setJsStatic( pageName, response.url, {
                status: 'done'
            } );
        } else if ( new RegExp( '\.css' ).test( response.url ) ) {
            setCssStatic( pageName, response.url, {
                status: 'done'
            } );
        } else if ( new RegExp( '\.png' ).test( response.url ) ) {
            setPngStatic( pageName, response.url, {
                status: 'done'
            } );
        } else if ( new RegExp( '\.jpg' ).test( response.url ) ) {
            setJpgStatic( pageName, response.url, {
                status: 'done'
            } );
        } else if ( new RegExp( '\.php' ).test( response.url ) ) {

            //记录xhr返回数据
            response.text().then( function ( data ) {
                if ( data && data != '' ) {
                    data = JSON.parse( data );
                }
                setXhrStatic( pageName, response.url, {
                    status: 'done',
                    response: data
                } );
            } );
        }
    } );
}

module.exports = staticRequest;