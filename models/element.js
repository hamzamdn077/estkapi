const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Element = new Schema({
    name : {
        type : String,
        required : true
    },
    coeff :{
        type : Number,
        required : true
    }
    ,
    module :{
        type:mongoose.Types.ObjectId,
        ref : 'Module'
    } 
})
module.exports = mongoose.model('Element',Element)