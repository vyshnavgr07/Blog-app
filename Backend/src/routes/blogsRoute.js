const express=require('express');
const blogRoutes=express.Router();
const blogController=require('../controller/blogController');
const verifyToken=require('../middleware/verifyToken')


blogRoutes.post('/',verifyToken,blogController.createBlog)
.get('/',blogController.getBlog)
.get('/:_id',verifyToken,blogController.getBlogId)
.get('/user/:_id',verifyToken,blogController.getBlogByUserId)
.put('/:id',verifyToken,blogController.UpdateBlog)
.delete('/:id',verifyToken,blogController.deletedBlog)
.post('/comments/:id',verifyToken,blogController.addComment)
.get('/comments/:id',verifyToken,blogController.getComment)

module.exports=blogRoutes;   