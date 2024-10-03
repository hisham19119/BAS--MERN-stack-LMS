const Chapter = require("../models/chapter.model");
const factory = require("../controller/factory.controller");
const { Types } = require("mongoose");

// const setCourseIdToBody = (req, res, next) => {
//   // Nested route (Create)
//   if (!req.body.course) req.body.course = req.params.courseId;
//   next();
// };

const setCourseIdToBody = (req, res, next) => {
  // Nested route (Create)
  if (!req.body.course && req.params.courseId) {
    req.body.course = req.params.courseId;
  }
  next();
};

// Nested route
// GET /api/v1/categories/:categoryId/subcategories
// const createFilterObj = (req, res, next) => {
//   let filterObject = {};
//   if (req.params.courseId) filterObject = { course: req.params.courseId };
//   req.filterObj = filterObject;
//   next();
// };

const createFilterObj = (req, res, next) => {
  let filterObject = {};
  if (req.params.courseId && Types.ObjectId.isValid(req.params.courseId)) {
    filterObject = { course: req.params.courseId };
  }
  req.filterObj = filterObject;
  next();
};

const createChapter = async (req, res) => {
  await factory.createOne(Chapter, req, res);
};

const getAllChapters = async (req, res) => {
  await factory.getAll(Chapter, req, res);
  console.log(req.params);
};

// const getSingleChapter = async (req, res) => {
//   await factory.getOne(
//     Chapter,
//     {
//       path: "course",
//       select: "title -_id",
//     },
//     req,
//     res
//   );
// };

const getSingleChapter = async (req, res) => {
  try {
    const chapterId = new Types.ObjectId(req.params.id);
    await factory.getOne(
      Chapter,
      {
        path: "course",
        select: "title -_id",
      },
      req,
      res
    );
  } catch (err) {
    return res.status(400).json({
      message: "Failed to retrieve chapter",
      error: err.message,
    });
  }
};

// const getSingleChapter = async (req, res) => {
//   const chapterId = new Types.ObjectId(req.params.id);
//   await factory.getOne(
//     Chapter,
//     {
//       path: "course",
//       select: "title -_id",
//     },
//     { _id: chapterId },
//     res
//   );
// };

const updateChapter = async (req, res) => {
  await factory.updateOne(Chapter, req, res);
};

const deleteChapter = async (req, res) => {
  await factory.deleteOne(Chapter, req, res);
};

module.exports = {
  createChapter,
  getAllChapters,
  getSingleChapter,
  updateChapter,
  deleteChapter,
  setCourseIdToBody,
  createFilterObj,
};
