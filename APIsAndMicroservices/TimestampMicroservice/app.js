const express = require('express');
const { restart } = require('nodemon');
const app = express();
const router = express.Router();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({ optionSuccessStatus: 200 })); // some legacy browsers choke on 204


app.get('/', function(req, res) {
    console.log(req.body)
    res.sendFile(__dirname + '/index.html');
});


app.get('/api/timestamp', function(req, res) {
    var date = new Date()

    res.json({
        unix: date.getTime(),
        utc: date.toUTCString()
    });
});

app.get('/api/timestamp/:date', function(req, res) {
    var dateString = req.params.date


    if (/\d{5,}/.test(dateString)) {
        var date = new Date(parseInt(dateString))
    } else {
        var date = new Date(dateString)

    }

    if (date.toString() === "Invalid Date") {
        res.json({
            error: date.toString()
        })
    } else {
        res.json({
            unix: date.getTime(),
            utc: date.toUTCString()
        });
    }
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
