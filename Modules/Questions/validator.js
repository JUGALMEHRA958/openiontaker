

 function addQuestion(req,res,next){
    if(!req.body.title){
        return res.send({status:1, error:"Body nahi mili"})
    }
    next(); 
 }

module.exports={
    addQuestion
}