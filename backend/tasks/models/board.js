const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const boardSchema = new Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  cards: [{
    id: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String },
    date: { type: Date },
    labels: [{
      title: { type: String, required: true },
      color: { type: String }
    }],
    tasks: [{
      id: { type: String, required: true },
      title: { type: String, required: true },
      completed: { type: Boolean, required: true }
    }],
  }],
  userId: { type: mongoose.Types.ObjectId, required: true },
});

module.exports = mongoose.model('Board', boardSchema);