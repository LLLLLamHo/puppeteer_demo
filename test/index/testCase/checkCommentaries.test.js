const chai = require( 'chai' ),
expect = chai.expect;
const colors = require( 'colors' );

const timeout = require( '../../../tool/timeout' );
const store = require( '../../../tool/staticInfoStore/store' );
const { getXhrData } = require( '../../../tool/getXhrData' );


function checkCommentaries( page ) {

return new Promise( async ( resolve, reject ) => {

    //获取页面元素
    const commentBox = await page.$( '.comment-box' );
    let uiData = null;

    //获取接口数据
    let xhrData = await getXhrData( 'index', 'xhr', 'baseInfo.php' );
    
    const commentBoxData = await xhrData.response.data.reviewsInfo;

    if ( await !commentBox ) {
        await console.log( '获取数据有问题！' );
        await reject( {
            xhrData: commentBoxData,
            elem: commentBox,
            uiData: uiData
        } );
    }

    if ( commentBox && !commentBoxData ) {
        await console.log( '有数据没有元素' );
        await reject( {
            xhrData: commentBoxData,
            elem: commentBox,
            uiData: uiData
        } );
    }

    await timeout( 1000 );

    uiData = await page.evaluate( async () => {

        let test_commentBox = document.querySelector('.comment-content .count');
        let count = test_commentBox.innerText;

        let url = document.querySelector('.comment-box a').href;

        return {
            text: count,
            url: url
        };
    } );

    await resolve( {
        xhrData: commentBoxData,
        elem: commentBox,
        uiData: uiData
    } );
} )
    .then( ( data ) => {

        expect( data.xhrData ).to.be.not.null;
        expect( data.elem ).to.be.not.null;
        expect( data.uiData ).to.be.not.null;

        if ( data.xhrData && data.elem && data.uiData ) {
            expect( data.uiData.text ).to.include( data.xhrData.num );
            expect( data.uiData.url ).to.include( data.xhrData.url );
        }

    } );
}

module.exports = checkCommentaries;