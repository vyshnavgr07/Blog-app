const express=require('express');
const userRouter=express.Router();
const usercontroller=require('../controller/userController');
const verifyToken=require('../middleware/verifyToken')


userRouter.post('/registration',usercontroller.userRegistration)
.post('/login',usercontroller.login)
.get('/user',verifyToken,usercontroller.getuser)
.post('/blog',verifyToken,usercontroller.createBlog)
.get('/blog',verifyToken,usercontroller.getBlog)
.put('/blog',verifyToken,usercontroller.UpdateBlog)
.delete('/blog/:id',verifyToken,usercontroller.deletedBlog)
.post('/comment',verifyToken,usercontroller.addComment);   


module.exports=userRouter;    