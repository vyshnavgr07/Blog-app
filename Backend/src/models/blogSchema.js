const mongoose=require('mongoose');


const blogSchema=mongoose.Schema({
userId:{
    type:mongoose.Schema.ObjectId,
    ref:'User',
    required:true
},
title:{
type:String,
required:true
},
content:{
type:String,
required:true
},
author:{
    type:String,
    required:true 
}},{
    timestamps: true
}
);


const Blog=mongoose.model('Blog',blogSchema)


module.exports=Blog