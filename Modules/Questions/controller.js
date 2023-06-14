const { Mongoose, default: mongoose } = require("mongoose");
const  {Question, Option} = require("./schema") 


async function createQuestion(req,res,next){
    try{
        
        let newData = await Question.create({title:req.body.title});
        if(newData){
            return res.send({status:1, message:"Added" , data:newData})
        }
        
    }catch(e){
        console.log(e);
        return res.send({status:0, message:"Failed error" , error:e})
    }
}
async function createOption(req,res,next){
    try{
        let obj = {
            title:req.body.title,
            questionId:req.params.id
        }
        let newData = await Option.create(obj);
        if(newData){
            return res.send({status:1, message:"Added" , data:newData})
        }
        
    }catch(e){
        console.log(e);
        return res.send({status:0, message:"Failed error" , error:e})
    }
}
async function deleteQuestion(req,res,next){
    try{
        if(!req.params.id){return res.send({status:0, message:"Failed Please send id in params" })}
        let dataUpdate  = await Question.findOneAndUpdate({_id:req.params.id},{isDeleted:true},{new:true});
        return res.send({status:1, message:"Deleted",dataUpdate:dataUpdate})
        
    }catch(e){
        console.log(e);
        return res.send({status:0, message:"Failed error" , error:e})
    }
}
// async function deleteOption(req, res, next) {
//     try {
//       const optionId = req.params.id;
  
//       // Find the option and delete it
//       const deletedOption = await Option.findByIdAndDelete(optionId);
  
//       if (!deletedOption) {
//         return res.send({ status: 0, message: "Option not found" });
//       }
  
//       return res.send({ status: 1, message: "Option deleted", data: deletedOption });
//     } catch (e) {
//       console.log(e);
//       return res.send({ status: 0, message: "Failed error", error: e });
//     }
//   }

async function getQuestion(req,res,next){
    try{
        if(!req.params.id){return res.send({status:0, message:"Failed Please send id in params" })}
        let data  = await Question.aggregate([
            {
              $match:
                /**
                 * query: The query in MQL.
                 */
                {
                  _id: new mongoose.Types.ObjectId(req.params.id),
                },
            },
            {
              $lookup:
                /**
                 * from: The target collection.
                 * localField: The local join field.
                 * foreignField: The target join field.
                 * as: The name for the results.
                 * pipeline: Optional pipeline to run on the foreign collection.
                 * let: Optional variables to use in the pipeline field stages.
                 */
                {
                  from: "options",
                  localField: "_id",
                  foreignField: "questionId",
                  as: "options",
                },
            },
          ]);
        for(let i=0;i<data[0].options.length;i++){
            let url = process.env.url;
            let id = data[0].options[i]._id;
            let link_to_vote = `${url}options/${id}/add_vote`;
            data[0].options[i]={...data[0].options[i] ,link_to_vote}           
        }
        return res.send({status:1, message:"SUCCESS",data:data})
        
    }catch(e){
        console.log(e);
        return res.send({status:0, message:"Failed error" , error:e})
    }
}

module.exports={
    createQuestion,createOption,deleteQuestion,getQuestion
}