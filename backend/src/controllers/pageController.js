// backend/src/controllers/pageController.js
const Page = require('../models/Page');
const Component = require('../models/Component');

const createPage = async (req, res) => {
  try {
    const { title, slug, components } = req.body;
    const page = new Page({ title, slug, components });
    await page.save();
    res.status(201).json(page);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Other CRUD operations like updatePage, deletePage, getPageById...

module.exports = { createPage };