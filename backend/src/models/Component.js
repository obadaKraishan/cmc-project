// backend/src/models/Component.js
const mongoose = require('mongoose');

const ComponentSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  content: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  order: {
    type: Number,
    required: true,
  },
  page: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Page',
    required: true,
  },
}, {
  timestamps: true,
});

const Component = mongoose.model('Component', ComponentSchema);
module.exports = Component;
