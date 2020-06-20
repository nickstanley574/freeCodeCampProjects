var express = require('express');
var app = express();

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

var listener = app.listen(process.env.PORT || 3000, function() {
    console.log('Your app is listening on port ' + listener.address().port);
});