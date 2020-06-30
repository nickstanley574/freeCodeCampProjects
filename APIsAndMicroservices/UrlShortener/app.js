const request = require('request');

const express = require('express');
const app = express();

const db = require("./db.js")

var bodyParser = require('body-parser')
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}));

// index.html
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});
// url = require('url');


// List all current Links
app.get("/api/shorturl/all", function(req, res) {
    var sql = "SELECT * FROM shorturl"
    var params = []
    db.all(sql, params, function(err, rows) {
        if (err) {
            res.status(400).json({ "error": err.message });
        } else {
            res.json({ "data": rows });
        }
    })
});



// Get the n most recent urls
app.get("/api/shorturl/recent/:n", function(req, res) {
    var sql = `SELECT * FROM shorturl WHERE [id] > (SELECT MAX([id]) - ${req.params.n} FROM [shorturl])  ORDER BY id DESC; `
    var params = []
    db.all(sql, params, function(err, rows) {
        if (err) {
            res.status(400).json({ "error": err.message });
        } else {
            res.json({
                length: rows.length,
                data: rows
            });
        }
    })
});

// redirect based on id
app.get('/api/shorturl/:id', function(req, res) {
    let id = req.params.id;
    let sql = `SELECT original_url FROM shorturl WHERE id  = (?)`;
    db.get(sql, [id], (err, row) => {
        if (err) {
            return res.json({ error: err.message });
        }
        return row ?
            res.redirect(row.original_url) :
            res.json({ error: `No url entry found for id ${id}` })
    });
})


// get one url
app.get('/api/shorturl/:id/data', function(req, res) {
    console.log()
    res.json({
        "original_url": "www.google.com",
        "short_url": `${req.headers.host}/${req.params.id}`
    })
})


// Add url
app.post('/api/shorturl/new/', function(req, res) {
    var url = req.body.url

    request({ method: 'HEAD', uri: url }, function(error, response) {
        if (!error && response.statusCode == 200) {
            var insert = 'INSERT INTO shorturl (original_url) VALUES (?)'
            db.run(insert, url, function(err) {
                console.log(`${url} has been inserted with rowid ${this.lastID}`);
                res.json({
                    "original_url": url,
                    "short_url": this.lastID
                })
            })
        } else {
            console.log(`ERROR - ${url} invalid URL`)
            res.json({ error: "invalid URL" })
        }
    })
})


// 404
app.use((req, res, next) => {
    res.status(404).json({ error: '404 - Not Found' });
});


// 500
var listener = app.listen(process.env.PORT || 3000, function() {
    console.log('Your app is listening on port ' + listener.address().port);
})