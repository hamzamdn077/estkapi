const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Module = new Schema({
    name : {
        type : String,
        required : true
    },
    coeff :{
        type : Number,
        required : true
    }
    ,
    branche :{
        type:mongoose.Types.ObjectId,
        ref : 'Branche',
        required : true
    },
    total : {
        type : Number
    },
    elementsNum : {
        type :Number
    }
})
module.exports = mongoose.model('Module',Module)