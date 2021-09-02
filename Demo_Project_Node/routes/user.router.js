const router=require('express').Router();
const {userRegister,userLogin,userAuth,serializeUser,checkRole}=require('../controller/user.controller')



//Trainee Registration router
router.post('/trainee-register',async(req,res)=>{
    await userRegister('Trainee',res,req)
})
//EMployee Registration router
router.post('/employee-register',async(req,res)=>{
    await userRegister('Employee',res,req)
})
//Manager Registration router
router.post('/manager-register',async(req,res)=>{
    await userRegister('Manager',res,req)
})


//Trainee Login router
router.post('/trainee-login',async(req,res)=>{
    await userLogin('Trainee',res,res)
})
//EMployee login router
router.post('/employee-login',async(req,res)=>{
    await userLogin('Employee',res,req)
})
//Manager login router
router.post('/manager-login',async(req,res)=>{
    await userLogin(req,'Manager',res)
})



router.get('/profile',userAuth,checkRole(["Trainee"]),async(req,res)=>{
    return res.json(serializeUser(req.user));
})

//Trainee Protected router
router.get('/trainee-profile',userAuth,checkRole(["Trainee"]),async(req,res)=>{})

//EMployee protected router
router.get('/employee-profile',userAuth,checkRole(["Employee"]),async(req,res)=>{})
//Manager protected router
router.get('/manager-profile',userAuth,checkRole(["Manager"]),async(req,res)=>{})
module.exports=router;