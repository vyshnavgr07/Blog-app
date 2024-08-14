const Blog = require('../models/blogSchema')
const Comment = require('../models/commentSchema');



const createBlog = async (req, res) => {
    try {
        const { user } = req.decoded;
        const data = req.body
        if (!data) {
            res.status(200).json({
                status: 'failed',
                message: ""
            })
        }
        const blog = await new Blog({ userId: user._id, ...data });
        const savedBlog = await blog.save();

        return res.status(200).json({
            status: 'success',
            message: 'blog created',
            savedBlog
        })
    } catch (error) {

        console.log(error);

    }
}

const getBlog = async (req, res) => {
    try {
        const blog = await Blog.find();
        res.status(200).json({
            status: 'success',
            message: 'succesfully fetched',
            blog
        })
    } catch (error) {
        console.log(error);

    }
}

const UpdateBlog = async (req, res) => {
    try {
        const { _id, title, content, author } = req.body;

        const blog = await Blog.findOneAndUpdate({ _id }, { title, content, author }, { new: true })
        if (!blog) {
            return res.status(404).json({
                status: 'failure',
                message: 'Blog not found'
            });
        }
        return res.status(200).json({
            status: 'succes',
            message: 'succesfully updated',
            blog
        })
    } catch (error) {
        console.log(error);

    }
}

const deletedBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const delteBlog = await Blog.findOneAndDelete({ _id: id })
        if(!delteBlog){
            return  res.status(404).json({
                status: 'succes',
                message: 'Blog not found'
            })
        }
        
        return res.status(200).json({
            status: 'succes',
            message: 'succesfully deleted'
        })
    } catch (error) {
        console.log(error);

    }
}


const addComment = async (req, res) => {
    try {
        const id = req.decoded.user._id;
        console.log(id, "usur");

        const data = req.body;
        const comment = await new Comment({ userId: id, ...data });
        const savedComment = await comment.save();
        return res.status(200).json({
            status: 'succes',
            message: 'succesfully updated',
            savedComment
        })
    } catch (error) {
        console.log(error);

    }
}

const getComment=async(req,res)=>{
try {
    const getcom=await Comment.find().populate("userId").populate("blogId");
    return res.status(200).json({
        status: 'succes',
        message: 'succesfully updated',
        getcom
    })
} catch (error) {
    console.log(error);
    
}
}
module.exports = { createBlog, getBlog, UpdateBlog, deletedBlog, addComment,getComment } 

