const multer = require("multer");
const path = require("path");
const util = require("util");
const maxSize = 2 * 1024 * 1024;

const diskStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "..", "public/uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const uploadFile = multer({
  storage: diskStorage,
  limits: { fileSize: maxSize },
}).single("file");

const uploadFileMiddleware = util.promisify(uploadFile);
module.exports = uploadFileMiddleware;
