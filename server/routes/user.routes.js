const express = require("express");
const router = express.Router();
const userController = require("../controller/user.controller");
const authController = require("../controller/auth.controller");

router.route("/").get(userController.getAllUsers).post(authController.register);
router
  .route("/:id")
  .get(userController.getSingleUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

router.route("/login").post(authController.login);
router.route("/logout").post(authController.logout);

module.exports = router;
