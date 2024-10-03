const User = require("../models/user.model");
const factory = require("../controller/factory.controller");

const createUser = async (req, res) => {
  await factory.createOne(User, req, res);
};

const getAllUsers = async (req, res) => {
  await factory.getAll(User, req, res);
};

const getSingleUser = async (req, res) => {
  await factory.getOne(User, req, res);
};

const updateUser = async (req, res) => {
  await factory.updateOne(User, req, res);
};

const deleteUser = async (req, res) => {
  await factory.deleteOne(User, req, res);
};

module.exports = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
};
