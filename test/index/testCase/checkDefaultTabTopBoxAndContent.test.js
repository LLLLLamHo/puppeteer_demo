const chai = require( 'chai' ),
    expect = chai.expect;

function checkDefaultTabTopBoxAndContent( page ) {

    return new Promise( async ( resolve, reject ) => {

        let rentTopBox = await page.$( '.rentCar-box' );
        let POITopBox = await page.$( '.poi-box' );
        let rentContent = await page.$( '.rentCarContent-box' );
        let poiContent = await page.$( '.PoiContent-box' );

        //获取当前国际租车tab的className
        let rentContentClassName = await page.evaluate( async ( rentContent ) => {
            const tabClassName = rentContent.className;
            return tabClassName;
        }, rentContent );

        await resolve( {
            rentTopBox: rentTopBox,
            POITopBox: POITopBox,
            rentContent: rentContent,
            poiContent: poiContent,
            rentContentClassName: rentContentClassName
        } );
    } )
        .then( ( data ) => {

            let { rentTopBox, POITopBox, rentContent, poiContent, rentContentClassName } = data;
            
            expect( POITopBox ).to.be.null;
            expect( poiContent ).to.be.null;

            expect( rentTopBox ).to.not.be.null;
            expect( rentContent ).to.not.be.null;

            expect(rentContentClassName).to.not.include('hidden');
            
        } );
}

module.exports = checkDefaultTabTopBoxAndContent;