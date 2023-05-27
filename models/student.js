const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const Student = new Schema({
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
    branche : {
        type:mongoose.Types.ObjectId,
        ref : 'Branche'
    },
    modules : [{module : {type : String}
    ,
    mark : {type:Number},
    
    }]
   , password : {
    type : String,
    required :true
   }
} 

)
module.exports = mongoose.model('Student',Student)