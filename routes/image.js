const express = require("express");
// setup router
const router = express.Router();
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// route for image upload
router.post("/", upload.single("image"), async (req, res) => {
  try {
    // access the file at req.file
    const image_url = req.file.path;
    res.status(200).send({ image_url: image_url });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

module.exports = router;
