const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const boardSchema = new Schema({
  title: { type: String, required: true },
  tasks: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Task' }],
  userId: { type: mongoose.Types.ObjectId, required: true },
});

module.exports = mongoose.model('Board', boardSchema);