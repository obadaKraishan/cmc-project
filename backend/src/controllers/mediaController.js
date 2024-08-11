const Media = require('../models/Media');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Set up multer for file storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage }).single('file');

// @desc Upload media
// @route POST /api/media/upload
// @access Private
const uploadMedia = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    const { filename, mimetype, size } = req.file;
    const filepath = req.file.path;

    try {
      const media = new Media({
        filename,
        filepath,
        mimetype,
        size,
        uploadedBy: req.user._id,
      });

      const createdMedia = await media.save();
      return res.status(201).json(createdMedia);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  });
};

// @desc Delete media
// @route DELETE /api/media/:id
// @access Private
const deleteMedia = async (req, res) => {
  try {
    const media = await Media.findById(req.params.id);

    if (media) {
      // Remove the file from the filesystem
      fs.unlinkSync(media.filepath);
      await media.remove();
      return res.json({ message: 'Media removed' });
    } else {
      return res.status(404).json({ message: 'Media not found' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// @desc Get all media files
// @route GET /api/media
// @access Private
const getAllMedia = async (req, res) => {
  try {
    const mediaFiles = await Media.find({}).populate('uploadedBy', 'name');
    return res.json(mediaFiles);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  uploadMedia,
  deleteMedia,
  getAllMedia,
};
