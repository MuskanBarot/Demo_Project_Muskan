const User=require('../models/User')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const {SECRET}=require('../config/index')
const passport=require('passport')
//@DEC to register the user(admin,user,superadmin)
const userRegister=async(userDetails,employeetype,res)=>{
    try {
        //validate username
        let userNotTaken=await validateUsername(userDetails.username);
        if(!userNotTaken)
        {
            return res.status(400).json({
                message:`Username is already taken`,
                success:false
            })
        }
        //validate email
        let emailNotTaken=await validateEmail(userDetails.email);
        if(!emailNotTaken)
        {
            return res.status(400).json({
                message:`Email is already registered`,
                success:false
            })
        }

        //create new user
    const HashPassword=await bcrypt.hash(userDetails.password,12)
    const NewUser=new User({
        ...userDetails,
        password:HashPassword,
        employeetype:employeetype
    });
    await NewUser.save();
    res.status(201).json({
        message:`Your account is successfully registered. Please Login`,
        success:true
    })
        
    } catch (error) {
        return res.status(500).json({
            message:'unable to create account',
            success:false
        })
    }

}

// for login
const userLogin=async(userCred,employeetype,res)=>{
    let {username,password}=userCred;
    const user=await User.findOne({username})
    //check username is in database or not
    if(!user)
    {
        return res.status(404).json({
            message:'Username is not found Please first Register',
            success:false
    })
    }

    //we will check role
    if(user.employeetype!=employeetype){
        return res.status(403).json({
            message:'make sure you are login in right portal',
            success:false
    })
}

    //check for password matching
    let isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      // Sign in the token and issue it to the user
      let token = jwt.sign(
        {
          user_id: user._id,
          employeetype: user.employeetype,
          username: user.username,
          email: user.email
        },
        SECRET,
        { expiresIn: "7 days" }
      );
  
      let result = {
        username: user.username,
        employeetype: user.employeetype,
        email: user.email,
        token: `Bearer ${token}`,
        expiresIn: 168
      };
  
      return res.status(200).json({
        ...result,
        message: "Hurray! You are now logged in.",
        success: true
      });
    } else {
      return res.status(403).json({
        message: "Incorrect password.",
        success: false
      });
    }
  };

/*
  ***@DESC passport middleware
  */

  const userAuth=passport.authenticate('jwt',{session:false})

const validateUsername=async(username)=>{
    const user=await User.findOne({username});
    return user?false:true
}

const validateEmail=async(email)=>{
    const user=await User.findOne({email});
    return user?false:true
}

const serializeUser=user=>{
    return{
        username: user.username,
    email: user.email,
    firstname: user.firstname,
    _id: user._id,
   
    }
}

/**
 * @DESC Check Role Middleware
 */
 const checkRole = employeetype => (req, res, next) =>
 !employeetype.includes(req.user.employeetype)
   ? res.status(401).json("Unauthorized")
   : next();


module.exports={
    userRegister,
    userLogin,
    userAuth,
    serializeUser,
    checkRole}