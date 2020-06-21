const express = require('express');
const app = express();
const router = express.Router();


app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});


app.get('/api/timestamp', function(req, res) {
    var date = new Date()

    return res.json({
        unix: date.getTime(),
        utc: date.toUTCString()
    });
});

app.get('/api/timestamp/:date', function(req, res) {


    var date = new Date(req.params.date)

    if (date.toString() === "Invalid Date") {
        return res.json({
            error: date.toString()
        })
    } else {
        return res.json({
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