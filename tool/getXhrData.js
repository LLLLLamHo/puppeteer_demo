
const { getStore } = require( './staticInfoStore/action' );
const timeout = require( './timeout' );

function getXhrData( ...arg ) {

    return new Promise( async ( resolve, reject ) => {

        //获取接口数据
        let xhrData = await getStore( arg );

        if ( arg.length < 3 ) {
            await resolve( xhrData );
            return false;
        } else {
            if ( xhrData.status != 'done' ) {
                await timeout( 2000 );
                xhrData = await getStore( arg );
                if ( xhrData.status != 'done' ) {
                    await console.log( 'baseInfo.php接口过慢'.error );
                    await reject( null );
                    return false;
                }
            }
            await resolve( xhrData );
        }
    } )
        .then( ( data ) => {
            return data;
        } );


}

//获取对象的length
function getObjectLength( data ) {
    let count = 0;
    for ( let key in data ) {
        if ( data.hasOwnProperty( key ) ) {
            count++;
        }
    }
    return count;
}

module.exports = { getXhrData, getObjectLength };