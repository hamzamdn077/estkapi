const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const Mark = new Schema({
    value : {
        type : Number,
        required : true
    },
    element : {
        type : Schema.Types.ObjectId,
        ref : 'Element'
    }
    ,
    student : {
        type : Schema.Types.ObjectId,
        ref : 'Student'
    },
   teacher :{ type : Schema.Types.ObjectId,
        ref : 'Teacher'}
})
module.exports = mongoose.model('Mark',Mark)