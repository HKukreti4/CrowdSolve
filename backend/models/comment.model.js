const mongoose = require('mongoose');
const { Schema, model } = mongoose;
// Comment Schema
const commentSchema = new Schema({
    solution_id: { type: Schema.Types.ObjectId, ref: 'Solution', required: true },
    user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    comment_text: { type: String, required: true }
}, {
    timestamps: { createdAt: 'created_at', updatedAt: false }
});

const Comment = model('Comment', commentSchema);

module.exports = {
    Comment
};
