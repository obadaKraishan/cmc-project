const Page = require('../models/Page');

const createPage = async (req, res) => {
  try {
    const { title, components } = req.body;
    const page = new Page({
      title,
      components,
      createdBy: req.user._id,
    });
    const createdPage = await page.save();
    res.status(201).json(createdPage);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create page', error });
  }
};

const getAllPages = async (req, res) => {
  try {
    const pages = await Page.find().populate('createdBy', 'name');
    res.json(pages);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch pages', error });
  }
};

const getPageById = async (req, res) => {
  try {
    const page = await Page.findById(req.params.id);
    if (page) {
      res.json(page);
    } else {
      res.status(404).json({ message: 'Page not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch page', error });
  }
};

const updatePage = async (req, res) => {
  try {
    const { title, components } = req.body;
    const page = await Page.findById(req.params.id);

    if (page) {
      page.title = title;
      page.components = components;
      const updatedPage = await page.save();
      res.json(updatedPage);
    } else {
      res.status(404).json({ message: 'Page not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to update page', error });
  }
};

const deletePage = async (req, res) => {
  try {
    const page = await Page.findById(req.params.id);
    if (page) {
      await page.remove();
      res.json({ message: 'Page deleted' });
    } else {
      res.status(404).json({ message: 'Page not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete page', error });
  }
};

module.exports = {
  createPage,
  getAllPages,
  getPageById,
  updatePage,
  deletePage,
};
