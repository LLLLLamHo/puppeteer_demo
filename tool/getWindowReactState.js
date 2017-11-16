
async function getWindowReactState( page ) {
    let reactState = await page.evaluate( () => {
        return window.reactState;
    } );
    return reactState;
}

module.exports = getWindowReactState;