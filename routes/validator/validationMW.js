const express = require('express')
const router = express.Router();
const {body}=require('express-validator')
router.use('/',body('email').isEmail(),body('mdp').isLength({min : 8}))
module.exports = router