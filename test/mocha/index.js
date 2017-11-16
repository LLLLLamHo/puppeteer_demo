var spawn = require( 'child_process' ).spawn;

var args = [
    "/Users/lamho/Desktop/puppeteer/node_modules/mocha/bin/mocha",
    "-u",
    "tdd",
    "--timeout",
    "999999",
    "--colors",
    "/Users/lamho/Desktop/puppeteer/test/mocha/a111.js"
];

var proc = spawn( process.execPath,
    args,
    { stdio: 'inherit' }
);

proc.on( 'exit', function ( code, signal ) {
    process.on( 'exit', function () {
        if ( signal ) {
            process.kill( process.pid, signal );
        } else {
            process.exit( code );
        }
    } );
} );