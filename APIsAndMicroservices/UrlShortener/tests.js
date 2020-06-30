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

// oh for the love of pete ... FCC doesn't have any real tests for this project ... below is the test section
// the https://www.freecodecamp.org/page-data/learn/apis-and-microservices/apis-and-microservices-projects/url-shortener-microservice/page-data.json
// which contains the tests for the project. So right now eny url pass to https://www.freecodecamp.org/learn/apis-and-microservices/apis-and-microservices-projects/url-shortener-microservice
// will say all tests pass.

// "tests": [
//     "text": "I can pass a URL as a parameter and I will receive a shortened URL in the JSON response.",
//     "testString": ""
// }, {
//     "text": "If I pass an invalid URL that doesn't follow the valid http://www.example.com format, the JSON response will contain an error instead.",
//     "testString": ""
// }, {
//     "text": "When I visit that shortened URL, it will redirect me to my original link.",
//     "testString": ""
// }

localUrl = `http://0.0.0.0:${port}`


getJSON(`${localUrl}/api/shorturl/new`, function(data, url) {
    console.log(url)
    console.log("I can pass a URL as a parameter and I will receive a shortened URL in the JSON response.")
    request.post(
        url, { json: { url: 'https://www.freecodecamp.org/learn/' } },
        function(error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(body);
            } else {
                console.log("error")
            }
        }
    );
});


getJSON(`${localUrl}/api/shorturl/new`, function(data, url) {
    console.log(url)
    console.log("If I pass an invalid URL that doesn't follow the valid http://www.example.com format, the JSON response will contain an error instead.")
    request.post(
        url, { json: { url: 'https://fackdomain123abc.com' } },
        function(error, response, body) {
            if (!error && response.statusCode == 200) {
                assert.equal(JSON.stringify(body), JSON.stringify({ "error": "invalid URL" }))
            } else {
                console.log("ERROR!")
            }
        }
    );
});


getJSON(`${localUrl}/api/shorturl/new`, function(data, url) {
    console.log(url)
    console.log("When I visit that shortened URL, it will redirect me to my original link.")
});