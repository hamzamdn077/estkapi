const Mark = require('../models/mark')
const mongoose = require('mongoose')
const Teacher = require('../models/teacher');
const Module = require('../models/module');
const Element=require('../models/element');
exports.addMark=(req,res,next)=>{
    const body = req.body;
    const mark = new Mark({
        value : body.note,
        element: body.element,
        student : body.idEtudiant,
        teacher : req.teacherId
    })
    mark.save().then((result)=>{
    res.status(200).json({message : 'mark added succesfully',result :result});
    }).catch(err=>{
        res.status(400).json({message : 'failed to add the mark'})
    })
}
exports.editMark=(req,res,next)=>{
    const body = req.body;
    const id = req.body.id;
    Mark.findById(id).then(mark=>{
        mark.value = body.note || mark.value
        return mark.save();
    }).then((result)=>{
        res.status(200).json({message : 'the mark has been updated !' , result : result})
    }).catch(err=>{
        res.status(400).json({message : 'failed to update !'})
    })
}
exports.deleteMark=(req,res,next)=>{
    const id = req.query.id;
    Mark.findByIdAndRemove(id).then((result)=>{
        res.status(200).json({message : 'the mark has been removed !' , result : result})
    }).catch(err=>{
        res.status(400).json({message : 'failed to remove !'})
    })}
exports.getMarksForTeacher=(req,res,next)=>{
    const teacherId= req.teacherId
    Teacher.findById(teacherId).then(teach=>{
        
        Mark.find({teacher : teacherId}).populate('student teacher element').then(marks=>{
            res.status(200).json({marks : marks})
        }).catch(err=>{
            throw err
        })
    }).catch(err=>{
        res.status(400).json({message : 'failed to get marks' , error : err})
    })

}
exports.getMarksForStudent=(req,res,next)=>{
    
const studentId = new mongoose.Types.ObjectId(req.studentId);
Mark.find({student : studentId}).populate({path :'element'}).then(marks=>{
    res.status(200).json({marks :marks })
    
}).catch(err=>{
    res.status(400).json({message : 'failed to get marks' , error : err})
})
}
exports.getResults=(req,res,next)=>{
    const id= req.studentId
    const brancheId=req.brancheId
    
    let markObject = {
        elements : [],
        modules : [],
        total :0
    }
    let modules;
    let  coeffCounter=0, somme=0
   
  Module.find({branche:brancheId}).then(mdl=>{
    modules=mdl;
    return Mark.find({student : id}).populate('element')
}).then(marks=>{
    let moduleNote;
    
    modules.forEach(mdl=>{
        marks.forEach(mark=>{
             if(mdl._id.toString()==mark.element.module.toString()){
                markObject.elements.push({element : mark.element.name,note:mark.value,coeff:mark.element.coeff})
                somme+=mark.value*mark.element.coeff
                coeffCounter+=mark.element.coeff
               
             }
           })
           moduleNote=(somme/coeffCounter)/mdl.coeff
            markObject.modules.push({nom : mdl.name,note : Number(moduleNote.toFixed(4))})
            markObject.total+=moduleNote*mdl.coeff
            somme=0;
            coeffCounter=0
            moduleNote=0;
    }    
    )
markObject.total/=markObject.modules.length;
markObject.total=Number(markObject.total.toFixed(4))
 res.status(200).json(markObject);
}).catch(err=>{
    res.status(400).json({message : 'failed to get the results try again later',err : err} );
})


}