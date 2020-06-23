const express = require('express');
const app = express();
const router = express.Router();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({ optionSuccessStatus: 200 })); // some legacy browsers choke on 204

// index.html
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});


app.get('/api/whoami', function(req, res) {
    res.json({
        ipaddress: req.connection.remoteAddress,
        language: req.headers["accept-language"] || "None",
        software: req.headers["user-agent"] || "None"
    });
});

// 404
app.use(function(req, res, next) {
    return res.status(404).send({ message: 'Route ' + req.url + ' Not found.' });
});

// 500 - Any server error
app.use(function(err, req, res, next) {
    return res.status(500).send({ error: err });
});


var listener = app.listen(process.env.PORT || 3000, function() {
    console.log('Your app is listening on port ' + listener.address().port);
});