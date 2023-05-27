const Teacher = require('../models/teacher')
const bcrypt = require('bcrypt')
exports.addTeacher = (req,res,next) =>{
    const body = req.body;
    const teacher = new Teacher({
        CIN : body.cin,
        CNE : body.cne,
        firstName : body.prenom,
        password :  bcrypt.hashSync(body.mdp,12),
        lastName : body.nom,
        phone : body.numero,
        email : body.email,
        element : body.element
    })
    teacher.save().then((result)=>{
        res.status(200).json({
            message : 'Teacher Added succesfully',result :result
        })
    }).catch(err=>{
        res.status(400).json({message : 'failed to add the teacher'})
    })
}
exports.editTeacher=(req,res,next)=>{
    const body = req.body;
    const id = req.body.id;
    Teacher.findById(id).then(teacher=>{
        teacher.CIN = body.cin||teacher.CIN,
        teacher.CNE = body.cne||teacher.CNE,
        teacher.firstName = body.prenom||teacher.firstName,
        teacher.lastName = body.nom||teacher.lastName,
        teacher.phone = body.numero||teacher.phone,
        teacher.email = body.email||teacher.email
        
        return teacher.save();
    }).then((result)=>{
        res.status(200).json({message : 'the teacher info has been updated !' , result : result})
    }).catch(err=>{
        res.status(400).json({message : 'failed to update !'})
    })
}
exports.deleteTeacher=(req,res,next)=>{
    const id = req.query.id;
    Teacher.findByIdAndRemove(id).then((result)=>{
        res.status(200).json({message : 'the teacher has been removed !' , result : result})
    }).catch(err=>{
        res.status(400).json({message : 'failed to remove !'})
    })}
exports.fetchAll = (req,res,next)=>{
    Teacher.find().then(teachers=>{
        res.status(200).json({teachers : teachers})
    }).catch(err=>{ 
        res.status(400).json({message : 'failed to fetch teachers' })
    })
}
exports.fetchBycin =(req,res,next)=>{
    const cin = req.query.cin;
    Teacher.find({CIN : cin}).then(teachers=>{
        res.status(200).json({teacher : teachers[0]})
    }).catch(err=>{
        res.status(400).json({message : 'failed to fetch the teacher',error : err})
    })
}