const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const boardSchema = new Schema({
  title: { type: String, required: true },
  cards: [{
    title: { type: String, required: true },
    description: { type: String },
    date: { type: Date },
    labels: [{
      title: { type: String, required: true },
      color: { type: String }
    }],
    tasks: [{
      title: { type: String, required: true },
    }],
  }],
  userId: { type: mongoose.Types.ObjectId, required: true },
});

module.exports = mongoose.model('Board', boardSchema);