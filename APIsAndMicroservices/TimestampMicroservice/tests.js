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


getJSON(`${localUrl}/api/timestamp/2016-12-25`, function(data, url) {
    console.log(url)
    console.log("It should handle a valid date, and return the correct unix timestamp")
    assert.equal(data.unix, 1482624000000)
    console.log("It should handle a valid date, and return the correct UTC string")
    assert.equal(data.utc, 'Sun, 25 Dec 2016 00:00:00 GMT')
});

getJSON(`${localUrl}/api/timestamp/1482624000000`, function(data, url) {
    console.log(url)
    console.log("It should handle a valid unix date, and return the correct unix timestamp")
    assert.equal(data.unix, 1482624000000)
})

getJSON(`${localUrl}/api/timestamp/this-is-not-a-date`, function(data, url) {
    console.log(url)
    console.log("It should return the expected error message for an invalid date")
    assert.equal(data.error.toLowerCase(), 'invalid date');
})

getJSON(`${localUrl}/api/timestamp/`, function(data, url) {
    console.log(url)
    console.log("It should handle an empty date parameter, and return the current time in unix format")
    var now = Date.now();
    var timeDiffUnix = now - data.unix
    assert.ok(0 < timeDiffUnix && timeDiffUnix < 1000, `${now} - ${data.unix} = ${timeDiffUnix}`)
    console.log("It should handle an empty date parameter, and return the current time in UTC format")
    now = Date.now();
    var utc = (new Date(data.utc)).getTime()
    var timeDiffUtc = now - utc
    assert.ok(0 < timeDiffUtc && timeDiffUtc < 1000, `${now} - ${utc} = ${timeDiffUtc}`)


})