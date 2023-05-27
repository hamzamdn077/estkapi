const jwt =require('jsonwebtoken')
const express=require('express')
const router= express.Router()
const bcrypt = require('bcrypt')
const Teacher = require('../../models/teacher')
const {validationResult}=require('express-validator')

router.use('/',(req,res,next)=>{
  const errors = validationResult(req)
  if(errors.isEmpty()){
const email = req.body.email
const password = req.body.mdp
Teacher.find({email : email}).then((teacher=>{
    if(teacher.length ==0) {
      res.status(404).json({err :'teacher not found'})
      return
    }
     if(!bcrypt.compareSync(password,teacher[0].password)){
      res.status(400).json({err :'password incorrect'})
      return
     }
    const token = jwt.sign({email :teacher[0].email,id : teacher[0]._id.toString()},'supersecretofestkforteachers',{expiresIn : '1h'})
    res.status(200).json({token : token,id:teacher[0]._id.toString()})
  
  }))
  }else{
res.status(400).json({message : errors.array()})
  }})
  module.exports = router