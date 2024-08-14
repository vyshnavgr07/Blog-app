const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    blogId: {
        type: mongoose.Schema.ObjectId,
        ref: "Blog",
        required: true
    },
    content: {
        type: String,
        required: true
    }
}, {
    timestamps: true
}
);
const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment        