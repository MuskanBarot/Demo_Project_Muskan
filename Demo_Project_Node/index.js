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
app.use(express.json());
app.use(passport.initialize())


require('./middleware/passport')(passport)

//users routes middleware
app.use('/api/users',require('./routes/user.router'))

var counter=0;
const StartApp=async()=>{
    //connect to database
try {
    counter++;
    
    await connect(DB,
        {useUnifiedTopology:true,
        useNewUrlParser:true
    })
    success({
        message:`Successfully connected to Database ${DB}`,
        badge:true
    })
    console.log(counter);
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
    //StartApp();
    console.log(counter);
      if(counter==10){
        const intervalObj = setTimeout(() => {
            StartApp();
          }, 5*60*1000);
          clearTimeout(intervalObj);
          counter=0;
      }
    StartApp();
    process.exit();
}
}

StartApp();