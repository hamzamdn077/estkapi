
const express = require('express')
const router = express.Router();
const Student=require('../../models/student');
const student = require('../../models/student');
const bcrypt = require('bcrypt')
const jsonwebtoken = require('jsonwebtoken')
const {validationResult}=require('express-validator')

router.get('/',(req,res,next)=>{
const email = req.body.email
const password = req.body.mdp
const errors = validationResult(req)
if(errors.isEmpty()){
Student.find({email : email}).then((student=>{
  if(student.length ==0) {
    res.status(404).json({err :'student not found'})
    return
  }
   if(!bcrypt.compareSync(password,student[0].password)){
    res.status(400).json({err :'password incorrect'})
    return
   }
  const token = jsonwebtoken.sign({email :student[0].email,id : student[0]._id.toString(),branche :student[0].branche.toString()},'supersecretofestk',{expiresIn : '1h'})
  res.status(200).json({token : token,id:student[0]._id.toString()})

}))
}
else{
  res.status(400).json({message : errors.array()})
    }
}
)
module.exports = router