

 function addQuestion(req,res,next){
    if(!req.body.title){
        return res.send({status:1, error:"Body not found"})
    }
    next(); 
 }

 function addOption(req,res,next){
    if(!req.body.title || !req.params.id){
        return res.send({status:1, error:"req.body.title missing"})
    }
    next(); 
 }
 function deleteQuestionValidator(req,res,next){
    if( !req.params.id){
        return res.send({status:1, error:"req.body.title missing"})
    }
    next(); 
 }
module.exports={
    addQuestion,addOption,deleteQuestionValidator
}