const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const Teacher = new Schema({
    CIN : {
       type :String,
       required:true
    },
    CNE : {
        type :String,
        required:true
     },
     phone : {
        type :String,
        required:true
     },
    firstName : {
        type : String,
        required : true
    },
    lastName : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true},
    element : {
        type : mongoose.Types.ObjectId,
        ref : 'Element'
    },
    password : {
        type:String,
        required : true
    },
  
} 
)
module.exports = mongoose.model('Teacher',Teacher)