const express = require('express');
const router = express.Router();
const {create} = require("./controller")
const { addQuestion} = require( "./validator");
// Import the addIt function correctly
// Define routes using the router object
router.post('/create',addQuestion, create);
// router.post()

// Export the router
module.exports = router;
