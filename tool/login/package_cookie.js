
function trim( x ) {
    return x.replace( /^\s+|\s+$/gm, '' );
}

function resetValue( key, value ) {
    if ( key == 'httpOnly' ) {
        return true;
    }
    if ( key == 'expires' ) {
        return new Date( value ).getTime() / 1000;
    }
}

function package_cookie( cookieData,name ) {
    let data = [];
    for ( let i = 0; i < cookieData.length; i++ ) {
        let cookieItems = cookieData[i].split( ';' );
        let currCookieData = {};
        for ( let k = 0; k < cookieItems.length; k++ ) {

            let item = cookieItems[k].split( '=' );

            if ( k == 0 ) {
                currCookieData.name = trim( item[0] );
                currCookieData.value = trim( item[1] );
            } else {
                let key = trim( item[0] );
                let value = item[1] instanceof String ? trim( item[1] ) : item[1];
                value = resetValue( key, value );
                currCookieData[key] = value;
            }
        }

        if ( currCookieData.secure == null || currCookieData.secure == undefined ) {
            currCookieData.secure = false;
        }

        if ( currCookieData.domain == null || currCookieData.domain == undefined ) {
            currCookieData.domain = '.zuzuche.net';
        }

        if ( currCookieData.path == null || currCookieData.path == undefined ) {
            currCookieData.path = '/';
        }

        if ( currCookieData.httpOnly == null || currCookieData.httpOnly == undefined ) {
            currCookieData.httpOnly = false;
        }

        data.push( currCookieData );
    }

    //额外加一个cookie
    data.push( {
        name: '_cpan',
        value: `${name}`,
        domain: '.zuzuche.net',
        path: '/',
        expires: ( new Date().getTime() + 1000 * 60 * 60 * 24 ) / 1000,
        httpOnly: false,
        secure: false
    } );

    return data;
}

module.exports = package_cookie;