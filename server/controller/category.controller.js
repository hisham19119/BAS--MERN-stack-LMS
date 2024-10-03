const Category = require("../models/category.model");
const factory = require("../controller/factory.controller");

const createCategory = async (req, res) => {
  await factory.createOne(Category, req, res);
};

const getAllCategories = async (req, res) => {
  await factory.getAll(Category, req, res);
};

const getSingleCategory = async (req, res) => {
  await factory.getOne(Category, null, req, res);
};

const updateCategory = async (req, res) => {
  await factory.updateOne(Category, req, res);
};

const deleteCategory = async (req, res) => {
  await factory.deleteOne(Category, req, res);
};

module.exports = {
  createCategory,
  getAllCategories,
  getSingleCategory,
  updateCategory,
  deleteCategory,
};
