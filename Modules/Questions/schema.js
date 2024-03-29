const mongoose = require('mongoose');

// Define the 'question' schema
const questionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique:true
  },  
  isDeleted:{type:Boolean , default:false}

});

// Create the 'question' model
const Question = mongoose.model('Question', questionSchema);

// Define the 'option' schema
const optionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question',
    required: true
  },
  voteCount: {
    type: Number,
    default:0
  },
  isDeleted:{type:Boolean , default:false}
},{
  timestamps:true
});

// Create the 'option' model
const Option = mongoose.model('Option', optionSchema);

// Define the 'vote' schema
const voteSchema = new mongoose.Schema({
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question',
    required: true
  },
  optionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Option',
    required: true
  }
});

// Create the 'vote' model
const Vote = mongoose.model('Vote', voteSchema);

module.exports = {
  Question,
  Option,
  Vote
};
