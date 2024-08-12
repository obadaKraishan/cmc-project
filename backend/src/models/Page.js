// backend/src/models/Page.js
const mongoose = require('mongoose');

const PageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  components: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Component',
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Page = mongoose.model('Page', PageSchema);
module.exports = Page;