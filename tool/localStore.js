let localStorage = {

    setItem: ( page, itemName, data ) => {
        return new Promise( async ( resolve, reject ) => {

            await page.evaluate( ( itemName, data ) => {
                window.localStorage.setItem( itemName, data );
            }, itemName, data );

            resolve();

        } );
    },
    getItem: ( page, itemName ) => {
        return new Promise( async ( resolve, reject ) => {

            let item = await page.evaluate( ( itemName ) => {
                let data = window.localStorage.getItem( itemName );
                return data;
            }, itemName );

            resolve( item ? item : null );

        } )
            .then( ( data ) => {
                return data;
            } );
    },
    removeItem: ( page, itemName ) => {
        return new Promise( async ( resolve, reject ) => {

            await page.evaluate( ( itemName ) => {
                window.localStorage.removeItem( itemName );
            }, itemName );

            resolve();

        } );
    }

};

let sessionStorage = {

    setItem: ( page, itemName, data ) => {
        return new Promise( async ( resolve, reject ) => {

            await page.evaluate( ( itemName, data ) => {
                window.sessionStorage.setItem( itemName, data );
            }, itemName, data );

            resolve();

        } );
    },
    getItem: ( page, itemName ) => {
        return new Promise( async ( resolve, reject ) => {

            let item = await page.evaluate( ( itemName ) => {
                let data = window.sessionStorage.getItem( itemName );
                return data;
            }, itemName );

            resolve( item ? item : null );

        } )
            .then( ( data ) => {
                return data;
            } );
    },
    removeItem: ( page, itemName ) => {
        return new Promise( async ( resolve, reject ) => {

            await page.evaluate( ( itemName ) => {
                window.sessionStorage.removeItem( itemName );
            }, itemName );
            
            resolve();

        } );
    }

};



module.exports = { localStorage, sessionStorage };