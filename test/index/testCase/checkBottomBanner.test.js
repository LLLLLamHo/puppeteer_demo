const chai = require( 'chai' ),
    expect = chai.expect;
const colors = require( 'colors' );

const timeout = require( '../../../tool/timeout' );
const store = require( '../../../tool/staticInfoStore/store' );
const { getXhrData } = require( '../../../tool/getXhrData' );


function checkSelectionOfActivities( page ) {

    return new Promise( async ( resolve, reject ) => {

        //获取页面元素
        const bottomBannerBox = await page.$( '.bottom-banner' );
        let uiData = null;

        //获取接口数据
        let xhrData = await getXhrData( 'index', 'xhr', 'baseInfo.php' );
        
        const bottomBannerData = await xhrData.response.data.bottomActive;

        if ( await !bottomBannerData ) {
            await console.log( '获取数据有问题！' );
            await reject( {
                xhrData: bottomBannerData,
                elem: bottomBannerBox,
                uiData: uiData
            } );
        }

        if ( bottomBannerBox && !bottomBannerData ) {
            await console.log( '有数据没有元素' );
            await reject( {
                xhrData: bottomBannerData,
                elem: bottomBannerBox,
                uiData: uiData
            } );
        }

        await timeout( 1000 );

        uiData = await page.evaluate( async () => {

            let test_bottomBannerList = document.querySelectorAll( '.bottom-banner .swiper-slide a' );
            let data = [];
            for ( let i = 0; i < test_bottomBannerList.length; i++ ) {
                let url = test_bottomBannerList[i].href;
                let img = test_bottomBannerList[i].childNodes[0].childNodes[0].src;
                data.push( {
                    url: url,
                    img: img
                } );
            }

            return data;
        } );

        await resolve( {
            xhrData: bottomBannerData,
            elem: bottomBannerBox,
            uiData: uiData
        } );
    } )
        .then( ( data ) => {

            expect( data.xhrData ).to.be.not.null;
            expect( data.elem ).to.be.not.null;
            expect( data.uiData ).to.be.not.null;

            //都不为null进行ui数据和xhr数据每一项的断言
            if ( data.xhrData && data.elem && data.uiData ) {

                for ( let i = 0; i < data.xhrData.length; i++ ) {
                    let currXhrData = data.xhrData[i];
                    let currUiData = data.uiData[i];
                    expect( currXhrData.board_pic ).to.equal( currUiData.img );
                    expect( currXhrData.board_url ).to.equal( currUiData.url );
                }
            }

        } );
}

module.exports = checkSelectionOfActivities;