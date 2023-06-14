const express = require('express');
const router = express.Router();
const {createQuestion,createOption,deleteQuestion,getQuestion } = require("./controller")
const { addQuestion, addOption, deleteQuestionValidator} = require( "./validator");
// Import the addIt function correctly
// Define routes using the router object

//1
// create question api 
router.post('/create',addQuestion, createQuestion);

//2
// create option of question api 
router.post('/:id/options/create',addOption, createOption);

//3
// to delete a quesion
router.delete('/:id/delete',deleteQuestionValidator, deleteQuestion);

//6
// to delete a quesion
router.get('/:id',getQuestion);



module.exports = router;
