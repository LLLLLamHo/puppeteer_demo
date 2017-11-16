const chai = require( 'chai' ),
    expect = chai.expect;
const colors = require( 'colors' );

const timeout = require( '../../../tool/timeout' );
const store = require( '../../../tool/staticInfoStore/store' );
const { getXhrData } = require( '../../../tool/getXhrData' );


function checkSelectionOfActivities( page ) {

    return new Promise( async ( resolve, reject ) => {

        //获取页面元素
        const selectionOfActivitiesBox = await page.$( '.activity-box' );
        let uiData = null;

        //获取接口数据
        let xhrData = await getXhrData( 'index', 'xhr', 'baseInfo.php' );

        const selectionOfActivitiesData = await xhrData.response.data.topicActive;
        if ( await !selectionOfActivitiesData ) {
            await console.log( '获取数据有问题！' );
            await reject( {
                xhrData: selectionOfActivitiesData,
                elem: selectionOfActivitiesBox,
                uiData: uiData
            } );
        }

        if ( selectionOfActivitiesData && !selectionOfActivitiesBox ) {
            await console.log( '有数据没有元素' );
            await reject( {
                xhrData: selectionOfActivitiesData,
                elem: selectionOfActivitiesBox,
                uiData: uiData
            } );
        }

        //可能会有lazyload，延迟2秒再获取
        await page.evaluate( async ( selectionOfActivitiesBox ) => {

            //解决lazyload图片获取不到
            let test_offsetTop = selectionOfActivitiesBox.offsetTop;
            let test_height = selectionOfActivitiesBox.offsetHeight
            let test_step = test_height / 50;
            let windowHeight = window.innerHeight;

            let test_html = document.querySelector( 'html' );

            test_html.scrollTop = test_offsetTop;

            let timer = setInterval( () => {
                if ( test_html.scrollHeight - windowHeight > test_html.scrollTop + test_step ) {
                    test_html.scrollTop = test_html.scrollTop + test_step;
                } else {
                    clearInterval( timer );
                }
            }, 100 );

        }, selectionOfActivitiesBox );

        await timeout( 3000 );

        //获取当前元素的必要信息
        uiData = await page.evaluate( async () => {

            let test_uiData = [];
            let test_list = document.querySelectorAll( '.activity-box .activity-item' );

            for ( let i = 0; i < test_list.length; i++ ) {
                let item = test_list[i];
                let url = item.childNodes[0].href;
                let img = item.childNodes[0].childNodes[1].childNodes[0].src;
                let text = item.childNodes[0].childNodes[2].innerHTML;
                test_uiData.push( {
                    url: url,
                    img: img,
                    text: text
                } );
            }
            return test_uiData;
        } );

        await resolve( {
            xhrData: selectionOfActivitiesData,
            elem: selectionOfActivitiesBox,
            uiData: uiData
        });
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
                    expect( currXhrData.board_title ).to.equal( currUiData.text );
                    expect( currXhrData.board_url ).to.equal( currUiData.url );
                }
            }

        } );
}

module.exports = checkSelectionOfActivities;