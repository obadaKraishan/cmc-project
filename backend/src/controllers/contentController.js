const Content = require('../models/Content');

// @desc Create new content
// @route POST /api/content
// @access Private
const createContent = async (req, res) => {
  const { title, body, status } = req.body;

  try {
    const content = new Content({
      title,
      body,
      author: req.user._id,
      status,
      publishedAt: status === 'published' ? Date.now() : null,
    });

    const createdContent = await content.save();
    return res.status(201).json(createdContent);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// @desc Get all content
// @route GET /api/content
// @access Public
const getAllContent = async (req, res) => {
  try {
    const content = await Content.find({}).populate('author', 'name');
    return res.json(content);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// @desc Get content by ID
// @route GET /api/content/:id
// @access Public
const getContentById = async (req, res) => {
  try {
    const content = await Content.findById(req.params.id).populate('author', 'name');

    if (content) {
      return res.json(content);
    } else {
      return res.status(404).json({ message: 'Content not found' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// @desc Update content
// @route PUT /api/content/:id
// @access Private
const updateContent = async (req, res) => {
  const { title, body, status } = req.body;

  try {
    const content = await Content.findById(req.params.id);

    if (content) {
      content.title = title || content.title;
      content.body = body || content.body;
      content.status = status || content.status;
      content.publishedAt = status === 'published' ? Date.now() : content.publishedAt;

      const updatedContent = await content.save();
      return res.json(updatedContent);
    } else {
      return res.status(404).json({ message: 'Content not found' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// @desc Delete content
// @route DELETE /api/content/:id
// @access Private
const deleteContent = async (req, res) => {
  try {
    const content = await Content.findById(req.params.id);

    if (content) {
      await content.remove();
      return res.json({ message: 'Content removed' });
    } else {
      return res.status(404).json({ message: 'Content not found' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createContent,
  getAllContent,
  getContentById,
  updateContent,
  deleteContent,
};
