const express=require('express');
const userRouter=express.Router();
const usercontroller=require('../controller/userController');
const verifyToken=require('../middleware/verifyToken')


userRouter.post('/registration',usercontroller.userRegistration)
.post('/login',usercontroller.login)
.get('/user',verifyToken,usercontroller.getuser)




module.exports=userRouter;    