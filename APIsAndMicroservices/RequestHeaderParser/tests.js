var assert = require('assert');
var request = require("request")
var port = process.argv[2]

function getJSON(url, callback) {
    console.log(url)
    request({
        url: url,
        json: true
    }, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            callback(body, url);
        } else {
            console.log(`error getting json from ${url}`)
            process.exit(1);
        }
    });
}

localUrl = `http://0.0.0.0:${port}`


getJSON(localUrl + '/api/whoami', (data) => {
    console.log(data)
    console.log("Your IP address should be returned in the <code>ipaddress</code> key.")
    assert(data.ipaddress && data.ipaddress.length > 0)
    console.log("Your preferred language should be returned in the <code>language</code> key.")
    assert(data.language && data.language.length > 0)
    console.log("Your software should be returned in the <code>software</code> key.")
    assert(data.software && data.software.length > 0)
});