const express = require('express')
const router = express.Router();
const studentController= require("../controllers/studentController")
const markController = require('../controllers/markController')
const studentAuth=require('./auth/studentAuth')
router.get('/marks',studentAuth,markController.getMarksForStudent)
router.get('/result',studentAuth,markController.getResults)
router.post('/register',studentController.addStudent)
module.exports = router
