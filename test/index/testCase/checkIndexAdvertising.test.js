const chai = require( 'chai' ),
    expect = chai.expect;
const colors = require( 'colors' );

const timeout = require( '../../../tool/timeout' );
const store = require( '../../../tool/staticInfoStore/store' );
const { getXhrData } = require( '../../../tool/getXhrData' );


function checkIndexAdvertising( page ) {

    return new Promise( async ( resolve, reject ) => {

        let advertisingBox = await page.$( '.advertising-box' );
        let advertisingBoxCloseBtn = await page.$( '.advertising-close-btn' );
        let redPacketBox = await page.$( '.redPacket-box' );
        let redPacketBoxCloseBtn = await page.$( '.close-redPacket' );

        if ( advertisingBox ) {
            await advertisingBoxCloseBtn.click();
        }

        if ( redPacketBox ) {
            await redPacketBoxCloseBtn.click();
        }

        await timeout( 2000 );

        //获取接口数据
        let xhrData = await getXhrData( 'index', 'xhr', 'indexCoupon.php' );
       

        let popData = null;

        if ( xhrData && xhrData.response.code == 0 ) {
            popData = xhrData.response.data;
        }

        await timeout( 2000 );

        await resolve( {
            popData: popData,
            advertisingBox: advertisingBox,
            redPacketBox: redPacketBox
        } );
    } )
        .then( (data) => {

            //根据返回的数据检查是是否有弹出窗口
            if ( data.popData ) {
                if ( data.popData.type == 'advertising' ) {
                    expect( data.advertisingBox ).to.be.not.null;
                    expect( data.redPacketBox ).to.be.null;
                } else { 
                    expect( data.advertisingBox ).to.be.null;
                    expect( data.redPacketBox ).to.be.not.null;
                }
            } else { 
                expect( data.advertisingBox ).to.be.null;
                expect( data.redPacketBox ).to.be.null;
            }

        } );
}

module.exports = checkIndexAdvertising;