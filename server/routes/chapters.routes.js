const express = require("express");
const router = express.Router({ mergeParams: true });
const chaptersController = require("../controller/chapters.controller");
const multer = require("multer");
const path = require("path");

// Set up storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads"); // Define your upload directory
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext); // Unique filename
  },
});

// Initialize upload middleware
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const filetypes = /mp4|mkv|flv|avi/;
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb("Error: Video files only!");
    }
  },
});

router
  .route("/")
  .get(chaptersController.createFilterObj, chaptersController.getAllChapters)
  .post(
    chaptersController.setCourseIdToBody,
    upload.single("video"),
    chaptersController.createChapter
  );

router
  .route("/:id")
  .patch(upload.single("video"), chaptersController.updateChapter)
  .get(chaptersController.getSingleChapter)
  .delete(chaptersController.deleteChapter);

module.exports = router;
