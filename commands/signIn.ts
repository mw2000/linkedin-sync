import { BrowserWindow } from '@electron/remote';
import { request } from 'obsidian';
import { Config } from 'config';

export async function signIn(plugin: any) {

    const client_id = Config.client_id;
    const client_secret = Config.client_secret;

    var authWindow = new BrowserWindow({
        width: 800, 
        height: 600, 
        show: false,
    });

    var authUrl = 'https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=' + client_id +'&client_secret=' + client_secret + '&scope=r_liteprofile+w_member_social&state=123456&redirect_uri=https://localhost/'

    authWindow.webContents.addListener('will-redirect', function (event, newUrl) {
        // Verifies that we've reached the redirect URI
        if (newUrl.indexOf("https://localhost/?code=") == 0) {
            let code = newUrl.split('=')[1].split('&')[0]
    
            request({
                method: "POST",
                url: "https://www.linkedin.com/oauth/v2/accessToken/",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: "grant_type=authorization_code&code=" + code + "&client_id=" + client_id + "&client_secret=" + client_secret + "&redirect_uri=https://localhost/"
            }).then(data => {
                plugin.settings.oauthToken = JSON.parse(data).access_token;
                authWindow.close();
            })
        }
    });

    // Loads URL and catches error for localhost loading
    authWindow.loadURL(authUrl)
        .catch(error => {});
    
    authWindow.show();

    authWindow.on('closed', () => {
        authWindow = null;
    });
}