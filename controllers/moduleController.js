const Module = require('../models/module')
exports.addModule = (req,res,next)=>{
const body = req.body;
const elementModule = new Module({
    name :body.nom,
    branche : body.branche,
    coeff : body.coeff
})
elementModule.save().then((result)=>{
    res.status(200).json({message : 'Module added succesfully',result :result})
}).catch((err)=>{
    res.status(400).json({message : 'failed to add the Module'})
})
}
exports.editModule=(req,res,next)=>{
    const body = req.body;
    const id = req.body.id;
    Module.findById(id).then(Module=>{
        Module.name = body.nom ||Module.name
        Module.coeff=body.coeff ||Module.coeff
        return elementModule.save();
    }).then((result)=>{
        res.status(200).json({message : 'the Module has been updated !' , result : result})
    }).catch(err=>{
        res.status(400).json({message : 'failed to update !'})
    })
}
exports.deleteModule=(req,res,next)=>{
    const moduleId = req.query.id;
    Module.findByIdAndRemove(moduleId).then((result)=>{
        res.status(200).json({message : 'the Module has been removed !' , result : result})
    }).catch(err=>{
        res.status(400).json({message : 'failed to remove !'})
    })}
    exports.fetchAll = (req,res,next)=>{
        Module.find().then(Modules=>{
            res.status(200).json({Modules : Modules})
        }).catch(err=>{ 
            res.status(400).json({message : 'failed to fetch Modules' })
        })
    }
    exports.fetchById =(req,res,next)=>{
        const id = req.query.id;
        Module.findById(id).then(Module=>{
            res.status(200).json({Module : Module})
        }).catch(err=>{
            res.status(400).json({message : 'failed to fetch the Module',error : err})
        })
    }