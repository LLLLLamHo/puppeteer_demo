
const Page = require( './Page' );

class CreateBrowserObject {

    constructor( Browser ) {
        this._Browser = Browser;
    }
    /**
     * 
     * 
     * @memberof CreateBrowserObject
     */
    newPage() {
        return new Promise(async ( resolve, rejuect ) => {
            let page = await Page.newPage( this._Browser );
            await resolve( page );
        } )
            .then( (page) => { 
                return page;
            })
    }

}

module.exports = CreateBrowserObject;