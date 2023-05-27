const Element = require('../models/element')
exports.addElement = (req,res,next)=>{
const body = req.body;
const element = new Element({
    name :body.nom,
    module : body.module,
    coeff : body.coeff
})
element.save().then((result)=>{
    res.status(200).json({message : 'element added succesfully',result :result})
}).catch((err)=>{
    res.status(400).json({message : 'failed to add the element'})
})
}
exports.editElement=(req,res,next)=>{
    const body = req.body;
    const id = req.body.id;
    Element.findById(id).then(element=>{
        element.name = body.nom ||element.name
        element.module=body.module ||element.module
        return element.save();
    }).then((result)=>{
        res.status(200).json({message : 'the element has been updated !' , result : result})
    }).catch(err=>{
        res.status(400).json({message : 'failed to update !'})
    })
}
exports.deleteElement=(req,res,next)=>{
    const id = req.query.id;
    Element.findByIdAndRemove(id).then((result)=>{
        res.status(200).json({message : 'the element has been removed !' , result : result})
    }).catch(err=>{
        res.status(400).json({message : 'failed to remove !'})
    })}
    exports.fetchAll = (req,res,next)=>{
        Element.find().then(elements=>{
            res.status(200).json({elements : elements})
        }).catch(err=>{ 
            res.status(400).json({message : 'failed to fetch elements' })
        })
    }
    exports.fetchById =(req,res,next)=>{
        const id = req.query.id;
        Element.findById(id).then(element=>{
            res.status(200).json({element : element})
        }).catch(err=>{
            res.status(400).json({message : 'failed to fetch the element',error : err})
        })
    }