const express = require('express');
const app = express();

const router = express.Router();
const dns = require('dns');

const db = require("./db.js")

var http = require('http')

// index.html
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});
url = require('url');

// List all current Links
app.get("/api/shorturl/all", function(req, res) {
    var sql = "SELECT * FROM shorturl"
    var params = []
    db.all(sql, params, function(err, rows) {
        if (err) {
            res.status(400).json({ "error": err.message });
        } else {
            res.json({
                "data": rows
            });
        }
    })
});


// redirect based on id
app.get('/api/shorturl/:id', function(req, res) {
    let id = req.params.id;
    console.log('Got id:', id);
    let sql = `SELECT original_url FROM shorturl WHERE id  = (?)`;
    db.get(sql, [id], (err, row) => {
        if (err) {
            return res.json({ error: err.message });
        }
        console.log(row)
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
    var uri = req.query.url

    var host = url.parse(uri).host;



    // Check if url is valid
    dns.lookup(host, (err, address, family) => {
        if (err) {
            console.log(`${url} invalid URL.`)
            res.json({
                error: "invalid URL"
            })
        } else {
            console.log('address: %j family: IPv%s', address, family);
            var insert = 'INSERT INTO shorturl (original_url) VALUES (?)'
            db.run(insert, uri, function(err) {
                console.log(`${url} has been inserted with rowid ${this.lastID}`);
                res.json({
                    "original_url": uri,
                    "short_url": this.lastID
                })
            })
        }
    });
})


// 404
app.use((req, res, next) => {
    res.status(404).json({ error: '404 - Not Found' });
});


// 500
var listener = app.listen(process.env.PORT || 3000, function() {
    console.log('Your app is listening on port ' + listener.address().port);
})