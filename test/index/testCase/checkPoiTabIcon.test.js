const chai = require( 'chai' ),
    expect = chai.expect;
const colors = require( 'colors' );

const timeout = require( '../../../tool/timeout' );
const store = require( '../../../tool/staticInfoStore/store' );
const { getXhrData } = require( '../../../tool/getXhrData' );


function checkPoiTabIcon( page ) {

    return new Promise( async ( resolve, reject ) => {

        const poiTabIconBox = await page.$( '.poiTabIcon-box' );

        //获取当前poi的tips里面的数量
        let poiTabIconLength = await page.evaluate( async () => {
            const poiTabIconLength = document.querySelectorAll( '.poiTabIcon-box span' ).length;
            return poiTabIconLength;
        } );

        //获取接口数据
        let xhrData = await getXhrData( 'index', 'xhr', 'baseInfo.php' );

        await resolve( {
            xhrData: xhrData,
            poiTabIconLength: poiTabIconLength,
            poiTabIconBox: poiTabIconBox
        } );
    } )
        .then( ( data ) => {

            let { xhrData, poiTabIconLength, poiTabIconBox } = data;
            let xhrIcon = xhrData.response.data.runText;

            //返回的数据是否为一个数组
            expect(xhrIcon).to.be.a('array');

            if ( xhrIcon.length == 0 ) {
                expect( poiTabIconBox ).to.be.null;
            } else { 
                expect( poiTabIconLength ).to.equal( xhrIcon.length );
            }
            
        } );
}

module.exports = checkPoiTabIcon;