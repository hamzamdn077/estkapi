const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Branche = new Schema({
 name : {
    type : String,
    required : true
 },
 department : {
   type : String,
   required : true
 }
})
module.exports = mongoose.model('Branche',Branche)