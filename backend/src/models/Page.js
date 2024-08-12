const mongoose = require('mongoose');

const ComponentSchema = new mongoose.Schema({
  type: { type: String, required: true },
  content: { type: mongoose.Schema.Types.Mixed }, // Can store different types of content
  order: { type: Number, required: true },
});

const PageSchema = new mongoose.Schema({
  title: { type: String, required: true },
  components: [ComponentSchema],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

const Page = mongoose.model('Page', PageSchema);

module.exports = Page;
