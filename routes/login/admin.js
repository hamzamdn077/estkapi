
const express = require('express')
const router = express.Router();
const jsonwebtoken = require('jsonwebtoken')
const {validationResult}=require('express-validator')

router.get('/',(req,res,next)=>{
const email = req.body.email
const password = req.body.mdp
const errors = validationResult(req)
if(errors.isEmpty()){
if(email=="dbAdmin@usms.com"&&password=="admin000"){
const token = jsonwebtoken.sign({},'supersecretofadmin',{expiresIn:'1h'})
res.status(200).json({token : token})
}
else{
    res.status(400).json({error:'email or password incorrect'})
}

}
else{
    res.status(400).json({message : errors.array()})
      }
})
module.exports = router
