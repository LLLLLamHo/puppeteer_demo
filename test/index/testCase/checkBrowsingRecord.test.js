const chai = require( 'chai' ),
    expect = chai.expect;
const colors = require( 'colors' );

const timeout = require( '../../../tool/timeout' );
const { getXhrData } = require( '../../../tool/getXhrData' );


function checkBrowsingRecord( page ) {

    return new Promise( async ( resolve, reject ) => {

        const historyBtn = await page.$( '.rentCar-box .btn-group .history' );

        //获取接口数据
        let xhrData = await getXhrData( 'index', 'xhr', 'baseInfo.php' );

        await resolve( {
            xhrData: xhrData,
            historyBtn: historyBtn,
        } );
    } )
        .then( ( data ) => {

            let { xhrData, historyBtn } = data;
            let num = xhrData.response.data.trackInfo.num;

            if ( num > 0 ) {
                expect( historyBtn ).to.be.not.null;
            } else {    
                expect( historyBtn ).to.be.null;

            }
        } );
}

module.exports = checkBrowsingRecord;