const { Timestamp } = require('mongodb');
const mongoose = require('mongoose')



const diarySchema = new mongoose.Schema({
    body: {
        type: String,
        required: true
    },
    time: {
        type: Date,
        default: Date.now(),
        Timestamp: true 
    }
});


module.exports = mongoose.model("Diary", diarySchema);
