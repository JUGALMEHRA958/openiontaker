
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
require('dotenv').config(); // Import the habits router
const ejs = require('ejs')
const questionRouter = require("./Modules/Questions/routes")
const bodyParser = require('body-parser');
// Middleware
app.use(bodyParser.json());
app.use(express.json());
//setting template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//routes
app.use("/questions",questionRouter)



//start app function 
const startApp = ()=>{
    console.log("Db connection success, now starting app");
    app.listen(process.env.serverPort , ()=>{
        console.log("App running on port " , process.env.serverPort);
    })
}

//mongo db connection
const dbUrl = process.env.dbUrl

//in callback of connect, we pass start app 
mongoose.connect(dbUrl).then(startApp);


//route for home 
app.get("/", (req,res,next)=>{
    res.render('home' , {files:[]})
})

module.exports={
    app
}

