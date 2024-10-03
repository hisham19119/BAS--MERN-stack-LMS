const express = require("express");
const categoriesController = require("../controller/category.controller");
const router = express.Router();

router
  .route("/")
  .get(categoriesController.getAllCategories)
  .post(categoriesController.createCategory);

router
  .route("/:id")
  .patch(categoriesController.updateCategory)
  .get(categoriesController.getSingleCategory)
  .delete(categoriesController.deleteCategory);

module.exports = router;
