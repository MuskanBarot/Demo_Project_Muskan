const {Schema,model}=require('mongoose')

const Register_UserSchema =new Schema({
    firstname:{
        type:String,
        required:true,
    },
    lastname:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
        minlength:7
    },
    phoneno:{
        type:Number,
        required:true,
    },
    employeetype:{
        type:String,
        required:true,
        enum:["Trainee","Employee","Manager"]
    },
    totalexperience:{
        type:Number,
        required:true,
    },
    username:{
        type:String,
        required:true
    }
    // role:{
    //     type:String,
    //     default:'user',
    //     enum:['user','admin']
    // }
},{timestamps:true})

module.exports=model('Users',Register_UserSchema)