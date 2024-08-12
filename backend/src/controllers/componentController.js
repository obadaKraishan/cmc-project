// backend/src/controllers/componentController.js
const Component = require('../models/Component');

const createComponent = async (req, res) => {
  try {
    const { type, content, order, pageId } = req.body;
    const component = new Component({ type, content, order, page: pageId });
    await component.save();
    res.status(201).json(component);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Other CRUD operations...

module.exports = { createComponent };
