const express = require('express')
const router = express.Router();
const markController = require('../controllers/markController')
const teacherAuth=require('./auth/teacherAuth')
const teacherController = require('../controllers/teacherController')
const studentController= require("../controllers/studentController")
router.get('/students',teacherAuth,studentController.fetchStudentsForTeacher)
router.get('/marks',teacherAuth,markController.getMarksForTeacher)
router.post('/mark',teacherAuth,markController.addMark)
router.patch('/mark',teacherAuth,markController.editMark)
router.delete('/mark',teacherAuth,markController.deleteMark)
router.post('/register',teacherController.addTeacher)
module.exports = router