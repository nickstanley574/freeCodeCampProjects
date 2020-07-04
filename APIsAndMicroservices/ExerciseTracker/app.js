const express = require('express')
const app = express()

const cors = require('cors')
app.use(cors())

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


// DATABASE CONNECTION
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGO_URI || process.env.MONGO_URI_LOCAL_TEST || 'mongodb://localhost/exercise-track', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})

// DATABASE MODELS
const User = require("./models/user");
const Exercise = require("./models/exercise")


// APP

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
    const exercise = new Exercise(req.body);
    User.findById(req.body.userId, function(err, user) {
        exercise.save((error, exerciseRecord) => {
            user.exercises.push(exercise);
            Exercise.populate(user, { path: "exercises" });
            user.save(function(err, user) {
                res.json({
                    _id: exercise._id,
                    username: user.username,
                    date: exercise.date.toString().slice(0, 15),
                    duration: exercise.duration,
                    description: exercise.description
                })
            })
        })
    });
})


//4. I can retrieve a full exercise log of any user by getting /api/exercise/log with a parameter of userId(_id).
// Return will be the user object with added array log and count (total exercise count).




//

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