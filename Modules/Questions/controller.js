const  {Question} = require("./schema") 


async function create(req,res,next){
    try{
        
        let newData = await Question.create({title:req.body.title});
        if(newData){
            return res.send({status:0, message:"Added" , data:newData})
        }
        
    }catch(e){
        console.log(e);
        return res.send({status:0, message:"Failed error" , error:e})
    }
}


module.exports={
    create
}