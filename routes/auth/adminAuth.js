const jwt=require('jsonwebtoken')
const express = require('express');

const router = express.Router();
router.use('/',(req,res,next)=>{
    let token
    let decodedToken;
    
    
    try{
        if(!req.get('Authorization')) throw new Error("not authenticated")
        token=req.get('Authorization').split(' ')[1]
    try {
        decodedToken=jwt.verify(token,'supersecretofadmin')
    } catch (error) {
        throw error
    }
      if(!decodedToken) throw new Error('not authenticated')
     
   
    next();
    }catch(err){
        res.status(400).json({error : err})
    }
    
})
module.exports=router