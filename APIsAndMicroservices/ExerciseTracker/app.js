const express = require('express')
const app = express()

const cors = require('cors')
app.use(cors())

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


// DATABASE CONNECTION

const mongoose = require('mongoose')
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/exercise-track', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})

//Get the default connection
var db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// DATABASE SCHEMA

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    }
});
const User = mongoose.model("User", userSchema)


// APP

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html')
});

app.post('/api/exercise/new-user', function(req, res) {
    console.log('/api/exercise/new-user')
    let username = req.body.username
    let newUser = new User({ username: username });
    newUser.save((err, newUser) => {
        if (err) {
            if (err.code == 11000) {
                res.json({
                    error: "Username already taken",
                    code: err.code
                })
                return console.error(err.message);
            }
            res.json({ error: "Opps! Something is Wrong!" })
            return console.error(err.code);
        }
        res.json({
            username: newUser.username,
            _id: newUser.id
        })
    })
});

// app.post('/api/exercise/add', function(req, res) {});

app.get('/is-mongoose-ok', function(req, res) {
    console.log("/is-mongoose-ok")
    if (mongoose) {
        res.json({ isMongooseOk: !!mongoose.connection.readyState })
    } else {
        res.json({ isMongooseOk: false })
    }
});


// Not found middleware
app.use((req, res, next) => {
    return next({ status: 404, message: 'not found' })
})


// Error Handling middleware
app.use((err, req, res, next) => {
    let errCode, errMessage

    if (err.errors) {
        // mongoose validation error
        errCode = 400 // bad request
        const keys = Object.keys(err.errors)
            // report the first validation error
        errMessage = err.errors[keys[0]].message
    } else {
        // generic or custom error
        errCode = err.status || 500
        errMessage = err.message || 'Internal Server Error'
    }
    res.status(errCode).type('txt')
        .send(errMessage)
})


var listener = app.listen(process.env.PORT || 3000, function() {
    console.log('Your app is listening on port ' + listener.address().port);
})