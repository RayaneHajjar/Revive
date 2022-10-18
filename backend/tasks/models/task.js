const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const taskSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  date: { type: Date },
  labels: [{
    title: { type: String },
    color: { type: String }
  }],
  boardId: { type: mongoose.Types.ObjectId, required: true, ref: 'Board' },
});

module.exports = mongoose.model('Task', taskSchema);