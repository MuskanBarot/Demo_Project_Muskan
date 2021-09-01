const bodyParser = require('body-parser');
const cors=require('cors');
const express=require('express');
const body_parser=require('body-parser');                                   
const passport =require('passport')
const {connect}=require('mongoose')
const {error,success}=require('consola');

//import constant
const {DB}=require('./config/index');
const PORT=process.env.PORT||3000;
//initializing the app
const app=express();


//use Middleware
app.use(cors());
app.use(body_parser.json());
app.use(passport.initialize())


require('./middleware/passport')(passport)

//users routes middleware
app.use('/api/users',require('./routes/users'))


const StartApp=async()=>{
    //connect to database
try {
    await connect(DB,
        {useUnifiedTopology:true,
        useNewUrlParser:true
    })
    success({
        message:`Successfully connected to Database ${DB}`,
        badge:true
    })
    app.listen(PORT,()=>{
        success({
            message:`server is running on ${PORT}`,
            badge:true
        })
    })
} catch (err) {
    error({
        message:`Unable to connect database ${err}`,
        badge:true
    })
    StartApp();
}
}

StartApp();