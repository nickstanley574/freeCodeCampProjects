const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema({
    username: {
        type: String,
        required: true
    },
    exercises: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Exercise"
    }]
});

module.exports = mongoose.model("User", User);