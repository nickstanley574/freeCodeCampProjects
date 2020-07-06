const express = require('express')
const app = express()

const cors = require('cors')
app.use(cors())

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


// _________________________________________________
//  ____    _  _____  _    ____    _    ____  _____
// |  _ \  / \|_   _|/ \  | __ )  / \  / ___|| ____|
// | | | |/ _ \ | | / _ \ |  _ \ / _ \ \___ \|  _|
// | |_| / ___ \| |/ ___ \| |_) / ___ \ ___) | |_
// |____/_/   \_|_/_/   \_|____/_/   \_|____/|_____|
// _________________________________________________


const mongoose = require('mongoose')
const Schema = mongoose.Schema;

mongoose.connect(process.env.MONGO_URI || process.env.MONGO_URI_LOCAL_TEST || 'mongodb://localhost/exercise-track', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})

// DATABASE MODELS

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    exercises: [new Schema({
        description: {
            type: String,
            required: true
        },
        duration: {
            type: Number,
            required: true
        },
        date: {
            type: Date,
            default: Date.now
        }
    }, { _id: false, id: false })]
});

const User = mongoose.model("User", UserSchema);


// _______________________
//      _    ____  ____
//     / \  |  _ \|  _ \
//    / _ \ | |_) | |_) |
//   / ___ \|  __/|  __/
//  /_/   \_|_|   |_|
// _______________________


app.use(express.static('public'))


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html')
});


// 1. I can create a user by posting form data username to /api/exercise/new-user and returned will be an object with username and _id.
app.post('/api/exercise/new-user', function(req, res) {
    console.log('/api/exercise/new-user')
    let username = req.body.username
    let newUser = new User({ username: username });
    newUser.save((err, newUser) => {
        if (err) {
            if (err.code == 11000) {
                res.json({
                    error: "MONGO_ERROR",
                    code: err.message
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


app.post('/api/exercise/delete-user', function(req, res) {
    console.log('/api/exercise/delete-user')
    User.findByIdAndDelete(req.body.userId, function(err, user) {
        if (err) {
            res.json({
                error: err.message
            })
        } else {
            res.json({
                delete: "successful",
                username: user.username
            })
        }
    })
})


// 2. I can get an array of all users by getting api/exercise/users with the same info as when creating a user.
app.get('/api/exercise/users', function(req, res) {
    console.log('/api/exercise/users')
    User.find({}, function(err, users) {
        res.json(users.map(user => {
            return {
                username: user.username,
                _id: user._id
            }
        }));
    });
})


// 3. I can add an exercise to any user by posting form data userId(_id), description, duration, and optionally date to /api/exercise/add.
// If no date supplied it will use current date. Returned will be the user object with also with the exercise fields added.
app.post('/api/exercise/add', function(req, res) {
    console.log('/api/exercise/add')
    if (req.body.date === "") req.body.date = undefined;
    User.findById(req.body.userId, function(err, user) {

        exercise_entry = {
            description: req.body.description,
            duration: req.body.duration,
            date: req.body.date
        }

        user.exercises.push(exercise_entry)

        user.save(function(err, user) {
            let n = user.exercises.length - 1
            res.json({
                _id: user._id,
                username: user.username,
                date: user.exercises[n].date.toString().slice(0, 15),
                duration: user.exercises[n].duration,
                description: user.exercises[n].description
            })
        })
    })
})


// 4. I can retrieve a full exercise log of any user by getting /api/exercise/log with a parameter of userId(_id).
// Return will be the user object with added array log and count (total exercise count).
// 5. I can retrieve part of the log of any user by also passing along optional parameters of from & to or 
// limit. (Date format yyyy-mm-dd, limit = int)
app.get('/api/exercise/log', function(req, res) {
    console.log('/api/exercise/log')

    const from = new Date(req.query.from || 0)
    const to = new Date(req.query.to || Date.now())
    const limit = (req.query.limit || undefined)


    console.log(`from=${from}  to=${to}   limit=${limit}`)

    User.findById(req.query.userId, function(err, user) {

        let log = user.exercises
            .filter((item) => {
                return item.date >= from && item.date <= to;
            })
            .map(e => ({
                description: e.description,
                duration: e.duration,
                date: e.date.toDateString()
            })).slice(0, limit)

        res.json({
            _id: user._id,
            username: user.username,
            count: log.length,
            log: log

        })
    })
})



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