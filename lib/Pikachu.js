
const Browser = require( './Browser' );
const Page = require( './Page' );
const CreateBrowserObject = require('./CreateBrowserObject');

class Pikachu {
  /**
   * @static 开启浏览器
   * @param {!Object=} options 
   * @returns {!Promise<!Browser>}
   * @memberof Pikachu
   */
  static async openBrowser( options = {} ) {
    return new Promise( async ( resolve, reject ) => {

      let defauleOpt = {
        headless: false,
        devtools: true
      }

      let opt = Object.assign( defauleOpt, options );
      //开启浏览器
      let browser = await Browser.open( opt );

      let browserObj = await new CreateBrowserObject( browser );
      await resolve( browserObj );
    } );
  }

  /**
   * 
   * 
   * @static
   * @returns 
   * @memberof Pikachu
   */
  static puppeteer() {
    // return getPuppeteer();
  }
}

module.exports = Pikachu;