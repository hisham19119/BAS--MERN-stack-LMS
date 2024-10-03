const express = require("express");
const router = express.Router();
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const appError = require("../utils/appError");
const coursesController = require("../controller/courses.controller");
const chapterRouter = require("./chapters.routes");

const {
  createCourseValidator,
  updateCourseValidator,
} = require("../middlewares/validators/course.validator");
const app = express();

const cors = require("cors");

app.use(cors());

const multerImageFilter = function (req, file, cb) {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new appError("Invalid file"), false);
  }
};

const multerAttachmentFilter = function (req, file, cb) {
  if (file.mimetype === "application/pdf" || file.mimetype === "text/plain") {
    cb(null, true);
  } else {
    cb(new appError("Invalid attachment file"), false);
  }
};

const diskStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log("file : ", file);
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const txt = file.mimetype.split("/")[1];
    const filename = `course-${uuidv4()}-${Date.now()}.${txt}`;
    cb(null, filename);
  },
});

const upload = multer({
  storage: diskStorage,
  fileFilter: (req, file, cb) => {
    if (file.fieldname === "imageCover") {
      multerImageFilter(req, file, cb);
    } else if (file.fieldname === "attachment") {
      multerAttachmentFilter(req, file, cb);
    } else {
      cb(new appError("Invalid file type"), false);
    }
  },
});

router.use("/:courseId/chapters", chapterRouter);
router
  .route("/")
  .get(coursesController.getAllCourses)
  .post(
    upload.fields([
      { name: "imageCover", maxCount: 1 },
      { name: "attachment", maxCount: 1 },
    ]),
    createCourseValidator(),
    coursesController.createCourse
  );

router
  .route("/:id")
  .patch(
    upload.fields([
      { name: "imageCover", maxCount: 1 },
      { name: "attachment", maxCount: 1 },
    ]),
    updateCourseValidator(),
    coursesController.updateCourse
  )
  .get(coursesController.getSingleCourse)
  .delete(coursesController.deleteCourse);

module.exports = router;
