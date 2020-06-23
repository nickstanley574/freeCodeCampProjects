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