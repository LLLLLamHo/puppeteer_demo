
let store = require( './store' );

//初始化对象
function initStore( pageName ) {
    return new Promise( ( resolve, reject ) => {
        store[pageName] = {
            js: {},
            css: {},
            png: {},
            jpg: {},
            xhr: {},
            base64: {}
        };
        resolve();
    } )

}

//记录base64
function setBase64Static( pageName, urlName, data ) {
    if(store[pageName]){
        store[pageName].base64[urlName] = data;
    }else{
        initStore(pageName)
        .then(() => {
            setBase64Static(pageName, urlName, data);
        })
    }
}

//记录js
function setJsStatic( pageName, urlName, data ) {
    if(store[pageName]){
        store[pageName].js[urlName] = data;
    }else{
        initStore(pageName)
        .then(() => {
            setJsStatic(pageName, urlName, data);
        })
    }
}

//记录css
function setCssStatic( pageName, urlName, data ) {
    if(store[pageName]){
        store[pageName].css[urlName] = data;
    }else{
        initStore(pageName)
        .then(() => {
            setCssStatic(pageName, urlName, data);
        })
    }
}

//记录png
function setPngStatic( pageName, urlName, data ) {
    if(store[pageName]){
        store[pageName].png[urlName] = data;
    }else{
        initStore(pageName)
        .then(() => {
            setPngStatic(pageName, urlName, data);
        })
    }
}

//记录jpg
function setJpgStatic( pageName, urlName, data ) {
    if(store[pageName]){
        store[pageName].jpg[urlName] = data;
    }else{
        initStore(pageName)
        .then(() => {
            setJpgStatic(pageName, urlName, data);
        })
    }
}

//记录xhr
function setXhrStatic( pageName, urlName, data ) {
    if(store[pageName]){
        store[pageName].xhr[urlName] = data;
    }else{
        initStore(pageName)
        .then(() => {
            setXhrStatic(pageName, urlName, data);
        })
    }
}

//获取store属性
function getStore( arg ) {

    if ( arg.length == 0 ) {
        return store;
    }
    else if ( arg.length == 1 ) {
        return store[arg[0]];
    }
    else if ( arg.length == 2 ) {
        return store[arg[0]][arg[1]];
    }
    else {
        let currData = store[arg[0]][arg[1]];
        if ( currData ) {
            for ( let key in currData ) {
                if ( key && key.indexOf( [arg[2]] ) >= 0 ) {
                    return currData[key];
                }
            }
        } else {
            return null;
        }
    }
}




module.exports = { getStore, initStore, setJsStatic, setCssStatic, setPngStatic, setJpgStatic, setXhrStatic, setBase64Static };