const express=require('express');
const blogRoutes=express.Router();
const blogController=require('../controller/blogController');
const verifyToken=require('../middleware/verifyToken')


blogRoutes.post('/',verifyToken,blogController.createBlog)
.get('/',verifyToken,blogController.getBlog)
.put('/',verifyToken,blogController.UpdateBlog)
.delete('/:id',verifyToken,blogController.deletedBlog)
.post('/comments',verifyToken,blogController.addComment)
.get('/comments',verifyToken,blogController.getComment)
   
module.exports=blogRoutes;   