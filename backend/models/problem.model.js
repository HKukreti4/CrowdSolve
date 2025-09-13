const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const problemSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
  image_url: { type: String }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: false }
});

const Problem = model('Problem', problemSchema);

module.exports = Problem;
