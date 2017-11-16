const Pikachu = require( '../lib/Pikachu' );


Pikachu.openBrowser( {
    devtools: false
} )
    .then( ( browser ) => {
        console.log( browser );
    } );


