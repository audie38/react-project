const asyncHandler = require("express-async-handler");
const uploadFile = require("../middleware/upload");

// @desc    Upload  Picture
// @route   POST /api/v2/upload
// @access  Private
const uploadImage = asyncHandler(async (req, res) => {
  try {
    await uploadFile(req, res);
    res.status(200).json({
      uploadedFile: `${req.get("host")}${req.baseUrl}/img/${req.file.filename}`,
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

module.exports = uploadImage;
