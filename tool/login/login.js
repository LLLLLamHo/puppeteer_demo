const http = require( 'http' );
const package_cookie = require( './package_cookie' );
const colors = require( 'colors' );

let cookieData = null;

function login( id,name ) {

    return new Promise( ( resolve, reject ) => {
        let req = http.request( {
            hostname: 't.zuzuche.net',
            port: 80,
            path: `http://t.zuzuche.net/t_login.php?user_id=${id}`,
            method: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Cookie': `_cpan=${name};`,
            }
        }, ( res ) => {
            let html = '';

            res.setEncoding( 'utf8' );

            res.on( 'data', ( chunk ) => {
                let cookies = res.headers['set-cookie'];
                if ( cookies instanceof Array ) {
                    cookieData = package_cookie( cookies,name );
                } else {
                    console.log( '返回数据有问题！'.error )
                }
            } );

            res.on( 'end', () => {
                if ( cookieData ) {
                    console.log( '登录成功'.green );
                } else {
                    console.log( '登录失败'.red );
                }
                resolve( cookieData );
            } )

        } );

        req.on( 'error', ( e ) => {
            console.error( '出错了,' + e.message );
        } );
        req.write( '' );
        req.end();
    } )
        .then( (cookieData) => {
            return cookieData;
        } );
}

module.exports = login;


