const chai = require( 'chai' ),
    expect = chai.expect;

const timeout = require( '../../../tool/timeout' );
const store = require( '../../../tool/staticInfoStore/store' );

function changeTab( page ) {

    return new Promise( async ( resolve, reject ) => {


        const rentCarTab = await page.$( '.tabs .left-item' );
        const poiCarTab = await page.$( '.tabs .right-item' );

        await timeout( 1000 );

        if ( poiCarTab ) { 
            poiCarTab.click();
        }

        await timeout( 2000 );

        const poi_pop = await page.$( '.poi_entry_modal .poi_entry_modal_close' );
        
        if ( poi_pop ) { 
            poi_pop.click();
        }

        let rentTopBox = await page.$( '.rentCar-box' );
        let POITopBox = await page.$( '.poi-box' );
        let rentContent = await page.$( '.rentCarContent-box' );
        let poiContent = await page.$( '.PoiContent-box' );

        //获取当前国际租车tab的className
        let rentContentClassName = await page.evaluate( async ( rentContent ) => {
            const tabClassName = rentContent.className;
            return tabClassName;
        }, rentContent );


        //获取banner数据
        const POI_BANNER_DATA = await page.evaluate( () => poi_banner );
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


        if ( rentCarTab ) { 
            rentCarTab.click();
        }

        await resolve( {
            rentTopBox: rentTopBox,
            POITopBox: POITopBox,
            rentContent: rentContent,
            poiContent: poiContent,
            rentContentClassName: rentContentClassName,
            bannerData: POI_BANNER_DATA,
            imgSrcList: imgSrcList
        } );
    } )
    .then( ( data ) => {

        let { rentTopBox, POITopBox, rentContent, poiContent, rentContentClassName } = data;

        expect( POITopBox ).to.not.be.null;
        expect( poiContent ).to.not.be.null;

        expect( rentTopBox ).to.be.null;

        expect(rentContentClassName).to.include('hidden');
        expect( data.imgSrcList ).to.deep.include.members( data.bannerData );
    } );
}

module.exports = changeTab;