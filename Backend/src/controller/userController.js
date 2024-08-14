const User=require('../models/userSchema');
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const Blog=require('../models/blogSchema')
const Comment=require('../models/commentSchema')
const userRegistration=async(req,res)=>{
try {
    const {userName,email,password}=req.body;
    if(!userName.length || !email || !password){
        res.status(400).json({
         status:'failed',
         message:'data missing'
        })
    }
    const existingUser=await User.findOne({email});
 if(existingUser){
    return res.status(400).json({
        status:'failed',
        message:'user already exist'
    })
 }

const salt =await bcrypt.genSaltSync(10);
const hash =await bcrypt.hashSync(password, salt);
    const user=new User({userName,email,password:hash}); 
    const savedUser=await user.save();
      
    res.status(201).json({
        status:'succes',
        message:'user registered succefully',
        savedUser
    })

} catch (error) {
    res.status(400).json({
        stattus:'failed',
        })
        console.log(error,"err");
        
}
}


const login=async(req,res)=>{
    try {
        const {email,password}=req.body;
        if(!email || !password){
            res.status(400).json({
                status:'failed',
                message:'email or password is not provided'
            })
        }
        const user=await User.findOne({email})
        console.log(user);
        
        const userPassword=user.password
        const hash=await bcrypt.compareSync(password,userPassword);
        if(hash){
          const token=await jwt.sign({
                user
              },process.env.SECRET_KEY, { expiresIn: 60 * 60 });
                
              res.status(200).json({
                status:'sucess',
                message:"login succesfully",
                token
              })
              
              }
        
    } catch (error) {
        console.log(error);
        }
}


const getuser=async(req,res)=>{
try {
const id=req.decoded.user._id;
const user=await User.findOne({_id:id})
return res.status(200).json({
    status:"success",
    user
})


} catch (error) {
    console.log(error);
    
}
}

const createBlog=async(req,res)=>{
    try {
        const {user}=req.decoded;
         const data=req.body
         if(!data){
            res.status(200).json({
                status:'failed',
                message:""
            })
         }
 const blog=await new Blog({userId:user._id,...data});
 const savedBlog=await blog.save();

 return res.status(200).json({
    status:'success',
    message:'blog created',
    savedBlog
 })
} catch (error) {
    
        console.log(error);
        
    }
}

const getBlog=async (req,res)=>{
    try {
        const blog=await Blog.find();
        res.status(200).json({
            status:'success',
            message:'succesfully fetched',
            blog
        })
    } catch (error) {
        console.log(error);
        
    }
}

const UpdateBlog=async (req,res)=>{
    try {
       const {_id,title,content,author}=req.body;
        
        const blog=await Blog.findOneAndUpdate({_id},{title,content,author},{new:true})
        if (!blog) {
            return res.status(404).json({
                status: 'failure',
                message: 'Blog not found'
            });
        }
        return res.status(200).json({
            status:'succes',
            message:'succesfully updated',
            blog
        })
} catch (error) {
        console.log(error);
        
    }
}

const deletedBlog=async(req,res)=>{
    try {
        const {id}=req.params;
        const delteBlog=await Blog.findOneAndDelete({_id:id})
        return res.status(200).json({
            status:'succes',
            message:'succesfully deleted',
            delteBlog
        })
    } catch (error) {
        console.log(error);
        
    }
}


const addComment=async(req,res)=>{
    try {
        const id=req.decoded.user._id;
        console.log(id,"usur");
        
        const data=req.body;
        const comment=await new Comment({userId:id,...data});
        const savedComment=await comment.save();
        return res.status(200).json({
            status:'succes',
            message:'succesfully updated',
            savedComment
        })
    } catch (error) {
        console.log(error);
        
    }
}



module.exports={userRegistration,login,createBlog,getuser,getBlog,UpdateBlog,deletedBlog,addComment} 