const mongoose = require('mongoose');
const { Schema, model } = mongoose;

// Solution Schema
const solutionSchema = new Schema({
    problem_id: { type: Schema.Types.ObjectId, ref: 'Problem', required: true },
    user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    description: { type: String, required: true },
    upvotes: { type: Number, default: 0 }
}, {
    timestamps: { createdAt: 'created_at', updatedAt: false }
});



// Export models

const Solution = model('Solution', solutionSchema);


module.exports = {
    Solution,

};
