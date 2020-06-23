var assert = require('assert');
var request = require("request")
var port = process.argv[2]

function getJSON(url, callback) {
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