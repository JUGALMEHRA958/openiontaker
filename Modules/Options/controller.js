const { Option } = require("../Questions/schema");

async function deleteOption(req, res, next) {
    try {
      const optionId = req.params.id;
  
      // Find the option and delete it
      const deletedOption = await Option.findOneAndUpdate({_id:optionId},{isDeleted:true},{new:true});
  
      if (!deletedOption) {
        return res.send({ status: 0, message: "Option not found" });
      }
  
      return res.send({ status: 1, message: "Option deleted", data: deletedOption });
    } catch (e) {
      console.log(e);
      return res.send({ status: 0, message: "Failed error", error: e });
    }
  }

  async function addVoteToOption(req, res, next) {
    try {
      const optionId = req.params.id;
  
      // Find the option and update the voteCount
      const updatedOption = await Option.findByIdAndUpdate(
        optionId,
        { $inc: { voteCount: 1 } },
        { new: true }
      );
  
      if (!updatedOption) {
        return res.send({ status: 0, message: "Option not found" });
      }
  
      return res.send({ status: 1, message: "Vote added to option", data: updatedOption });
    } catch (e) {
      console.log(e);
      return res.send({ status: 0, message: "Failed error", error: e });
    }
  }

  module.exports={
    deleteOption,addVoteToOption
  }