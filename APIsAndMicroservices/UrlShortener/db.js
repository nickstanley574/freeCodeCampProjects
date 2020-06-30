const sqlite3 = require('sqlite3').verbose()


var sqlite_file = "db.sqlite"

if (process.env.NODE_ENV === 'test') {
    sqlite_file = "temp.sqlite"
}
const DBSOURCE = sqlite_file
console.log(`Using DBSOURCE ${DBSOURCE}`)


let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        // Cannot open db
        console.log(err.message)
        throw err
    } else {
        console.log('Connected to the SQLite database')

        db.run(
            `CREATE TABLE shorturl (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                original_url text
            )`,
            (err) => {
                if (err) {
                    console.log("urls table already created")
                } else {
                    // Table just created, creating some rows
                    var insert = 'INSERT INTO shorturl (original_url) VALUES (?)'
                    db.run(insert, ["http://example.com/"])

                    var sql = "SELECT * FROM shorturl"
                    var params = []
                    db.all(sql, params, (err, rows) => {
                        if (err) {
                            console.log(err.message)
                        } else {
                            console.log([rows])
                        }
                    });
                }
            }
        )
    }
})

module.exports = db