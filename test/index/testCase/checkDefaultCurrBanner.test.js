const chai = require( 'chai' ),
    expect = chai.expect;

function checkTabCurrStatus( page ) {

    return new Promise( async ( resolve, reject ) => {
        //获取banner数据
        const TOP_BANNER_DATA = await page.evaluate( () => top_banner );
        //获取每个img的src的值
        let imgSrcList = await page.evaluate(() => {
            let imgSrcList = [];
            let imgElements = document.querySelectorAll( '.J-banner .swiper-slide' );
            for ( let i = 0; i < imgElements.length; i++ ) { 
                let obj = {
                    url: imgElements[i].childNodes[0].href,
                    img: imgElements[i].childNodes[0].childNodes[0].src
                }
                imgSrcList.push( obj );
            }
            return imgSrcList;
        });
        await resolve( {
            bannerData: TOP_BANNER_DATA,
            imgSrcList: imgSrcList
        });
    } )
        .then( (data) => {
            expect(data.imgSrcList).to.deep.include.members(data.bannerData)
        } )
}

module.exports = checkTabCurrStatus;