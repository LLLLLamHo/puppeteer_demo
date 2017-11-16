
const chai = require( 'chai' ),
    expect = chai.expect;
const colors = require( 'colors' );
const timeout = require( '../../tool/timeout' );

const describe = require( 'mocha' ).describe;

//打开浏览器
const openBrowser = require( '../../tool/openBrowser/openBrowser.js' );
//测试默认激活tab
const checkDefaultTabCurrStatus = require( './testCase/checkDefaultTabCurrStatus.test.js' );
//测试默认显示的banner
const checkDefaultCurrBanner = require( './testCase/checkDefaultCurrBanner.test.js' );
//测试默认显示的主体内容是否显示
const checkDefaultTabTopBoxAndContent = require( './testCase/checkDefaultTabTopBoxAndContent.test.js' );
//切换tab
const changeTab = require( './testCase/changeTab.test.js' );
//检测poi小tips
const checkPoiTabIcon = require( './testCase/checkPoiTabIcon.test.js' );
//检查浏览记录
const checkBrowsingRecord = require( './testCase/checkBrowsingRecord.test.js' );
//滚动页面
const touchRollToBottom = require( './testCase/touchRollToBottom.test.js' );
//检查首页广告弹窗
const checkIndexAdvertising = require( './testCase/checkIndexAdvertising.test.js' );
//检查精选活动
const checkSelectionOfActivities = require( './testCase/checkSelectionOfActivities.test.js' );
//检查底部banner
const checkBottomBanner = require( './testCase/checkBottomBanner.test.js' );
//检查评论数量显示是否和数据一致
const checkCommentaries = require( './testCase/checkCommentaries.test.js' );
//检查推荐车型
const checkIntroductionOfCar = require( './testCase/checkIntroductionOfCar.test.js' );


let pageObj = null,
    browserObj = null;

describe( '首页ui测试', function () {

    before( '打开浏览器', ( done ) => {
        openBrowser( {
            url: 'https://m.zuzuche.net?isTest=1',
            pageName: 'index',
            isLogin: true,
            loginId: 995154,
            name: 'linhao'
        } )
            .then( ( data ) => {
                if ( data ) {
                    pageObj = data.pageObj;
                    browserObj = data.browserObj;
                    done();
                } else {
                    console.log( '浏览器无法启动！！！'.red );
                    console.log( '请重试'.red );
                }
            } );
    } );

    it( '检测浏览器对象是否正确', () => {
        expect( browserObj ).to.be.an( 'object' );
    } );

    it( '检测页面对象是否正确', () => {
        expect( pageObj ).to.be.an( 'object' );
    } );

    it( '检查广告首页广告是否有出现', function () {
        return checkIndexAdvertising( pageObj );
    } );

    it( '检测默认激活租车Tab', function () {
        return checkDefaultTabCurrStatus( pageObj );
    } );

    it( '检测默认显示banner点击链接和图片路径', () => {
        return checkDefaultCurrBanner( pageObj );
    } );

    it( '检测默认激活租车Tab下的主体显示是否正确', () => {
        return checkDefaultTabTopBoxAndContent( pageObj );
    } );

    it( '切换到poi的tab，并检测banner是否显示正确和内容元素是否切换', () => {
        return changeTab( pageObj );
    } );

    it( '检测poi的小tips是否和返回数据一致', () => {
        return checkPoiTabIcon( pageObj );
    } );

    it( '检测浏览记录', () => {
        return checkBrowsingRecord( pageObj );
    } );

    it( '页面进行滚动，检测是否有后加载图片', () => {
        return touchRollToBottom( pageObj );
    } );

    it( '检查推介车型', () => {
        return checkIntroductionOfCar( pageObj );
    } );

    it( '检查底部banner数据是否一致', () => {
        return checkBottomBanner( pageObj );
    } );

    it( '检查评论数量显示是否和数据一致', () => {
        return checkCommentaries( pageObj );
    } );

    it( '检查精选活动ui和数据是否一致', () => {
        return checkSelectionOfActivities( pageObj );
    } );

    //todo 选择取还车地址

} );
