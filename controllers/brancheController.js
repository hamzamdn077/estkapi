const Branche = require('../models/branche')
exports.addBranche=(req,res,next)=>{
    const body = req.body;
    const branche = new Branche({
        name : body.nom,
        department : body.departement
    })
    branche.save().then((result)=>{
        res.status(200).json({message : 'branche added succesfully',result :result})
    }).catch((err)=>{
        console.log(err)
        res.status(400).json({message : 'failed to add the branche'})
    })
}
exports.editBranche=(req,res,next)=>{
    const body = req.body;
    const id = req.body.id;
    Branche.findById(id).then(branche=>{
        branche.name = body.nom ||branche.name 
        branche.department=body.departement || branche.department
        return branche.save();
    }).then((result)=>{
        res.status(200).json({message : 'the branch has been updated !' , result : result})
    }).catch(err=>{
        res.status(400).json({message : 'failed to update !'})
    })
}
exports.deleteBranche=(req,res,next)=>{
    const id = req.query.id;
    Branche.findByIdAndRemove(id).then((result)=>{
        res.status(200).json({message : 'the branch has been removed !' , result : result})
    }).catch(err=>{
        res.status(400).json({message : 'failed to remove !'})
    })}
    exports.fetchAll = (req,res,next)=>{
        Branche.find().then(branches=>{
            res.status(200).json({branches : branches})
        }).catch(err=>{ 
            res.status(400).json({message : 'failed to fetch branches' })
        })
    }
    exports.fetchById =(req,res,next)=>{
        const id = req.params.teacherId;
        Branche.findById(id).then(branche=>{
            res.status(200).json({branche : branche})
        }).catch(err=>{
            res.status(400).json({message : 'failed to fetch the branche',error : err})
        })
    }