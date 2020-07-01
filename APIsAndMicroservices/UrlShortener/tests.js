const assert = require('assert');
const request = require("request")

const port = process.argv[2]

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


console.log(" => I can pass a URL as a parameter and I will receive a shortened URL in the JSON response.")
request.post(
    `${localUrl}/api/shorturl/new`, { json: { url: 'https://www.freecodecamp.org/learn/' } },
    function(error, response, body) {
        if (!error && response.statusCode == 200) {
            assert.equal(JSON.stringify(body), JSON.stringify({ original_url: 'https://www.freecodecamp.org/learn/', short_url: 2 }))
        } else {
            console.log("ERROR!")
        }
    }
);


console.log(" => If I pass an invalid URL that doesn't follow the valid http://www.example.com format, the JSON response will contain an error instead.")
request.post(
    `${localUrl}/api/shorturl/new`, { json: { url: 'https://fackdomain123abc.com' } },
    function(error, response, body) {
        if (!error && response.statusCode == 200) {
            assert.equal(JSON.stringify(body), JSON.stringify({ "error": "invalid URL" }))
        } else {
            console.log(error)
            console.log("ERROR!")
        }
    }
);


console.log(" => When I visit that shortened URL, it will redirect me to my original link.")
request.get(`${localUrl}/api/shorturl/1`, function(err, res, body) {
    if (!err && res.statusCode == 200) {
        assert.equal((body.split('<title>')[1].split('</title>')[0]), "Example Domain")
    } else {
        console.log("ERROR!")
    }
})