const express = require('express')
const router = express.Router();
const studentController = require('../controllers/studentController')
const teacherController = require('../controllers/teacherController')
const adminAuth = require('./auth/adminAuth')
router.get('/students',adminAuth,studentController.fetchAll)
router.get('/teachers',adminAuth,teacherController.fetchAll)
router.delete('/deleteTeacher',adminAuth,teacherController.deleteTeacher)
router.delete('/deleteStudent',adminAuth,studentController.deleteStudent)
module.exports = router