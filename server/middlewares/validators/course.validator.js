const { body } = require("express-validator");
const validationMiddleware = require("./validation.middleware");
const Category = require("../../models/category.model");
const createCourseValidator = () => {
  return [
    body("title")
      .notEmpty()
      .withMessage("Course title is required")
      .isLength({ min: 2 })
      .withMessage("title must be at least 2 characters"),

    body("description").optional(),

    body("price").optional(),

    body("category")
      .optional()
      .custom((categoryId) =>
        Category.findById(categoryId).then((category) => {
          if (!category) {
            return Promise.reject(
              new Error(`No category for this id: ${categoryId}`)
            );
          }
        })
      ),
    // body("chapter")
    //   .optional()
    //   .isArray()
    //   .withMessage("Chapters should be an array of IDs")
    //   .custom((chapterIds) =>
    //     Promise.all(
    //       chapterIds.map((chapterId) =>
    //         Chapter.findById(chapterId).then((chapter) => {
    //           if (!chapter) {
    //             return Promise.reject(
    //               new Error(`No chapter for this id: ${chapterId}`)
    //             );
    //           }
    //         })
    //       )
    //     )
    //   ),

    validationMiddleware,
  ];
};

const updateCourseValidator = () => {
  return [
    body("title")
      .optional()
      .notEmpty()
      .withMessage("Course title is required")
      .isLength({ min: 2 })
      .withMessage("title must be at least 2 characters"),

    body("description")
      .optional()
      .notEmpty()
      .withMessage("Course description is required")
      .isLength({ min: 5 })
      .withMessage("Course description must be at least 5 characters")
      .isLength({ max: 720 })
      .withMessage("Course description is too long"),

    body("price")
      .optional()
      .notEmpty()
      .withMessage("Course price is required")
      .isNumeric()
      .withMessage("Course price should be a number"),

    body("category")
      .optional()
      .notEmpty()
      .withMessage("category is required")
      .isMongoId()
      .withMessage("invalid id format")
      .custom((categoryId) =>
        Category.findById(categoryId).then((category) => {
          if (!category) {
            return Promise.reject(
              new Error(`No category for this id: ${categoryId}`)
            );
          }
        })
      ),
    // body("chapter")
    //   .optional()
    //   .isArray()
    //   .withMessage("Chapters should be an array of IDs")
    //   .custom((chapterIds) =>
    //     Promise.all(
    //       chapterIds.map((chapterId) =>
    //         Chapter.findById(chapterId).then((chapter) => {
    //           if (!chapter) {
    //             return Promise.reject(
    //               new Error(`No chapter for this id: ${chapterId}`)
    //             );
    //           }
    //         })
    //       )
    //     )
    //   ),

    validationMiddleware,
  ];
};

module.exports = {
  createCourseValidator,
  updateCourseValidator,
};
