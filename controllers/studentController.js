const bcrypt = require('bcrypt')
const student = require('../models/student');
const Student = require('../models/student')
const Teacher = require('../models/teacher');
const Element = require('../models/element');
const Module = require('../models/module');
exports.addStudent = (req,res,next) =>{
   const body =req.body;
  
    const student = new Student({
        CIN : body.cin,
        CNE : body.cne,
        password: bcrypt.hashSync(body.mdp,12),
        firstName : body.prenom,
        lastName : body.nom,
        phone : body.numero,
        email : body.email,
        branche : body.branche
    })
    student.save().then((result)=>{
        res.status(200).json({
            message : 'Student Added succesfully',result :result
        })
    }).catch(err=>{
        res.status(400).json({message : 'failed to add the student',err: err})
    })
}
exports.editStudent=(req,res,next)=>{
    const body = req.body;
    const id = req.body.id;
    student.findById(id).then(student=>{
        student.CIN = body.cin ||student.CIN,
        student.CNE = body.cne ||student.CNE,
        student.firstName = body.prenom ||student.firstName,
        student.lastName = body.nom ||student.lastName,
        student.phone = body.numero ||student.phone,
        student.email = body.email ||student.email
        return student.save();
    }).then((result)=>{
        res.status(200).json({message : 'the student info has been updated !' , result : result})
    }).catch(err=>{
        res.status(400).json({message : 'failed to update !'})
    })
}
exports.deleteStudent=(req,res,next)=>{
    const id = req.query.id;
    Student.findByIdAndRemove(id).then((result)=>{
        res.status(200).json({message : 'the Student has been removed !' , result : result})
    }).catch(err=>{
        res.status(400).json({message : 'failed to remove !'})
    })}
exports.fetchAll = (req,res,next)=>{
        Student.find().then(students=>{
        
            res.status(200).json({students : students })
        }).catch(err=>{ 
            res.status(400).json({message : 'failed to fetch students' })
        })
    }

exports.fetchStudentsForTeacher=(req,res,next)=>{
    const teacherId = req.teacherId;
    Teacher.findById(teacherId).populate({path:'element',populate:{path : 'module'}}).then(teacher=>{
     
        Student.find({branche : teacher.element.module.branche.toString()}).then(students=>{
         
            res.status(200).json({students:students})
        }).catch(err=>{throw err})
    }).catch(err=>{
        res.status(400).json({error : err , message : 'failed to fetch students'})
    })
}