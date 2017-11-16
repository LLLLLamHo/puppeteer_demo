const chai = require( 'chai' ),
    expect = chai.expect;
const colors = require( 'colors' );

const timeout = require( '../../../tool/timeout' );
const store = require( '../../../tool/staticInfoStore/store' );
const { scrollToY, getScrollHeight } = require( '../../../tool/scroll' );
const { getObjectLength, getXhrData } = require('../../../tool/getXhrData');


function touchRollToBottom( page ) {

    return new Promise( async ( resolve, reject ) => {

        await timeout( 2000 );
        
        const beforePNG = await getObjectLength( await getXhrData( 'index', 'png' ) );
        const beforeJPG = await getObjectLength( await getXhrData( 'index', 'jpg' ) );

        let scrollHeight = await getScrollHeight( page );
        await scrollToY( page, scrollHeight );

        await timeout(2000);

        const afterPNG = await getObjectLength( await getXhrData( 'index', 'png' ) );
        const afterJPG = await getObjectLength( await getXhrData( 'index', 'jpg' ) );

        await resolve( {
            beforePNG: beforePNG,
            beforeJPG: beforeJPG,
            afterPNG: afterPNG,
            afterJPG: afterJPG
        } );
    } )
        .then( ( data ) => {
            if ( data.beforePNG != data.afterPNG ) {
                expect( data.afterPNG ).to.be.above( data.beforePNG );
            }
            if ( data.beforeJPG != data.afterJPG ) {
                expect( data.afterJPG ).to.be.above( data.beforeJPG );
            }
            if ( data.beforePNG == data.afterPNG && data.beforeJPG == data.afterJPG ) {
                expect( data.afterPNG ).to.be.above( data.beforePNG );
                expect( data.afterJPG ).to.be.above( data.beforeJPG );
            }
        } );
}

module.exports = touchRollToBottom;