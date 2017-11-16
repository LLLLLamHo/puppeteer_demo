const chai = require( 'chai' ),
    expect = chai.expect;

const getWindowReactState = require( '../../../tool/getWindowReactState' );

function checkTabCurrStatus( page ) {

    return new Promise( async ( resolve, reject ) => {
        // //获取banner数据
        // const poi_banner = await page.evaluate( () => poi_banner );
        // const top_banner = await page.evaluate( () => top_banner );

        //更换两个banner的按钮
        const rentCarTab = await page.$( '.tabs .left-item' );
        const poiCarTab = await page.$( '.tabs .right-item' );

        //获取当前国际租车tab的className
        let rentCarTabClassName = await page.evaluate( async ( tab ) => {
            const tabClassName = tab.className;
            return tabClassName;
        }, rentCarTab );

        //获取当前poitab的className
        let poiCarTabClassName = await page.evaluate( async ( tab ) => {
            const tabClassName = tab.className;
            return tabClassName;
        }, poiCarTab );

        //获取state
        let state = await getWindowReactState( page );
        
        await resolve( {
            rentTab: rentCarTabClassName,
            poTab: poiCarTabClassName,
            state: state
        } );
    } )
        .then( ( data ) => {
            expect( data.state.tabState ).to.has.string( 'rent' );
            expect( data.rentTab ).to.has.string( 'curr' );
            expect( data.poTab ).to.has.not.string( 'curr' );
        } )
}

module.exports = checkTabCurrStatus;