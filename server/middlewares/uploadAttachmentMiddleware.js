const multer = require("multer");
const appError = require("../utils/appError");

const multerOptions = () => {
  const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/attachments");
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });

  const multerFilter = (req, file, cb) => {
    if (
      file.mimetype === "application/pdf" ||
      file.mimetype.startsWith("text/")
    ) {
      cb(null, true);
    } else {
      cb(new appError("Only PDF and text files are allowed", 400), false);
    }
  };

  return multer({ storage: multerStorage, fileFilter: multerFilter });
};

exports.uploadSingleAttachment = multerOptions().single("attachment");
