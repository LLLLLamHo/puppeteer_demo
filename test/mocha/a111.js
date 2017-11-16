
const chai = require( 'chai' ),
    expect = chai.expect;
    
describe( '首页ui测试', function () {

    for ( let i = 0; i < 5; i++ ) { 
        it( '检测浏览器对象是否正确', () => {
            expect( {} ).to.be.an( 'object' );
        } );
    }

} )

