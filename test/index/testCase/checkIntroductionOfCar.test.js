const chai = require( 'chai' ),
    expect = chai.expect;

const timeout = require( '../../../tool/timeout' );
const { localStorage } = require( '../../../tool/localStore' );
const { getXhrData } = require( '../../../tool//getXhrData' );

function checkIntroductionOfCar( page ) {

    return new Promise( async ( resolve, reject ) => {

        //获取ls里面的参数，是否有存在取还车信息
        let getCityData = {
            id: await localStorage.getItem( page, 'm_get_city' ),
            name: await localStorage.getItem( page, 'm_get_city_name' ),
            name_en: await localStorage.getItem( page, 'm_get_city_name_en' ),
            state: await localStorage.getItem( page, 'm_get_city_state' )
        }

        let returnCityData = {
            id: await localStorage.getItem( page, 'm_return_city' ),
            name: await localStorage.getItem( page, 'm_return_city_name' ),
            name_en: await localStorage.getItem( page, 'm_return_city_name_en' ),
            state: await localStorage.getItem( page, 'm_return_city_state' )
        }

        let singleCardBox = await page.$( '.singleCard-box' );
        let slideCardBox = await page.$( '.slideCard-box' );
        let carItem = await page.$$( '.card-item' );

        let xhrData = await getXhrData( 'index', 'xhr', 'topicCar.php' );
        xhrData = xhrData.response.data;

        await timeout( 1000 );

        await resolve( {
            xhrData: xhrData,
            singleCardBox: singleCardBox,
            slideCardBox: slideCardBox,
            getCityData: getCityData,
            returnCityData: returnCityData,
            carItem: carItem
        } );
    } )
        .then( ( data ) => {

            let { xhrData, singleCardBox, slideCardBox, getCityData, returnCityData, carItem } = data;

            if ( getCityData.id == null && returnCityData.id == null && xhrData.isDefault ) {
                expect( singleCardBox ).to.be.null;
                expect( slideCardBox ).to.be.not.null;
                expect( xhrData.dataList.length ).to.equal( carItem.length );
            } else {
                expect( singleCardBox ).to.be.not.null;
                expect( slideCardBox ).to.be.null;
                //选择完城市后检测
            }
        } )
}

module.exports = checkIntroductionOfCar;