"use strict";
exports.__esModule = true;
var fs_1 = require("fs");
var googleapis_1 = require("googleapis");
var readline_1 = require("readline");
var SCOPES = ['https://www.googleapis.com/auth/drive'];
var TOKEN_PATH = __dirname + '/token.json';
fs_1.readFile(__dirname + '/credentials.json', function (err, data) {
    if (err) {
        console.log('Error loading client secret file:', err);
        return;
    }
    authorize(JSON.parse(data.toString()));
});
function authorize(credentials) {
    var _a = credentials.installed, client_secret = _a.client_secret, client_id = _a.client_id, redirect_uris = _a.redirect_uris;
    var oAuth2Client = new googleapis_1.google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
    // Check if we have previously stored a token.
    fs_1.readFile(TOKEN_PATH, function (err, token) {
        if (err) {
            // Get Token
            var authUrl = oAuth2Client.generateAuthUrl({
                access_type: 'online',
                scope: SCOPES
            });
            console.log('Authorize this app by visiting this url:', authUrl);
            var rl_1 = readline_1.createInterface({
                input: process.stdin,
                output: process.stdout
            });
            rl_1.question('Enter the code from that page here: ', function (code) {
                rl_1.close();
                oAuth2Client.getToken(code, function (err, token) {
                    if (err) {
                        console.error('Error while trying to retrieve access token', err);
                        return;
                    }
                    else if (token === null || token === undefined) {
                        console.error('token:', token);
                        return;
                    }
                    oAuth2Client.setCredentials(token);
                    fs_1.writeFile(TOKEN_PATH, JSON.stringify(token), function (err) {
                        if (err) {
                            console.error(err);
                            return;
                        }
                        console.log('Token stored to', TOKEN_PATH);
                    });
                });
            });
            return;
        }
        oAuth2Client.setCredentials(JSON.parse(token.toString()));
        console.log('Ok.');
    });
}
