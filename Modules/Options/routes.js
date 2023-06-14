const express = require('express');
const router = express.Router();
const {deleteOption,addVoteToOption} = require("./controller")


//4
// // to delete a option
router.delete('/:id/delete',deleteOption);
//5
// // to add vote to a option
router.get('/:id/add_vote',addVoteToOption);




module.exports = router;
