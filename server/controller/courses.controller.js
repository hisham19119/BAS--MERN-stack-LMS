const Course = require("../models/course.model");
const factory = require("../controller/factory.controller");

const createCourse = async (req, res) => {
  await factory.createOne(Course, req, res);
};
const getAllCourses = async (req, res) => {
  await factory.getAll(Course, req, res);
};

const getSingleCourse = async (req, res) => {
  await factory.getOne(
    Course,

    {
      path: "category",
      select: "title -_id",
    },
    req,
    res
  );
};

const updateCourse = async (req, res) => {
  await factory.updateOne(Course, req, res);
};

const deleteCourse = async (req, res) => {
  await factory.deleteOne(Course, req, res);
};

module.exports = {
  createCourse,
  getAllCourses,
  getSingleCourse,
  updateCourse,
  deleteCourse,
};
