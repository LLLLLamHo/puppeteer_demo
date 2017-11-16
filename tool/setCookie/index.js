
function setCookie( page, cookieData ) {

    return new Promise( async ( resolve, reject ) => {


        // let cookie = [
        //     {
        //         name : '_cpan',
        //         value : 'linhao',
        //         domain :'.zuzuche.net',
        //         path: '/',
        //         expires: ( new Date().getTime() + 1000 * 60 * 60 * 24 ) / 1000,
        //         httpOnly: false,
        //         secure : false
        //     },
        //     {
        //         name : 'cdb_auth',
        //         value : 'geaJUbOBsm%2FFgVKXM8VqJPtuasczSjZdTykH4rWLstJPGTbx',
        //         domain :'.zuzuche.net',
        //         path: '/',
        //         expires: ( new Date().getTime() + 1000 * 60 * 60 * 24 ) / 1000,
        //         httpOnly: false,
        //         secure : false
        //     },
        //     {
        //         name : 'cdb_last_login_time',
        //         value : '1508387412',
        //         domain :'.zuzuche.net',
        //         path: '/',
        //         expires: ( new Date().getTime() + 1000 * 60 * 60 * 24 ) / 1000,
        //         httpOnly: false,
        //         secure : false
        //     },
        //     {
        //         name : 'cdb_msokey',
        //         value : '29987807056d97d2474cc4a06acad49e',
        //         domain :'.zuzuche.net',
        //         path: '/',
        //         expires: ( new Date().getTime() + 1000 * 60 * 60 * 24 ) / 1000,
        //         httpOnly: false,
        //         secure : false
        //     },
        //     {
        //         name : 'cdb_sTime',
        //         value : '2017-10-19+14%3A15%3A41',
        //         domain :'.zuzuche.net',
        //         path: '/',
        //         expires: ( new Date().getTime() + 1000 * 60 * 60 * 24 ) / 1000,
        //         httpOnly: false,
        //         secure : false
        //     },
        //     {
        //         name : 'cdb_sso_info',
        //         value : 'aE9MaVc5UzF1NEprUkhrai94Q3I4QUxLeHpZREpRQStMM3ppQWtZVXNiZU5VSGsvVE1ZRmM3d1pjUVJKeWJDMFVCQTVDNjd0TWFKcEt5R0ZJclJGNWNXOVBUOW9FeGlpYUNTOUc4RXJTb1E9Ojp%2FNhvMahY3xzHETFdy%2F2sl',
        //         domain :'.zuzuche.net',
        //         path: '/',
        //         expires: ( new Date().getTime() + 1000 * 60 * 60 * 24 ) / 1000,
        //         httpOnly: false,
        //         secure : false
        //     },
        //     {
        //         name : 'cdb_uid',
        //         value : '995154',
        //         domain :'.zuzuche.net',
        //         path: '/',
        //         expires: ( new Date().getTime() + 1000 * 60 * 60 * 24 ) / 1000,
        //         httpOnly: false,
        //         secure : false
        //     },
        //     {
        //         name : 'cdb_uid_unique_token',
        //         value : 'af931cf74a1c767bf04ff8a3b193a11e',
        //         domain :'.zuzuche.net',
        //         path: '/',
        //         expires: ( new Date().getTime() + 1000 * 60 * 60 * 24 ) / 1000,
        //         httpOnly: false,
        //         secure : false
        //     },
        //     {
        //         name : 'cdb_union_user',
        //         value : '0',
        //         domain :'.zuzuche.net',
        //         path: '/',
        //         expires: ( new Date().getTime() + 1000 * 60 * 60 * 24 ) / 1000,
        //         httpOnly: false,
        //         secure : false
        //     },
        //     {
        //         name : 'cdb_username',
        //         value : '13450463551',
        //         domain :'.zuzuche.net',
        //         path: '/',
        //         expires: ( new Date().getTime() + 1000 * 60 * 60 * 24 ) / 1000,
        //         httpOnly: false,
        //         secure : false
        //     }
            
        // ]

        await page.setCookie( ...cookieData );
        // await page.setCookie( ...cookie );
        await page.reload( {});
        await resolve();
    } );
}

module.exports = setCookie;